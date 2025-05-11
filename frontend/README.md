# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# 💼 Loan Manager Application

A full-stack Loan Management System built with **React (Frontend)** and **Node.js + SQLite (Backend)**. This application allows users to apply for loans, and provides dedicated dashboards for users, verifiers, and admins with proper authentication and access control.

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Database Schema](#database-schema)
- [Application Flow](#application-flow)
- [Screenshots](#screenshots)
- [Author](#author)
- [License](#license)

---

## 🚀 Features

- 📝 Submit loan application forms
- 👤 User authentication and role-based login
- 🔐 Protected routing using React Context
- 🧾 Dashboards:
  - **User:** View own applications
  - **Verifier:** Verify pending applications
  - **Admin:** Approve verified applications
- ✅ Conditional UI logic (approve disables reject, etc.)
- 🌈 Responsive, clean, and animated UI

---

## 🛠 Tech Stack

**Frontend:**
- React
- Axios
- React Router
- Context API
- CSS3

**Backend:**
- Node.js
- Express.js
- SQLite3
- bcrypt (for password hashing)
- CORS, body-parser

---

## 📁 Project Structure

```
loan-manager/
│
├── client/              # React Frontend
│   ├── src/
│   │   ├── components/  # All UI Components (Dashboards, Forms, Login, Navbar)
│   │   ├── AuthContext.js
│   │   ├── ProtectedRoute.js
│   │   └── App.js
│   └── public/
│
├── server/              # Node.js Backend
│   ├── app.js
│   ├── loanManager.db   # SQLite Database
│   ├── routes/
│   ├── controllers/
│   └── models/
```

---

## ⚙️ Setup Instructions

### ✅ Prerequisites

- Node.js and npm installed
- SQLite installed or use built-in db file

---

### 🔧 Backend Setup

```bash
cd server
npm install
```

#### 👉 Start the Backend Server

```bash
node app.js
```

- Server runs at: `http://localhost:3001`
- SQLite DB file: `loanManager.db`

---

### 💻 Frontend Setup

```bash
cd ../client
npm install
```

#### 👉 Start the Frontend React App

```bash
npm start
```

- React app runs at: `http://localhost:3000`

---

## 🧾 Database Schema

### 📄 Table: `users`

| Column     | Type    | Description                    |
|------------|---------|--------------------------------|
| id         | INTEGER | Primary Key                    |
| full_name  | TEXT    | Full name of the user          |
| email      | TEXT    | Email (must be unique)         |
| password   | TEXT    | Hashed password using bcrypt   |
| role       | TEXT    | 'user', 'verifier', or 'admin' |

### 📄 Table: `loans`

| Column              | Type    | Description                      |
|---------------------|---------|----------------------------------|
| id                  | INTEGER | Primary Key                      |
| full_name           | TEXT    | Applicant’s name                 |
| loan_amount         | REAL    | Loan amount requested            |
| loan_tenure         | INTEGER | Tenure in months                 |
| reason              | TEXT    | Reason for the loan              |
| employment_status   | TEXT    | Type of employment               |
| employment_address1 | TEXT    | Address line 1                   |
| employment_address2 | TEXT    | Address line 2                   |
| status              | TEXT    | 'pending', 'verified', 'approved'|

---

## 🔁 Application Flow

1. **User Signup/Login**
2. **User Dashboard:** Apply for loans, view status
3. **Verifier Dashboard:** View & verify user applications
4. **Admin Dashboard:** View verified applications, approve or reject
5. **Conditional Rendering:** Approved apps cannot be rejected and vice versa

---

## 🖼️ Screenshots

> _Add relevant screenshots here if needed for presentation_

---

## 👨‍💻 Author

Developed by [Your Name]

> Built for demonstrating full-stack web development with real-world workflows and role-based logic.

---

## 📄 License

This project is licensed under the **MIT License**.

Feel free to fork, use, and contribute!

