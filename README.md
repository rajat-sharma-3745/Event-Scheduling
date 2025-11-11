# 🗓️ Event Scheduling App

A full-stack **Event Scheduling Application** built using **Node.js, Express, Prisma, and React (Vite)**.  
It enables users to register, log in, and manage their events efficiently through a clean and responsive UI.

---

## 🚀 Tech Stack

### 🧩 Backend
- **Node.js** + **Express.js**
- **Prisma ORM** (with PostgreSQL)
- **JWT Authentication**


### 🎨 Frontend
- **React (Vite)**
- **Axios** for API requests
- **React Router DOM** for navigation
- **Context API** for state management

---

## ✨ Features

### 👥 User Features
- 🔐 **User Authentication** (Register, Login, Logout)

### 📅 Event Features
- ➕ **Create Events** with title, description, and date/time
- 📖 **View All Events** in a responsive grid layout
- 🔍 **View Event Details** page with loading shimmer
- ✏️ **View Your Events** (filtered by user)
- ❌ **Delete Events** (only by creator)
- ⚡ **Optimized API Calls** with custom hooks (`useGetAllEvents`, `useGetUserEvents`)

### 💻 Developer Features
- 🧱 Modular backend structure (controllers, routes, middlewares)
- 📦 Prisma ORM integration for database handling
- 🚦 Global error and async handling
- ⚙️ Environment variable-based configuration

---




## Setup & run (step-by-step)

> Follow both backend and frontend steps to run the app locally.
## Clone the repository
```bash
git clone https://github.com/rajat-sharma-3745/Event-Scheduling.git
cd Event-Scheduling
```

### Backend

1. Open a terminal and `cd` into the backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `Backend/` (see **Environment variables** below). Example:

```
PORT=5000
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL = http://localhost:5173
```

4. Run the server in development (common scripts):

* If the repository has a `start` script :

```bash
npm start
```

* Otherwise start directly with Node:

```bash
node server.js
```

The backend typically listens on port `3000` (or the port set in `.env`).

### Frontend

1. Open a separate terminal and `cd` into the frontend folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the Vite dev server:

```bash
npm run dev
```

By default Vite serves the app on `http://localhost:5173/` (or the port shown in the terminal). Ensure the frontend's `axiosInstance.js` uses the backend base URL (e.g., `http://localhost:3000/api`) 



