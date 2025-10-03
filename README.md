# ⭐ Store Rating Web Application  

A full-stack web application where users can register, log in, and submit ratings (1–5) for stores on the platform. The system supports three roles: **System Administrator**, **Normal User**, and **Store Owner**, each with role-based functionalities.  

---

## 🚀 Tech Stack  
- **Frontend:** React.js (Vite) + TailwindCSS  
- **Backend:** Express.js (Node.js)  
- **Database:** MySQL  

---

## 📌 Features  

### 🔑 Authentication & Roles  
- Single login system with **role-based access control**.  
- Roles:  
  1. **System Administrator**  
  2. **Normal User**  
  3. **Store Owner**  

---

### 👨‍💻 System Administrator  
- Add new **stores**, **normal users**, and **admin users**.  
- Dashboard overview:  
  - Total number of users  
  - Total number of stores  
  - Total number of submitted ratings  
- Manage users with details:  
  - Name, Email, Password, Address, Role  
- Manage stores with details:  
  - Store Name, Email, Address, Average Rating  
- View all users with filters on **Name, Email, Address, and Role**.  
- View **store owner’s ratings**.  
- Logout functionality.  

---

### 👤 Normal User  
- Sign up and log in.  
- Update password after login.  
- Browse a list of all registered stores.  
- Search stores by **Name** and **Address**.  
- Store listing includes:  
  - Store Name  
  - Address  
  - Overall Rating  
  - User’s Submitted Rating  
  - Option to submit/modify rating (1–5).  
- Logout functionality.  

---

### 🏪 Store Owner  
- Log in and update password.  
- Dashboard overview:  
  - List of users who rated their store.  
  - Average rating of their store.  
- Logout functionality.  

---

## 🛠️ Validations  

- **Name:** Min 20 chars, Max 60 chars.  
- **Address:** Max 400 chars.  
- **Password:** 8–16 chars, must include at least 1 uppercase letter and 1 special character.  
- **Email:** Must follow valid email format.  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/your-username/store-rating-app.git
cd store-rating-app
```
### 2️⃣ Backend Setup (Express + MySQL)
```bash
cd backend
npm install
npm start
```
### 3️⃣ Frontend Setup (React + Vite + TailwindCSS)
```bash
cd frontend
npm install
npm run dev
App will be available at: http://localhost:5173/
```
