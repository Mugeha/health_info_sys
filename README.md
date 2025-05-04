# 🏥 Health Info System

A basic Health Information Management System for doctors to manage clients and enroll them into health programs like TB, Malaria, HIV, etc.

Link to powerpoint
[View Presentation](https://docs.google.com/presentation/d/1d0M4rmyCG8op7vEPvlCEHliWgL34ZRUhx_TfuKSaU3k/edit?usp=sharing)

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
- bash
- git clone https://github.com/your-username/health-info-system.git
- cd health-info-system
- Install dependencies

- npm install
- Create a .env file:

- env
- Copy
- Edit
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- Run the server

- bash
- Copy
- Edit
- npm run dev
  
🔑 API Routes
🧑‍⚕️ Auth
POST /api/auth/signup – Register doctor

POST /api/auth/login – Login doctor

Test Register doctor with postman
![Register doctor](Images/Registerdoctor.png)
Test Login doctor with postman
![Login doctor](Images/login.png)

💊 Programs
POST /api/programs – Create program
Test Create Program with postman
![Create Program](Images/CreateProgram.png)

GET /api/programs – Get all programs

🧍 Clients
POST /api/clients – Register client

GET /api/clients – Search/list clients
Test get clients api with postman
![GetClients](Images/getClients.png)

GET /api/clients/:id – View client profile
Test get client profile with postman
![GetClientProfile](Images/GetClientProfile.png)


POST /api/clients/:id/enroll – Enroll client in programs
Test enroll client in a program with postman
![EnrollInProgram](Images/EnrollInProgram.png)
🌐 Public
GET /api/public/client/:id – View public client profile (no auth)
![Public Profile Preview](Images/getPublicProfile.png)

🧪 Sample Request: Enroll a Client

- POST /api/clients/:id/enroll
- Authorization: Bearer <token>
- Content-Type: application/json

{
  "programIds": ["<programId1>", "<programId2>"]
}


## Frontend dev with React

React (Vite or Create React App)

Axios for API calls

React Router for routing

Tailwind CSS (optional, but 🔥 for styling)

Context API or Zustand for auth state

## 🔧 Frontend Pages To Be Built
Login Page — Authenticates doctor, saves token

Client List Page — Shows all clients (auth-only)

Add Client Page — Form to register a new client

Client Profile Page — Shows detailed info + enrolled programs

Enroll to Program Page — Enroll client to programs

Public Profile Page — Accessible without login

Program List Page — Lists all health programs

## Sample Page Flow (After Login)

/login → POST login → store token → redirect to /dashboard

/dashboard → shows links to clients, programs, etc

/clients → GET all clients using token

/clients/:id → GET private client profile

/clients/public/:id → GET public profile (no token)

/programs → GET all programs

/clients/:id/enroll → POST enroll


## 🔮 Future Improvements

These are some extra features and enhancements planned for the next phase:

🧑‍⚕️ Doctor profile management with update/delete

🗓️ Appointment scheduling between clients and doctors

💬 Messaging/chat between doctor and client

📅 Program timelines and progress tracking

📊 Dashboard with analytics for program impact

🗒️ Client visit history and reports

🔒 Role-based access control (admin, doctor, support staff)

🖥️ Fully responsive frontend using React.js

📂 Export data (PDF/CSV) for reporting

📲 Mobile-friendly version or mobile app support
