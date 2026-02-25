# 💰 Financial Monitor – Backend API (.NET 10)

## 📌 Overview

Financial Monitor is a real-time financial transactions monitoring system built with .NET 10.  
The system is designed for distributed environments with a strong focus on high performance, full asynchronous processing, and live client updates.

---

## 🛠 Tech Stack

- **Framework:** ASP.NET Core 10 (Minimal APIs)
- **ORM:** Entity Framework Core
- **Database:** SQLite
- **Real-Time Communication:** SignalR (Hubs)
- **Caching:** IDistributedCache (Redis-ready)
- **Validation:** FluentValidation

---

## ⭐ Key Features

### ⚡ End-to-End Asynchronous Architecture

The entire request pipeline (API → Service → Database → Cache → SignalR) is fully asynchronous to maximize server resource utilization and improve throughput.

---

### 🧠 Distributed Caching

- Uses `IDistributedCache`
- Ensures data consistency across multiple server instances
- Easily replaceable with Redis via configuration only
- Supports horizontal scaling

---

### 🧩 Separation of Concerns

#### 🔹 TransactionService
- Handles business logic
- Persists transactions to the database
- Manages cache invalidation

#### 🔹 TransactionNotificationService
- Dedicated to SignalR communication
- Broadcasts transaction updates to connected clients
- Fully separated from business logic

---

### 📈 Scale-Ready Infrastructure

- Redis Backplane can be connected to SignalR
- Cache provider can be swapped to Redis
- No code changes required — configuration-based setup

---

## 🔌 API Endpoints

### ➕ Create Transaction

```http
POST /api/transactions
```

**Behavior:**
- Saves transaction to the database
- Clears relevant cache
- Broadcasts real-time update via SignalR

---

### 📥 Get Recent Transactions

```http
GET /api/transactions/recent
```

**Behavior:**
- Retrieves the 10 most recent transactions
- Attempts to fetch from distributed cache
- Falls back to database if cache is empty (cache miss)

---

## 🔔 Real-Time Communication (SignalR)

- **Hub URL:** `/transactionHub`
- **Client Event to Listen For:** `ReceiveTransactionUpdate`
- Notifications are sent through a dedicated notification service
- Supports distributed messaging (Redis Backplane ready)

---

## ⚙ Installation & Running

### 1️⃣ Restore NuGet Packages

```bash
dotnet restore
```

### 2️⃣ Configure CORS

Update `AllowedOrigins` inside:

```
appsettings.json
```

CORS configuration is environment-based and not hardcoded.

### 3️⃣ Run the Project

```bash
dotnet run
```

- SQLite database is automatically created on first run.

---

## 🧱 Database & Migrations

If the `Transaction` model changes:

```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

---

## 🧼 Maintainability Highlights

- Clean separation between business logic and real-time messaging
- Configuration-based CORS
- Distributed-ready caching layer
- Async-first design
- Easily scalable infrastructure

---

## 🚀 Future Improvements (Optional)

- Full Redis integration
- Structured logging
- Health checks endpoint
- Docker support
- CI/CD pipeline

---

## 🏁 Summary

Financial Monitor is a scalable, production-ready backend system demonstrating:

- End-to-End asynchronous architecture  
- Clean separation of concerns  
- Distributed system readiness  
- Real-time client updates  
- Cloud-ready infrastructure  