### API Documentation for Foodtech

This document outlines the API endpoints available in your app, including the methods, request parameters, and example responses to help you understand how to consume the API.

#### Base URL
The base URL for all API endpoints is: `http://localhost:5000/api`
Replace `localhost:5000` with your production server URL when deployed.

---

### Authentication

#### Register User
- **Endpoint:** `/auth/register/user`
- **Method:** POST
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "YOUR_AUTH_TOKEN"
  }
  ```

#### Login
- **Endpoint:** `/auth/login`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123",
    "userType": "user" // or "merchant" for merchant login
  }
  ```
- **Response:**
  ```json
  {
    "token": "YOUR_AUTH_TOKEN"
  }
  ```

---

### User Profile

#### Get User Profile
- **Endpoint:** `/user/profile`
- **Method:** GET
- **Authorization:** Bearer Token (Your Auth Token)
- **Response:**
  ```json
  {
    "id": "USER_ID",
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```

#### Update User Profile
- **Endpoint:** `/user/profile`
- **Method:** PUT
- **Authorization:** Bearer Token (Your Auth Token)
- **Body:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **Response:**
  ```json
  {
    "id": "USER_ID",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```

---

### Products

#### Add Product
- **Endpoint:** `/products`
- **Method:** POST
- **Authorization:** Bearer Token (Your Auth Token)
- **Body:**
  ```json
  {
    "name": "Product Name",
    "price": 100,
    "description": "Product Description",
    "category": "Product Category",
    "quantity": 10,
    "imageUrl": "http://example.com/product.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "id": "PRODUCT_ID",
    "name": "Product Name",
    "price": 100,
    ...
  }
  ```

#### Get All Products
- **Endpoint:** `/products`
- **Method:** GET
- **Response:**
  ```json
  [
    {
      "id": "PRODUCT_ID",
      "name": "Product Name",
      "price": 100,
      ...
    },
    ...
  ]
  ```

#### Update Product
- **Endpoint:** `/products/{productId}`
- **Method:** PUT
- **Authorization:** Bearer Token (Your Auth Token)
- **Body:**
  ```json
  {
    "name": "Updated Product Name",
    "price": 150,
    ...
  }
  ```
- **Response:**
  ```json
  {
    "id": "PRODUCT_ID",
    "name": "Updated Product Name",
    "price": 150,
    ...
  }
  ```

#### Delete Product
- **Endpoint:** `/products/{productId}`
- **Method:** DELETE
- **Authorization:** Bearer Token (Your Auth Token)
- **Response:**
  ```json
  {
    "message": "Product removed"
  }
  ```

---

### Notes
Replace `{productId}` with the actual ID of the product you want to update or delete.
Ensure to include the Bearer Token obtained from login in the Authorization header for endpoints requiring authentication.
