# 🛒 CodeAlpha Shop - Full Stack E-commerce Application

A full-stack e-commerce web application developed during the **CodeAlpha Full Stack Development Internship**.

This project demonstrates a complete e-commerce workflow with authentication, product management, shopping cart, and order processing.

---

## 🚀 Features

### 🔐 Authentication
- User registration
- User login
- JWT authentication
- Password encryption using bcrypt
- Protected routes

### 📦 Products
- Display all products
- View product details
- Product management API
- Product information stored in MongoDB

### 🛒 Shopping Cart
- Add products to cart
- Update product quantity
- Remove products from cart
- View cart contents

### 📋 Orders
- Create orders
- Calculate total price
- View user's orders
- Order status management

---

# 🛠️ Technologies Used

## Frontend
- React.js
- React Router
- Axios
- Bootstrap
- Vite

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📂 Project Structure
CodeAlpha_Ecommerce
│
├── client
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ └── services
│ └── package.json
│
└── server
├── controllers
├── models
├── routes
├── middleware
└── package.json


---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone your_repository_link
2. Backend Setup
cd server

npm install

npm run dev

The backend will run on:

http://localhost:5000
3. Frontend Setup

Open another terminal:

cd client

npm install

npm run dev

The frontend will run on:

http://localhost:5173
🔐 Environment Variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
📸 Application Preview

(Add screenshots here)

Home page
Product details
Login/Register
Shopping cart
Orders page
🎯 Learning Objectives

Through this project, I practiced:

Building REST APIs with Express.js
Connecting React frontend with backend services
Implementing JWT authentication
Managing MongoDB databases with Mongoose
Creating a complete e-commerce workflow
👩‍💻 Author

Malek Ben Mansour

Full Stack Developer