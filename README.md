# 📚 School Management System

A full-featured school management system built with **Node.js**, **Express**, **TypeScript**, **React.js**, and **MongoDB** to streamline academic and administrative operations. This project provides an all-in-one solution for managing students, teachers, classes, exams, and school resources efficiently.

---

## 🚀 Features
- **Student Management** – Create, update, and track student profiles, attendance, and grades.
- **Teacher Management** – Assign teachers to subjects and classes, manage schedules.
- **Class & Subject Management** – Organize classes, subjects, and timetables.
- **Exam & Result Processing** – Schedule exams, record marks, and generate report cards.
- **Attendance Tracking** – Maintain daily attendance for students and teachers.
- **Role-Based Authentication** – Secure dashboards for Admin, Teacher, and Student.
- **Announcements & Notifications** – Share important updates with users.
- **Responsive UI** – User-friendly interface built with React.js and Tailwind CSS.

---

## 🛠 Tech Stack

### Frontend
- React.js
- TypeScript
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- Bcrypt (Password hashing)
- Multer (File uploads)
- Nodemailer (Email service)

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shakilahmad3434/school.git
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd client
npm install
cp .env.example .env
npm start
```

---

## ⚙️ Environment Variables

### Backend `.env`
```
NODE_ENV=dev
PORT=8080
DB=mongodb://localhost:27017/school
CLIENT=http://localhost:5173
SERVER=http://localhost:8080
AUTH_SECRET=auth_secret
AWS_ACCESS_KEY_ID=aws_s3_access_key
AWS_SECRET_ACCESS_KEY=aws_s3_secret_key
S3_BUCKET=aws_s3_bucket_name
AWS_REGION=aws_bucket_region
```

### Frontend `.env`
```
VITE_SERVER=http://localhost:8080
```

---

## 📂 Project Structure
```
school-management-system/
│
├── backend/           # Node.js + Express + TypeScript server
│   ├── src/
│   ├── dist/
│   ├── package.json
│
├── frontend/          # React.js + TypeScript client
│   ├── src/
│   ├── public/
│   ├── package.json
│
└── README.md
```

---

## 🖼 Screenshots
*(Add screenshots of your dashboard, login page, and key features here)*

---

## 📜 License
This project is licensed under the **MIT License** – you are free to use and modify it.

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss your ideas.

---

## ✨ Author
**Shakil ahmad**  
📧 shakilahmad342100@gmail.com
🌐 [Your Portfolio](https://shakilahmad.vercel.app)  
