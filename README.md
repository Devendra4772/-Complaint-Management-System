# AI-Based Smart Complaint Management System

A MERN stack application built for managing complaints with simple AI integration.

## Folder Structure
- `/client`: React Frontend (Vite)
- `/server`: Node.js Backend (Express)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
1. `cd server`
2. `npm install`
3. Create a `.env` file based on `.env.example` and add your `MONGO_URI` and `JWT_SECRET`.
4. `npm run dev` (starts on port 5000)

### Frontend Setup
1. `cd client`
2. `npm install`
3. `npm run dev` (starts the Vite React app)

## Environment Variables
Server `.env`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## API Endpoints

### Auth
- `POST /api/auth/signup`
- `POST /api/auth/login`

### Complaints
- `POST /api/complaints` - Create a complaint
- `GET /api/complaints` - Get all complaints
- `PUT /api/complaints/:id` - Update status
- `DELETE /api/complaints/:id` - Delete complaint
- `GET /api/complaints/search?location=` - Search complaints

### AI
- `POST /api/ai/analyze` - Analyze complaint text
