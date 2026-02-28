# 📚 BookStore — Backend API

A RESTful backend API for an e-commerce bookstore, built with **Express.js** and deployed as serverless functions on **Netlify**. It handles everything from user authentication to order management.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework for building the API |
| **MongoDB + Mongoose** | Database and data modeling |
| **Netlify Functions** | Serverless deployment of the Express app |
| **netlify-cli** | Local development server |
| **JWT** | User authentication (JSON Web Tokens) |
| **Cloudinary** | Book cover image storage |
| **Nodemailer** | Sending password reset emails |
| **Stripe** | Payment processing |

---

## 🚀 Getting Started (Run Locally)

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) — install it globally with:

```bash
npm install -g netlify-cli
```

### 1. Clone the Repository

For HTTPS:
```bash
git clone https://github.com/ZeyadHMostafa/Book-Store-BackEnd-Node.git
cd book-store-backend-node
```
For SSH:
```bash
git clone git@github.com:ZeyadHMostafa/Book-Store-BackEnd-Node.git
cd book-store-backend-node
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project. You can use the existing `.env.example` file as a reference. It should include values for your MongoDB connection string, JWT secret, Cloudinary credentials, Stripe credentials, and any other secrets.

### 4. Start the Development Server

```bash
npm start
```

This runs `netlify dev` under the hood, which spins up a local server at:

```
http://localhost:8888
```

All API routes are available at `http://localhost:8888/api/`.

---

## ⚙️ Project Structure

```
.
├── netlify/
│   └── functions/
│       └── api.js          # Entry point — wraps Express for Netlify
├── src/
│   ├── controllers/        # Route handler logic
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express route definitions
│   ├── services/           # Business logic (auth, email, orders)
│   └── validators/         # Request validation schemas (Joi)
├── docs/
│   └── swagger-output.json # Auto-generated API documentation
├── scripts/
│   └── swagger.js          # Script to regenerate API docs
├── netlify.toml            # Netlify configuration (functions, redirects, rate limiting)
└── package.json
```

---

## 🔒 Authentication

Most write operations (POST, PATCH, DELETE) require you to be logged in.

1. Register or log in via the `/api/user/register` or `/api/user/login` endpoints.
2. You'll receive a **JWT token** in the response.
3. Include it in the `Authorization` header of all protected requests:

```
Authorization: Bearer <your_token_here>
```

Endpoints marked with 🔐 below require this token.

---

## 🛡️ Rate Limiting

To protect the API from being overwhelmed with too many requests, rate limiting is configured at the infrastructure level in `netlify.toml`.

**Limit:** **10 requests per 60 seconds**, per IP address and domain.

If you exceed this limit, the server will return a `429 Too Many Requests` error. This is handled automatically by Netlify — no extra code needed on our end.

---

## 📡 API Endpoints

Base URL (local): `http://localhost:8888/api`

---

### 👤 User

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/user/register` | Register a new user account | — |
| `POST` | `/user/login` | Log in and receive a JWT token | — |
| `GET` | `/user/me` | Get your own profile | 🔐 |
| `PATCH` | `/user/me` | Update your profile details | 🔐 |

---

### 🔑 Auth (Password Reset)

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/forgot-password` | Request a password reset email | — |
| `POST` | `/auth/verify-reset-code` | Verify the 6-digit reset code | — |
| `POST` | `/auth/update-password` | Set a new password using reset code | — |

---

### 📖 Books

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/book/` | List all books | — |
| `GET` | `/book/count` | Get total number of books | — |
| `GET` | `/book/:id` | Get a single book by its ID | — |
| `GET` | `/book/author/:authorId` | Get all books by a specific author | — |
| `GET` | `/book/category/:categoryId` | Get all books in a specific category | — |
| `POST` | `/book/` | Create a new book (with cover image upload) | 🔐 |
| `PATCH` | `/book/:id` | Update book details | 🔐 |
| `DELETE` | `/book/:id` | Delete a book | 🔐 |

---

### ✍️ Authors

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/author/` | List all authors | — |
| `GET` | `/author/count` | Get total number of authors | — |
| `GET` | `/author/:id` | Get a single author by ID | — |
| `POST` | `/author/` | Create a new author | 🔐 |
| `PATCH` | `/author/:id` | Update author details | 🔐 |
| `DELETE` | `/author/:id` | Delete an author | 🔐 |

---

### 🏷️ Categories

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/category/` | List all categories | — |
| `GET` | `/category/count` | Get total number of categories | — |
| `GET` | `/category/:id` | Get a single category by ID | — |
| `POST` | `/category/` | Create a new category | 🔐 |
| `PATCH` | `/category/:id` | Update category details | 🔐 |
| `DELETE` | `/category/:id` | Delete a category | 🔐 |

---

### 🛒 Cart

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/cart/` | View your current cart | 🔐 |
| `POST` | `/cart/` | Add or update an item in your cart | 🔐 |
| `DELETE` | `/cart/:bookId` | Remove a specific item from your cart | 🔐 |

---

### 📦 Orders

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/order/` | Place a new order from your cart | 🔐 |
| `GET` | `/order/my-orders` | View your own order history | 🔐 |
| `GET` | `/order/` | Get all orders — Admin only | 🔐 |
| `GET` | `/order/count` | Count all orders — Admin only | 🔐 |
| `PATCH` | `/order/:id` | Update order status — Admin only | 🔐 |
| `DELETE` | `/order/:id` | Delete an order — Admin only | 🔐 |

---

### ⭐ Reviews

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/review/` | Get all reviews | — |
| `GET` | `/review/:id` | Get a single review by ID | — |
| `POST` | `/review/` | Create a review for a book | 🔐 |
| `PATCH` | `/review/:id` | Update your review | 🔐 |
| `DELETE` | `/review/:id` | Delete a review | 🔐 |

---

## 📝 Useful Scripts

| Command | What it does |
|---|---|
| `npm start` | Start the local dev server via `netlify dev` |
| `npm run swagger` | Regenerate the API documentation from the routes |
| `npm run mermaid` | Regenerate the database ERD diagram |

---

## 👥 Team

| Name | GitHub |
|---|---|
| Ibrahim Mostafa | [@ebrahimmostafa133](https://github.com/ebrahimmostafa133) |
| Ziad Hesham | [@ZeyadHMostafa](https://github.com/ZeyadHMostafa) |
| Ahmed Ehab | [@ahmed-ehab-reffat](https://github.com/ahmed-ehab-reffat) |
