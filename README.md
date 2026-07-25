# 🛒 MyShop - Full Stack E-Commerce Application

A modern full-stack e-commerce application that provides a complete online shopping experience with user authentication, product management, shopping cart functionality, and order processing.

---

## 🚀 Features

### 🔐 Authentication

* User registration and login
* JWT-based authentication
* Password encryption with bcrypt
* Protected routes and user authorization

### 📦 Products Management

* Browse available products
* View detailed product information
* Product management API
* Store and retrieve product data from MongoDB

### 🛒 Shopping Cart

* Add products to cart
* Update product quantities
* Remove products from cart
* Display cart summary

### 📋 Orders

* Create and manage orders
* Calculate order totals
* View user order history
* Manage order status

---

# 🛠️ Technologies Used

## Frontend

* React.js
* React Router
* Axios
* Bootstrap 5
* Bootstrap Icons
* Vite

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

# 📂 Project Structure

```
MyShop
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   └── services
│   └── package.json
│
└── server
    ├── controllers
    ├── models
    ├── routes
    ├── middleware
    └── package.json
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone your_repository_link
```

## 2. Backend Setup

```bash
cd server

npm install

npm run dev
```

Backend server:

```
http://localhost:5000
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client

npm install

npm run dev
```

Frontend application:

```
http://localhost:5173
```

---

# 🔐 Environment Variables

Create a `.env` file inside the `server` folder:

```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

# 📸 Application Preview



* Home page
* Product details
* Login/Register pages
* Shopping cart
* Orders page
* Admin dashboard

---

# 🎯 Learning Objectives

Through this project, I gained experience in:

* Developing REST APIs with Express.js
* Building a responsive frontend with React and Bootstrap
* Connecting frontend and backend applications
* Implementing JWT authentication
* Managing MongoDB databases with Mongoose
* Creating a complete e-commerce workflow

---

# 👩‍💻 Author

**Malek Ben Mansour**

Full Stack Developer
