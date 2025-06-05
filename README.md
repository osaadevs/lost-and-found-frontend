# Lost and Found System – Frontend (React + TypeScript)

This is the frontend component of the **Lost and Found Management System**, developed as part of the **CMJD coursework** (Batch 108/109). The system enables users of an educational institute to report and search for lost and found items with full role-based access.

---

## 🚀 Technologies Used

- React (with TypeScript)
- React Router v6
- Axios (for API calls)
- Bootstrap 5 (for responsive UI)
- JWT Authentication
- Role-based Routing & Protection

---

## 🧩 Project Features

### 🔐 Authentication
- User registration (`/signup`)
- User login (`/login`)
- JWT-based session handling
- Protected routes per role

### 👤 USER Role
- Dashboard: `/user/dashboard`
- Report Lost Item: `/user/report`
- View Lost Items: `/user/lost`
- View Found Items: `/user/found`
- Claim Found Item + track status: `/user/claims`

### 🧑‍🔧 STAFF Role
- Dashboard: `/staff/dashboard`
- Report Found Item: `/staff/report`
- View Found Items: `/staff/found`
- Manage Claim Requests: `/staff/claims`

### 👨‍💼 ADMIN Role
- Dashboard: `/admin/dashboard`
- View All Items + Delete: `/admin/items`

---

## 📁 Project Structure

```
src/
├── pages/               # All route-based page components
├── components/          # Reusable components (Navbar, ProtectedRoute)
├── services/            # API handling (login, signup, item, request)
├── utils/               # Token decoder for JWT auth
├── App.tsx              # Main App container with router
├── Router.tsx           # Centralized route definitions
├── index.tsx            # Entry point
```

---

## 🛠️ Setup Instructions

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/lost-and-found-frontend.git
cd lost-and-found-frontend
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Start the Frontend:**

```bash
npm start
```

> The app will run at: `http://localhost:3000`

---

## 🌐 Environment Configuration

Ensure your backend is running at:
```
http://localhost:8080
```

Make sure CORS is enabled in your Spring Boot backend for `http://localhost:3000`.

---

## ✅ Completed Requirements

| Feature                                | Status |
|----------------------------------------|--------|
| React project with TypeScript          | ✅ Done |
| React Router & protected routes        | ✅ Done |
| Role-based dashboards & navigation     | ✅ Done |
| Auth token handling (JWT)              | ✅ Done |
| Lost item reporting & viewing          | ✅ Done |
| Found item reporting & claiming        | ✅ Done |
| Claim tracking (user & staff)          | ✅ Done |
| Bootstrap styling & layout             | ✅ Done |

---

## 📝 Coursework Reference

**Assignment**: Frontend Development  
**Framework**: React + TypeScript  
**Course**: CMJD – Comprehensive Master Java Developer  
**Batch**: 108 / 109

---
