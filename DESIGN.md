# DESIGN

## Data Model

The application consists of four primary collections.

### User

Stores authentication and authorization data.

* name
* email
* password (hashed using bcrypt)
* role (admin/shopper)

### Product

Represents an inventory item.

* name
* sku (unique)

A unique MongoDB index guarantees SKU uniqueness at the database layer.

### Store

Represents a physical store.

* name
* address

### Stock

Represents the quantity of a product available at a specific store.

Fields:

* product (ObjectId → Product)
* store (ObjectId → Store)
* quantity

A compound unique index on `(product, store)` guarantees that only one stock record exists for each product-store combination.

---

## Validation

Server-side validation includes:

* Required fields
* Existing product validation
* Existing store validation
* Positive transfer quantity
* Reject transfer to the same store
* Reject transfers exceeding available stock
* SKU uniqueness
* Role-based authorization using JWT

---

## Frontend Design

The frontend is built with React, Tailwind CSS, and shadcn/ui.

Authentication state is managed through React Context, while JWT tokens are stored on the client and attached to requests using an Axios interceptor.

Admin users are presented with inventory management actions, whereas shoppers have read-only access to products, stores, and stock information. All authorization is enforced by the backend regardless of frontend visibility.
