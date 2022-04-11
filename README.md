#   Furniture Store App

*   It is a React application that lists the furnitures of different categories.

*   Customers can customize the furnitures based on filters provided.

##  Images 

### Image -1

![Furniture Store -1](https://github.com/sudarshan-sh/FurnitureStoreApp/blob/main/images/Screenshot%20from%202022-04-11%2018-00-11.png)

### Image -2

![Furniture Store -2](https://github.com/sudarshan-sh/FurnitureStoreApp/blob/main/images/Screenshot%20from%202022-04-11%2018-00-45.png)

##  Functional

*   Furnitures are being categorized into various fields like- All, Office, Living Room, Kitchen, Bedroom, Dining & Kids.

*   Other categories are companies/brands, colors, price range, etc.

*   Products can also be sorted by- lowest to highest price & vice-versa, alphabetical order and reverse order as well.

*   After selecting any product, the app redirects to details of that product like image, name, received stars, customer reviews, description, availability, brand name.
    
    *   Customer then can select the number of items of that particluar product he/she wants.

    *   After that, however, the selected product(s) will be adding to the cart.

*   Cart shows the number of different items selected by the customer along with price, quantity and subtotal mentioned.

    *   Later, the order total of all products would be generated, from there the customer would redirect to checkout page for the payment.

*   Checkout page would be visible only when user is logged in or authenticated.

*   On checkout page, customer has to fill the valid card details like Card no.- 4242 4242 4242 4242 (Visa card), is provided by the stripe for testing purpose, then only he/she can pay the amount otherwise not proceeded.

*   If payment would be successful, the customer would receive a success message and he/she can check the stripe dashboard for the transaction he has done.

    *   Later, customer would navigate to home page automatically. 


##  Technical

*   This application is built on **ReactJS** in which user has to be logged in to purchase the furniture for which a JavaScript based library is used i.e... **Auth0 React SDK** for implementing authentication.

*  Auth0 React SDK has **useAuth0** hook which has been used to access authentication state (isLoading, isAuthenticated and user) and authentication methods (loginWithRedirect and logout).

*   For payment process and to collect online payments, React Stripe.js has been used.

*   When customer pays the amount, so to connect with the stripe, a serverless function is required to create payment intent which returns the client secret key which would be used on client side to tokenize payment information.

    *   On serverless function the data like total amount, shipping fee, etc. would be posted through axios or any other library. 

*   netlify.toml file tells netlify that where the serverless function is located. 

*   Other external libraries/packages/modules used in this application are- axios, dotenv, react-icons, react-router-dom & netlify.

*  Source of data -

    Products API - https://course-api.com/react-store-products

    Single Product API - https://course-api.com/react-store-single-product?id=