# ShopBrocus — Full Stack Developer Assignment

A full-stack e-commerce style app built with the **MERN stack** (MongoDB, Express, React, Node.js).

> **Submitted by:** Aditya  
> **Assignment for:** Brocus IT Solutions Pvt. Ltd.

---

## 🚀 Live Links

| Service | URL |
|---------|-----|
| Frontend | https://your-app.vercel.app |
| Backend API | https://your-api.railway.app |
| GitHub | https://github.com/yourusername/brocus-assignment |

---

## ✅ Features

- **JWT Authentication** — Signup, login, and logout with secure token storage
- **Protected Routes & APIs** — Frontend route guards + backend middleware
- **Product CRUD** — Create, read, update, delete products (admin users)
- **Product Listing** — Cards with image, title, description, price, stock, category
- **Purchase Flow** — Only logged-in users can purchase; stock is decremented on purchase
- **My Orders** — View your complete order history
- **Search & Filter** — Search by name, filter by category, paginated results
- **Toast Notifications** — Success and error feedback on all actions
- **Responsive UI** — Works on mobile and desktop
- **Single-Page Experience** — No full page reloads

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Context API, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| Validation | express-validator |
| Notifications | react-hot-toast |
| Deployment | Vercel (frontend), Railway (backend) |

---

## 📁 Project Structure

```
brocus-app/
├── backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Signup & login logic
│   │   ├── productController.js
│   │   └── purchaseController.js
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT protect + adminOnly
│   ├── models/
│   │   ├── User.js             # name, email, password, role
│   │   ├── Product.js          # title, desc, price, stock, category
│   │   └── Purchase.js         # userId, productId, qty, totalPrice, status
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── purchaseRoutes.js
│   │   └── meRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── AuthModal.js     # Login + Signup modal
    │   │   ├── ProductCard.js
    │   │   └── ProductModal.js  # Add/edit product
    │   ├── context/
    │   │   └── AuthContext.js   # Global auth state
    │   ├── pages/
    │   │   ├── ProductsPage.js
    │   │   └── OrdersPage.js
    │   ├── utils/
    │   │   └── api.js           # Axios instance with interceptors
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env.example
    └── package.json
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/brocus-assignment.git
cd brocus-assignment
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env — set REACT_APP_API_URL=http://localhost:5000/api
npm start
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/brocus
JWT_SECRET=your_super_secret_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### Frontend (`frontend/.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT |

### User
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/me` | Yes | Get current user profile |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List all products (supports `?search=&category=&page=`) |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Yes | Create product |
| PUT | `/api/products/:id` | Yes | Update product |
| DELETE | `/api/products/:id` | Yes | Delete product |

### Purchase
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/purchase` | Yes | Create purchase order |
| GET | `/api/purchase` | Yes | Get my order history |

---

## 🚢 Deployment

### Backend → Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app), create new project → Deploy from GitHub
3. Select the `backend` folder (or set root directory)
4. Add environment variables in Railway dashboard
5. Railway auto-detects Node.js and runs `npm start`

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com), import GitHub repo
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL=https://your-api.railway.app/api`
4. Deploy

---

## 🗄️ Database Models

### User
```js
{ name, email, password (hashed), role: 'user'|'admin', createdAt }
```

### Product
```js
{ title, description, imageUrl, price, category, stock, createdAt }
```

### Purchase
```js
{ userId (ref), productId (ref), quantity, totalPrice, status, createdAt }
```

---

## 🔑 Making a User Admin

In MongoDB Atlas, find the user document and change `role` from `"user"` to `"admin"`. Admin users see edit/delete buttons on products and can add new products.

---

## 🎁 Bonus Features Implemented

- ✅ Toast notifications for all actions
- ✅ Search and category filter
- ✅ Pagination
- ✅ Loading skeleton animation
- ✅ Frontend and backend validation
- ✅ Auto logout on token expiry (axios interceptor)
- ✅ Responsive mobile design
