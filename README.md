# Blog API with Authentication

A secure, production-ready RESTful Blog API built with Node.js, Express, and MongoDB Atlas. Features JWT-based authentication, image uploads via Cloudinary, Joi validation, full-text search, and a clean MVC architecture.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Authentication:** JSON Web Tokens (JWT) + bcryptjs
- **Image Uploads:** Multer + Cloudinary
- **Validation:** Joi
- **Deployment:** Render

---

## Features

- User signup and login with hashed passwords
- JWT-based route protection via `requireAuth` middleware
- Full CRUD operations for blog articles
- Image upload with 5MB limit and MIME type validation (JPEG, PNG, WEBP)
- Ownership check — users can only edit or delete their own articles
- Full-text search using MongoDB `$text` index
- Centralized error handling and request logging
- Environment variable validation on startup

---

## Project Structure

```
blog-api-auth/
├── src/
│   ├── config/
│   │   ├── checkEnv.js
│   │   └── cloudinary.js
│   ├── controllers/
│   │   ├── article.controller.js
│   │   └── auth.controller.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── logger.js
│   │   ├── requireAuth.js
│   │   ├── upload.js
│   │   └── validate.js
│   ├── models/
│   │   ├── article.models.js
│   │   └── user.models.js
│   ├── routes/
│   │   ├── articles.routes.js
│   │   └── auth.routes.js
│   └── app.js
├── .env.example
├── .gitignore
├── index.js
└── package.json
```

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Japheth-l/blog-api-auth.git
cd blog-api-auth
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

```
PORT=3001
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the development server
```bash
npm run dev
```

---

## API Endpoints

### Auth Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register a new user | No |
| POST | `/auth/login` | Login and receive JWT token | No |

### Article Routes

All article routes require a `Bearer <token>` in the `Authorization` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/articles` | Get all articles |
| GET | `/articles/:id` | Get a single article |
| POST | `/articles` | Create an article (supports image upload) |
| PUT | `/articles/:id` | Update your article |
| DELETE | `/articles/:id` | Delete your article |
| GET | `/articles/search?q=keyword` | Search articles by keyword |

---

## Image Upload

Send `POST /articles` as `multipart/form-data` with an `image` field. Files are streamed directly to Cloudinary — raw binary is never stored in the database. Only the resulting Cloudinary URL is saved to MongoDB.

- Max file size: **5MB**
- Allowed formats: **JPEG, PNG, WEBP**

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port the server runs on |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |

---

## Live Demo

**Base URL:** `https://blog-api-auth.onrender.com`

---

## Author

**Japheth** — [github.com/Japheth-l](https://github.com/Japheth-l)