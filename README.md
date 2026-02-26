# 🚀 Financial Monitor – Distributed Real-Time System

**Developed by Mindy Rosenbaum**  
📅 February 2026  
⏱️ Completed within a 48-hour development sprint  

---

## 🚀 Overview

Financial Monitor is a high-performance, real-time transaction monitoring system built using a modern Cloud-Native approach.

The system enables seamless tracking of financial events through a live dashboard, leveraging a distributed architecture to ensure scalability, reliability, and production-grade readiness in cloud environments.

---

## 🛠️ Tech Stack

### 🔹 Backend
- .NET 10 Web API  
- SignalR  
- Entity Framework Core  

### 🔹 Frontend
- React (Vite)  
- TypeScript  
- Tailwind CSS  

### 🔹 Infrastructure
- Docker  
- Docker Compose  
- Redis (SignalR Backplane)  
- SQLite  

### 🔹 DevOps
- Multi-stage Docker builds  
- Kubernetes manifests  

---

## 🏗️ Cloud-Native & Distributed Architecture

The core technical challenge of this project was ensuring real-time updates (SignalR) function correctly when the backend is horizontally scaled across multiple instances (Pods).

---

### 1️⃣ SignalR Synchronization – Redis Backplane

#### The Problem
In a distributed environment, a client connected to **Server A** does not automatically receive messages emitted by **Server B**.

#### The Solution
A Redis Backplane was implemented.

#### How It Works
- All backend instances connect to a shared Redis Pub/Sub channel.
- When a transaction occurs, the event is published to Redis.
- Redis propagates the message to all connected server instances.
- Each instance then pushes the update to its connected clients.

✅ Ensures real-time consistency across all replicas  
✅ Enables true horizontal scaling  
✅ Production-ready distributed messaging  

---

### 2️⃣ Containerization & Orchestration

#### 🐳 Docker
- Fully containerized application  
- Optimized multi-stage builds  
- Minimal production image footprint  

#### 🧩 Docker Compose
A complete development environment is provided:

- Backend API  
- Frontend Client  
- Redis infrastructure  

All services can be started with a single command.

## 🚦 Getting Started

### ✅ Prerequisites

- Docker Desktop  
- .NET 10 SDK (for local development)

---

### ▶️ Run the Full Ecosystem

To start API, Frontend, and Redis together:

```bash
docker-compose down -v
docker-compose up --build
```

### 🌐 Application URLs

- Frontend: http://localhost:5173  
- API: http://localhost:5000  

---

## 📝 Design Decisions

### 🗄️ SQLite for Portability
SQLite was chosen for simplicity and portability during evaluation.

The architecture is fully decoupled, allowing seamless migration to:
- PostgreSQL  
- SQL Server  
for production environments.

---

### 🔐 Security
- Configurable CORS policies  
- Environment-based configuration management  
- No hardcoded environment values  

---

### ⚡ Efficiency
- Vite enables lightning-fast HMR (Hot Module Replacement)
- Optimized production bundles
- Async-first backend architecture

---

## 🧱 Architectural Highlights

- Distributed SignalR messaging with Redis Backplane  
- Horizontally scalable backend (Kubernetes-ready)  
- Containerized infrastructure  
- Clean separation between business logic and real-time notifications  
- Cloud-native design principles  

---

## 📌 Future Enhancements

- Replace SQLite with PostgreSQL in production profile  
- Add observability stack (Prometheus + Grafana)  
- Implement authentication & authorization layer  
- CI/CD pipeline integration  

---

## 👩‍💻 Author

**Mindy Rosenbaum**  
Fullstack Developer  
Specialized in Scalable Distributed Systems  

---

> Financial Monitor demonstrates real-world distributed system challenges and solutions, focusing on scalability, real-time messaging, and cloud-ready infrastructure.