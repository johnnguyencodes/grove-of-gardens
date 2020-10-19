# The Grove of Gardens
> * Maintained by: `John Nguyen`

* Used React.js to create all HTML elements (virtual DOM) to dynamically display data received from the PostgreSQL database via API server created using Node.js

* Used Express and Express session module to retrieve user's cart information

* Used Amazon Web Services EC2 for web, API server, and PostgreSQL database

## Feature Overview
### The client can send requests to the server, and in return can receive and display the data in HTML format to:
  1. View all products for sale
  2. View products for sale by category
  3. Search products by name and description
  4. View details and additional images of a product
  5. Specify the quantity of a product to be added to the cart
  6. Update the quantity of a product already in the cart
  7. Remove a product from the cart
  8. View the cart summary
  9. Submit an order form to the server with client-side form validation
  10. View the order confirmation

### Mobile Responsive
* The app is mobile responsive and can be used on the following devices in Portrait and Landscape:
  * iPhone 6/7/8
  * iPhone 6/7/8 Plus
  * iPhone X
  * iPad
  * iPad Pro

## Lessons Learned
  1. Accessing the local storage using React.js functions and dynamically display data using React.js virtual DOM functions
  2. Creating a basic yet responsive user interface using React.js and Bootstrap 4
  3. Leveraging Object Oriented Programming to organize code into components
  4. Creating an API server using Node.js to process requests from and send data to the client
  5. Storing and handling session data using Express session
  6. Experienced the full development process of deploying the web and API server into AWS EC2 and creating a PostgreSQL database

## Live Site
* The live version of the app can be viewed [here](https://grove-of-gardens.johnnguyencodes.com).

### Demos

* Desktop
<img src="https://user-images.githubusercontent.com/61361957/92297145-06647f80-eef1-11ea-9fd8-0f5733dcf8a0.gif" width="600" alt="Desktop Demo Gif"/>

* iPhone 6/7/8 - Portrait
<img src="https://user-images.githubusercontent.com/61361957/92297158-2c8a1f80-eef1-11ea-8b68-49b6d1e2c515.gif" width="600" alt="iPhone 6/7/8 - Portrait - Demo Gif"/>


* iPhone 6/7/8 - Landscape
<img src="https://user-images.githubusercontent.com/61361957/92297147-095f7000-eef1-11ea-9179-fe6ae5f86991.gif" width="600" alt="iPhone 6/7/8 - Landscape - Demo Gif"/>

* iPad - Portrait
<img src="https://user-images.githubusercontent.com/61361957/92297148-0bc1ca00-eef1-11ea-9795-cce70c226739.gif" width="600" alt="iPad - Portrait - Demo Gif"/>

* iPad - Landscape
<img src="https://user-images.githubusercontent.com/61361957/92297149-0c5a6080-eef1-11ea-9a1e-aa3499ddd722.gif" width="600" alt="iPad - Landscape - Demo Gif"/>
