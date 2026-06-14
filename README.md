# Blog API with Authentication

A secure RESTful Blog API built using Node.js, Express, and MongoDB. It features user authentication via JSON Web Tokens (JWT), data validation using Joi, and text searching for blog articles.

## Features

- **User Authentication:** Secure signup and login with `bcryptjs` password hashing and JWT issuance.
- **Protected Routes:** Global or route-specific authorization via a custom `requireAuth` middleware.
- **CRUD Operations:** Full Create, Read, Update, and Delete capabilities for articles.
- **Ownership Verification:** Users can only modify or delete articles they created.
- **Robust Validation:** Request payload checking implemented using Joi.
- **Error Handling:** Centralized Express error-handling middleware managing MongoDB codes (e.g., duplicate keys) and routing errors.
- **Search Capability:** Database-level text indexing to query articles by keywords.

---

## Project Structure

```text
├── middleware/
│   ├── errorHandler.js
│   ├── logger.js
│   ├── requireAuth.js
│   └── validate.js
├── models/
│   ├── article.models.js
│   └── user.models.js
├── routes/
│   ├── articles.routes.js
│   └── auth.routes.js
├── .env
├── .gitignore
├── package.json
└── server.js
