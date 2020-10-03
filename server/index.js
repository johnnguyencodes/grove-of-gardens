
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

// user can view the products for sale
app.get('/api/products', (req, res, next) => {
  const sql = `
      select "productId",
             "name",
             "price",
             "image",
             "shortDescription"
        from "products"
    order by "category"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// user can view products of a category for sale
app.post('/api/category/:category', (req, res, next) => {
  const category = req.params.category;
  if (!category) {
    return res.status(400).json({
      error: '"category" must be present in the request body'
    });
  }
  const sql = `
      select "productId",
             "name",
             "price",
             "image",
             "shortDescription"
        from "products"
        where "category" = $1
        order by "name"
      `;
  const value = [category];
  db.query(sql, value)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: `No items are listed under the category ${category}` });
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch(err => next(err));
});

// user can search for products to view
app.post('/api/search', (req, res, next) => {
  const searchQuery = req.body.searchQuery;
  if (!searchQuery) {
    return res.status(400).json({
      error: '"searchQuery" must be a valid value'
    });
  }
  const sql2 = `
        select * from "products"
        where "name" || "longDescription" ~* $1
        order by "name"
  `;
  const value = [searchQuery];
  db.query(sql2, value)
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: `The search query "${searchQuery}" returned no results` });
      } else {
        res.status(200).json(result.rows);
      }
    }
    );
});

// get images and their text and caption for carousel component on homepage
app.get('/api/carousel', (req, res, next) => {
  const sql = `
  select *
    from "carouselImages"
    order by "carouselImageId"
  `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// user can view the details of a product
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

// user can view additional images of a product
app.get('/api/images/:productId', (req, res, next) => {
  const getProductId = parseInt(req.params.productId);
  if (!Number.isInteger(getProductId) || getProductId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
  select *
    from "productImages"
   where "productId" = $1
   order by "imageId"
  `;
  const value = [getProductId];
  db.query(sql, value)
    .then(result => {
      const product = result.rows;
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

// user can view the details of their cart
app.get('/api/cart', (req, res, next) => {
  if (!(req.session.cartId)) {
    res.json([]);
    return;
  }
  const sql = `
  select "c"."cartItemId",
       "c"."price",
       "c"."quantity",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;
  const cartId = req.session.cartId;
  const value = [cartId];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// user can add a product to their cart
app.post('/api/cart/:productId', (req, res, next) => {
  let cartItemId;
  const productId = parseInt(req.params.productId);
  const quantity = parseInt(req.body.quantity);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({
      error: '"quantity" must be a positive integer"'
    });
  }
  const sql1 = `
  select "price"
    from "products"
   where "productId" = $1
  `;
  const value1 = [productId];
  db.query(sql1, value1)
    .then(result => {
      if (!(result.rows[0])) {
        throw new ClientError(`Unable to find productId ${productId}`, 400);
      }
      const productPrice = result.rows[0].price;
      if (!(req.session.cartId)) {
        const sql2 = `
        insert into "carts" ("cartId", "createdAt")
             values (default, default)
          returning "cartId"
        `;
        return (
          db.query(sql2)
            .then(result => {
              const cartId = result.rows[0].cartId;
              return ({
                cartId,
                productPrice
              });
            })
        );
      } else {
        const cartId = req.session.cartId;
        return ({
          cartId,
          productPrice
        });
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const productPrice = result.productPrice;
      const sql3 = `
      select * from "cartItems" where "cartId" = $1 and "productId" = $2
      `;
      const values3 = [req.session.cartId, productId];
      db.query(sql3, values3)
        .then(result => {
          if (!(result.rows[0])) {
            const sql4 = `
          insert into "cartItems" ("cartId", "productId", "price", "quantity")
                           values ($1, $2, $3, $4)
                        returning *
          `;
            const values4 = [req.session.cartId, productId, productPrice, req.body.quantity];
            return (
              db.query(sql4, values4)
                .then(result => {
                  cartItemId = result.rows[0].cartItemId;
                  return cartItemId;
                })
            );
          } else {
            const sql5 = `
             update "cartItems" set "quantity" = "quantity" + $3
              where "cartId" = $1 and "productId" = $2
             returning *
          `;
            const values5 = [req.session.cartId, productId, quantity];
            return (
              db.query(sql5, values5)
                .then(result => {
                  cartItemId = result.rows[0].cartItemId;
                  return cartItemId;
                })
            );
          }
        })
        .then(result => {
          const sql6 = `
        select "c"."cartItemId",
              "c"."price",
              "c"."quantity",
              "p"."productId",
              "p"."image",
              "p"."name",
              "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
          where "c"."cartItemId" = $1
        `;
          const value6 = [cartItemId];
          db.query(sql6, value6)
            .then(result => {
              res.status(201).json(result.rows);
            })
            .catch(err => next(err));
        });
    })
    .catch(err => next(err));
});

// user can remove an item from cart
app.delete('/api/cart/:cartItemId', (req, res, next) => {
  const cartItemId = parseInt(req.params.cartItemId);
  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    return res.status(400).json({
      error: '"cartItemId" must be a positive integer'
    });
  }
  const sql = `
  delete from "cartItems"
  where "cartItemId" = $1
  returning *
  `;
  const value = [cartItemId];
  db.query(sql, value)
    .then(result => {
      const returnedDeletedItem = result.rows[0];
      if (!returnedDeletedItem) {
        return res.status(404).json({ error: `Cannot find cartItem with "cartItemId" ${cartItemId}` });
      } else {
        return res.status(200).json({ success: `Successfully deleted "cartItemId" ${cartItemId}` });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

// user can place an order
app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!(cartId)) {
    return res.status(400).json({
      error: `A 'cartId' was not found in your session, please contact Site Admin
      for assistance.`
    });
  }
  const {
    fullName, phone, email, address1, address2, city, state, zip, creditCardNumber,
    creditMonth, creditYear, creditCVV
  } = req.body;
  if (!(fullName || phone || email || address1 || address2 ||
      city || state || zip || creditCardNumber || creditMonth ||
      creditYear || creditCVV)) {
    return res.status(400).json({
      error: `Customer information is missing, please make sure all customer details
      have been entered.`
    });
  }
  const sql = `
  insert into "orders" ("cartId", "fullName", "phone", "email", "address1", "address2",
                        "city", "state", "zip", "creditCardNumber", "creditMonth",
                        "creditYear", "creditCVV")
                values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
             returning *
  `;
  const values = [cartId, fullName, phone, email, address1, address2, city, state,
    zip, creditCardNumber, creditMonth, creditYear, creditCVV];
  db.query(sql, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json({
        createdAt: result.rows[0].createdAt,
        orderId: result.rows[0].orderId,
        fullName: result.rows[0].fullName,
        phone: result.rows[0].phone,
        email: result.rows[0].email,
        address1: result.rows[0].address1,
        address2: result.rows[0].address2,
        city: result.rows[0].city,
        state: result.rows[0].state,
        zip: result.rows[0].zip,
        creditCardNumber: result.rows[0].creditCard,
        creditMonth: result.rows[0].creditMonth,
        creditYear: result.rows[0].creditYear,
        creditCVV: result.rows[0].creditCVV
      });
    })
    .catch(err => next(err));
});

// user can view their order summary by retrieving items from order
app.get('/api/confirmation/:orderId', (req, res, next) => {
  const getOrderId = parseInt(req.params.orderId);
  if (!Number.isInteger(getOrderId) || getOrderId <= 0) {
    return res.status(400).json({
      error: '"orderId" must be a positive integer'
    });
  }
  const sql = `
    select "products"."name", "products"."price", "products"."image",
           "products"."productId", "cartItems"."quantity", "cartItems"."cartItemId"
      from "products"
      join "cartItems" using ("productId")
      join "orders" using ("cartId")
      where "orders"."orderId" = $1;
  `;
  const value = [getOrderId];
  db.query(sql, value)
    .then(result => {
      const orderedItems = result.rows;
      if (!orderedItems) {
        next(new ClientError(`cannot find order with orderId ${getOrderId}`, 404));
        return;
      }
      res.status(200).json(orderedItems);
    })
    .catch(err => next(err,
      res.status(500).json({
        error: 'An unexpected query error occurred.'
      }))
    );
});

// on page load, quantityToUpdateArray will be filled if items exist in the cart on page load
app.get('/api/quantity', (req, res, next) => {
  if (!(req.session.cartId)) {
    res.json([]);
    return;
  }
  const sql = `
  select "cartItems"."cartItemId",
         "cartItems"."quantity"
    from "cartItems"
   where "cartItems"."cartId" = $1
  `;
  const cartId = req.session.cartId;
  const value = [cartId];
  db.query(sql, value)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

// user can update quantity of cartItem
app.post('/api/update/:cartItemId', (req, res, next) => {
  if (!(req.session.cartId)) {
    res.json([]);
    return;
  }
  const cartItemId = parseInt(req.params.cartItemId);
  const quantity = parseInt(req.body.quantity);

  if (!Number.isInteger(cartItemId) || cartItemId <= 0) {
    return res.status(400).json({
      error: '"cartItemId" must be a positive integer'
    });
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({
      error: '"quantity" must be greater than zero"'
    });
  }
  if (quantity <= 0) {
    const sql = `
    delete from "cartItems"
    where "cartItemId" = $1
    returning *
    `;
    const value = [cartItemId];
    db.query(sql, value)
      .then(result => {
        const returnedDeletedItem = result.rows[0];
        if (!returnedDeletedItem) {
          return res.status(404).json({ error: `Cannot find cartItem with "cartItemId" ${cartItemId}` });
        } else {
          return res.status(200).json({ success: `Successfully deleted "cartItemId" ${cartItemId}` });
        }
      })
      .catch(err => next(err));

  } else {
    const sql = `
  update "cartItems" set "quantity" = $1
  where "cartItemId" = $2
  returning *
  `;
    const values = [quantity, cartItemId];

    db.query(sql, values)
      .then(result => {
        res.status(201).json(result.rows);
      })
      .catch(err => next(err));
  }
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
