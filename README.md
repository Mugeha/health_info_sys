# 🏥 Health Info System

A basic Health Information Management System for doctors to manage clients and enroll them into health programs like TB, Malaria, HIV, etc.

---

## ✨ Features

- 🩺 Create and manage health programs
- 👤 Register and search for clients
- 📚 Enroll clients into programs
- 🔍 View client profiles (with enrolled programs)
- 🌐 Public API to expose client profile
- 🔐 JWT-authenticated system (doctor login)

---

## 🚀 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT for Authentication

---

## 📦 Setup Instructions

1. Clone the repo
```bash
git clone https://github.com/your-username/health-info-system.git
cd health-info-system
Install dependencies

bash
Copy
Edit
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the server

bash
Copy
Edit
npm run dev
🔑 API Routes
🧑‍⚕️ Auth
POST /api/auth/signup – Register doctor

POST /api/auth/login – Login doctor

Test Register doctor with postman
![Register doctor]()
Test Login doctor with postman
![Login doctor]()

💊 Programs
POST /api/programs – Create program
Test Create Program with postman
![Create Program]()

GET /api/programs – Get all programs

🧍 Clients
POST /api/clients – Register client

GET /api/clients – Search/list clients
Test get clients api with postman
![GetClients]()

GET /api/clients/:id – View client profile

POST /api/clients/:id/enroll – Enroll client in programs
Test enroll client in a program with postman
![EnrollInProgram]()
🌐 Public
GET /api/public/client/:id – View public client profile (no auth)

🧪 Sample Request: Enroll a Client
POST /api/clients/:id/enroll
Authorization: Bearer <token>
Content-Type: application/json

{
  "programIds": ["<programId1>", "<programId2>"]
}
