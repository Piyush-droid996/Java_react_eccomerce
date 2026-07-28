# 🛒 EazyStore - Full Stack E-Commerce Application

A production-inspired Full Stack E-Commerce application built using Java, Spring Boot, React, MySQL, Docker and JWT Authentication.

The project demonstrates enterprise-level architecture, secure authentication, REST APIs, Docker containerization, responsive frontend design, and complete shopping workflows.

---

# 🚀 Live Demo

Frontend:
https://java-react-eccomerce.vercel.app/

Backend:
Running locally using Docker

---

# 📸 Project Preview

(Add screenshots here)
**<img width="1898" height="918" alt="image" src="https://github.com/user-attachments/assets/3c3de367-c62d-442a-a6df-6266ce24b8e4" />
<img width="1654" height="738" alt="image" src="https://github.com/user-attachments/assets/a9338c45-8563-4d5b-82ad-d4fa16f1ba01" />
<img width="1513" height="410" alt="image" src="https://github.com/user-attachments/assets/27b6828e-381c-461a-915f-0f9fb2fdfb4f" />


**
- Home Page
- Product Listing
- Product Details
- Login
- Register
- Cart
- Orders
- Admin Dashboard

---

# 🚀 Tech Stack

## Backend

- Java 21
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- REST APIs

---

## Frontend

- React 19
- Vite
- React Router
- Bootstrap 5
- CSS3
- Axios
- Context API

---

## Database

- MySQL 8.4

---

## DevOps

- Docker
- Docker Compose
- Nginx
- Multi-stage Docker Build

---

# ✨ Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- BCrypt Password Encryption
- Stateless Authentication
- Role Based Authorization
- Protected Routes

---

## Product Management

- View Products
- Product Details
- Product Categories
- Popular Products
- Responsive Product Cards

---

## Category Management

- View Categories
- Admin CRUD Operations

---

## Shopping Cart

- Add to Cart
- Update Quantity
- Remove Items
- View Cart Summary

---

## Orders

- Place Order
- View Order History
- Order Details

---

## Admin Module

- Dashboard
- Product Management
- Category Management

---

## Frontend Features

- Fully Responsive Design
- Mobile Friendly
- Bootstrap Layout
- React Context API
- Protected Routing
- API Integration
- Error Handling
- Loading Indicators

---

## Backend Features

- Layered Architecture
- DTO Pattern
- Repository Pattern
- Service Layer
- Global Exception Handling
- Validation
- Constructor Injection
- RESTful APIs
- JWT Security
- CORS Configuration

---

## Docker Features

- Dockerized Spring Boot Backend
- Dockerized React Frontend
- Dockerized MySQL
- Docker Compose
- Persistent MySQL Volume
- Environment Variable Configuration
- Production Build using Nginx

---

# 🏗️ System Architecture

```
                React Frontend
                     │
             Axios REST Calls
                     │
                     ▼
          Spring Boot REST APIs
                     │
          Spring Security + JWT
                     │
                Service Layer
                     │
               Repository Layer
                     │
              Spring Data JPA
                     │
                     ▼
                  MySQL Database
```

---

# 🐳 Docker Architecture

```
                 Docker Compose
                      │
      ┌───────────────┼────────────────┐
      │               │                │
      ▼               ▼                ▼

 React Container   Spring Boot      MySQL
     Nginx          Container      Container
      │               │                │
      └───────────────┼────────────────┘
                      │
                 Docker Network
```

---

# 🔐 Authentication Flow

```
User Login

      │

      ▼

AuthenticationManager

      │

      ▼

DaoAuthenticationProvider

      │

      ▼

CustomUserDetailsService

      │

      ▼

UserRepository

      │

      ▼

Password Verification

      │

      ▼

JWT Generated

      │

      ▼

Client Stores JWT

      │

      ▼

Authorization Header

      │

      ▼

JwtAuthenticationFilter

      │

      ▼

SecurityContextHolder

      │

      ▼

Protected APIs
```

---

# 📁 Project Structure

```
Java_react_eccomerce

│

├── Eazy_Store
│   ├── src
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── pom.xml
│   └── .env

│
├── frontend
│   ├── src
│   ├── public
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js

│
├── README.md
├── DOCKER_IMPLEMENTATION.md
└── DOCKER_RUNBOOK.md
```

---

# 📂 Backend Architecture

```
config

controller

dto

entity

repository

security

service

service.impl

exception
```

---

# 🎨 Frontend Structure

```
src

api

assets

components

context

hooks

layouts

pages

routes

utils
```

---

# 🗄️ Database Relationships

```
Category
      │
      └────────────► Product

User
      │
      └────────────► Cart

User
      │
      └────────────► Orders

Order
      │
      └────────────► OrderItems

Product
      │
      └────────────► OrderItems
```

---

# 🔒 Authorization Matrix

| API | USER | ADMIN |
|------|------|-------|
| Register | ✅ | ✅ |
| Login | ✅ | ✅ |
| View Products | ✅ | ✅ |
| Product CRUD | ❌ | ✅ |
| Category CRUD | ❌ | ✅ |
| Cart | ✅ | ✅ |
| Orders | ✅ | ✅ |

---

# 📦 REST APIs

## Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

---

## Products

```
GET
POST
PUT
DELETE
```

---

## Categories

```
GET
POST
PUT
DELETE
```

---

## Cart

```
GET
POST
PUT
DELETE
```

---

## Orders

```
GET
POST
```

---

# 🛠️ Spring Concepts Used

- Spring Boot
- Spring MVC
- Spring Security
- JWT
- AuthenticationManager
- SecurityFilterChain
- BCrypt
- Spring Data JPA
- Hibernate
- Bean Validation
- Dependency Injection
- Constructor Injection
- Exception Handling

---

# ⚛️ React Concepts Used

- Functional Components
- Hooks
- Context API
- React Router
- Axios
- Responsive Design
- Bootstrap
- State Management

---

# 🐳 Running Using Docker

## Clone Repository

```bash
git clone https://github.com/Piyush-droid996/Java_react_eccomerce.git
```

---

## Navigate

```bash
cd Java_react_eccomerce/Eazy_Store
```

---

## Start Containers

```bash
docker compose up --build -d
```

---

## Stop Containers

```bash
docker compose down
```

---

## View Running Containers

```bash
docker ps
```

---

## View Logs

```bash
docker compose logs -f
```

---

# 🌐 Application URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:8080
```

MySQL

```
localhost:3306
```

---

# 📈 Future Enhancements

- Product Search
- Pagination
- Sorting
- Wishlist
- Payment Gateway
- Email Notifications
- Swagger Documentation
- Unit Testing
- Integration Testing
- CI/CD Pipeline
- Kubernetes Deployment
- AWS Deployment

---

# 👨‍💻 Author

**Piyush Saxena**

Java Full Stack Developer

Java • Spring Boot • React • MySQL • Docker • JWT • REST APIs

GitHub:
https://github.com/Piyush-droid996

---

⭐ If you found this project useful, please consider giving it a Star.
