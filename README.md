# Multi-Store Stock Management (MERN)

A full-stack inventory management application built with the MERN stack for managing product stock across multiple stores.

## Features

### Authentication

* JWT Authentication
* Role-based authorization (Admin & Shopper)
* Secure password hashing with bcryptjs
* Protected routes

### Admin

* Create products
* Create stores
* Adjust stock quantity
* Transfer stock between stores
* View stock across all stores

### Shopper

* View products
* View stores
* View stock levels
* Filter low-stock items

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

### Frontend

* React
* Vite
* Tailwind CSS
* shadcn/ui
* React Router
* Axios
* Sonner

## Project Structure

```
server/
client/
```

---

## Prerequisites

* Node.js (v18+ recommended)
* MongoDB Atlas (or local MongoDB)
* npm

---

## Backend Setup

Navigate to the server directory.

```bash
cd server
```

Install dependencies.

```bash
npm install
```

Create a `.env` file using `.env.example`.

Example:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

Start the backend.

```bash
npm run dev
```

---

## Frontend Setup

Navigate to the client directory.

```bash
cd client
```

Install dependencies.

```bash
npm install
```

Create a `.env` file.

```
VITE_API_URL=http://localhost:5000/api/v1
```

Run the frontend.

```bash
npm run dev
```

---

## Database Seeding

The repository includes a seed script to populate:

* Products
* Stores
* Stock records

Run:

```bash
npm run seed
```

---

## API Documentation

Swagger documentation is available at:

```
http://localhost:5000/api-docs
```

The OpenAPI specification is included as:

```
openapi.json
```

---

## Roles

### Admin

Can:

* Create products
* Create stores
* Adjust stock
* Transfer stock
* View stock

### Shopper

Can:

* View products
* View stores
* View stock

Cannot modify any inventory data.

---

## Assumptions

* SKU must be unique.
* Each product-store pair has only one stock record.
* Stock quantity cannot become negative.
* Transfers between the same store are rejected.
* Transfer quantity must be greater than zero.

---

## Trade-offs

* JWT authentication is stateless.
* Frontend hides admin actions, while backend enforces authorization.
* Dashboard data is loaded using existing APIs instead of a dedicated dashboard endpoint to keep the backend aligned with the assignment scope.
