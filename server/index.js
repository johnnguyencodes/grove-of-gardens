
require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
  select "productId",
         "name",
         "price",
         "image",
         "shortDescription"
    from "products"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const getProductId = parseInt(req.params.productId);
  if (!Number.isInteger(getProductId) || getProductId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive  integer'
    });
  }
  const sql = `
  select "productId",
         "name",
         "price",
         "image",
         "shortDescription",
         "longDescription"
    from "products"
   where "productId" = $1
  `;
  const value = [getProductId];
  db.query(sql, value)
    .then(result => {
      const product = result.rows[0];
      if (!product) {
        next(new ClientError(`cannot find product with productId ${getProductId}`, 404));
        return;
      }
      res.status(200).json(product);
    })
    .catch(err => next(err,
      res.status(500).json({
        error: 'An unexpected query error occurred.'
      }))
    );
});

app.get('/api/cart', (req, res, next) => {
  res.json([]);
});

app.post('/api/cart/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sqlPrice = `
  select "price"
    from "products"
   where "productId" = $1
  `;
  const value = [productId];
  db.query(sqlPrice, value)
    .then(result => {
      const productPrice = result.rows[0].price;
      if (!(productPrice)) {
        next(new ClientError(`Unable to find product productId ${productId}`, 400));
        return;
      }
      const sqlCartId = `
      insert into "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
      `;
      return (
        db.query(sqlCartId)
          .then(result => {
            const cartId = result.rows[0].cartId;
            return (
              {
                cartId,
                productPrice
              }
            );
          })
      );
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sqlSession = `
      insert into "cartItems" ("cartId", "productId", "price")
      values ($1, $2, $3)
      returning "cartItemId"
      `;
      const values = [req.session.cartId, productId, result.productPrice];
      return (
        db.query(sqlSession, values)
          .then(result => {
            const cartItemId = result.rows[0].cartItemId;
            return cartItemId;
          })
      );
    })
    .then(result => {
    });
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
