# 🛒 EazyStore Backend

A production-inspired E-Commerce Backend built using **Java, Spring Boot, Spring Security, JWT Authentication, Spring Data JPA, Hibernate, and MySQL**.

This project demonstrates secure authentication, role-based authorization, RESTful APIs, layered architecture, entity relationships, and common e-commerce functionalities.

---

# 🚀 Tech Stack

- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Maven
- REST APIs
- Bean Validation

---

# ✨ Features

## Authentication & Authorization

- User Registration
- User Login
- BCrypt Password Encryption
- JWT Token Generation
- JWT Authentication Filter
- Stateless Authentication
- Role-Based Authorization
- Spring Security Integration

---

## Product Management

- Create Product
- Get All Products
- Get Product By Id
- Update Product
- Delete Product

---

## Category Management

- Create Category
- Get Categories
- Update Category
- Delete Category

---

## Cart Management

- Add Product to Cart
- View Cart
- Update Cart Quantity
- Remove Cart Item

---

## Order Management

- Place Order
- View Orders
- View Order Details
- Convert Cart into Order

---

## Other Features

- DTO Pattern
- Layered Architecture
- Global Exception Handling
- Request Validation
- Repository Pattern
- Constructor Injection
- Entity Relationships

---

# 🏗️ Project Architecture

```
                Client (React/Postman)
                        │
                        ▼
                 REST Controllers
                        │
                        ▼
                  Service Layer
                        │
                        ▼
             Repository Layer (JPA)
                        │
                        ▼
                     MySQL Database
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
JWT Token Generated
     │
     ▼
Client Stores JWT
     │
     ▼
Authorization: Bearer <TOKEN>
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
src/main/java
│
├── config
│     └── SecurityConfig
│
├── controller
│     ├── AuthController
│     ├── ProductController
│     ├── CategoryController
│     ├── CartController
│     └── OrderController
│
├── dto
│
├── entity
│
├── exception
│
├── repository
│
├── security
│     ├── JwtAuthenticationFilter
│     ├── JwtService
│     ├── CustomUserDetails
│     └── CustomUserDetailsService
│
├── service
│
└── service.impl
```

---

# 🗄️ Database Design

```
User
│
├──────────────┐
│              │
▼              ▼
Cart         Orders
│              │
│              ▼
│          OrderItems
│
▼
Product
▲
│
Category
```

---

# 🔄 Entity Relationships

```
Category
      │
      └────────────► Product
          One-To-Many

User
      │
      └────────────► Cart
          One-To-Many

Product
      │
      └────────────► Cart
          One-To-Many

User
      │
      └────────────► Order
          One-To-Many

Order
      │
      └────────────► OrderItem
          One-To-Many

Product
      │
      └────────────► OrderItem
          Many-To-One
```

---

# 🔒 API Authorization

| API | USER | ADMIN |
|------|:----:|:-----:|
| Register | ✅ | ✅ |
| Login | ✅ | ✅ |
| View Products | ✅ | ✅ |
| Create Product | ❌ | ✅ |
| Update Product | ❌ | ✅ |
| Delete Product | ❌ | ✅ |
| View Categories | ✅ | ✅ |
| Create Category | ❌ | ✅ |
| Update Category | ❌ | ✅ |
| Delete Category | ❌ | ✅ |
| Cart APIs | ✅ | ✅ |
| Order APIs | ✅ | ✅ |

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
GET    /api/v1/products
GET    /api/v1/products/{id}
POST   /api/v1/products
PUT    /api/v1/products/{id}
DELETE /api/v1/products/{id}
```

---

## Categories

```
GET    /api/v1/categories
GET    /api/v1/categories/{id}
POST   /api/v1/categories
PUT    /api/v1/categories/{id}
DELETE /api/v1/categories/{id}
```

---

## Cart

```
POST   /api/v1/cart
GET    /api/v1/cart
PUT    /api/v1/cart/{id}
DELETE /api/v1/cart/{id}
```

---

## Orders

```
POST   /api/v1/orders
GET    /api/v1/orders
GET    /api/v1/orders/{id}
```

---

# 🛠️ Spring Concepts Used

- Spring Boot
- Spring MVC
- Spring Security
- JWT Authentication
- AuthenticationManager
- AuthenticationProvider
- DaoAuthenticationProvider
- UserDetails
- UserDetailsService
- SecurityFilterChain
- BCrypt Password Encoder
- Spring Data JPA
- Hibernate ORM
- Bean Validation
- Exception Handling
- Dependency Injection
- Constructor Injection

---

# ▶️ Running the Project

## Clone Repository

```bash
git clone https://github.com/your-username/EazyStore-Backend.git
```

---

## Configure Database

Update `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/eazystore
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
```

---

## Run Application

```bash
mvn spring-boot:run
```

Application runs on

```
http://localhost:8080
```

---

# 📌 Future Enhancements

- Swagger / OpenAPI Documentation
- Pagination
- Sorting
- Product Search
- Docker
- Unit Testing (JUnit & Mockito)
- React Frontend
- Deployment

---

# 👨‍💻 Author

**Piyush Saxena**

- Java Developer
- Spring Boot Developer
- React Developer

---

## ⭐ If you found this project useful, don't forget to star the repository!
