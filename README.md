# DevTinder Backend

A Node.js backend for **DevTinder**, a social connection platform for developers. Built with **Express.js**, **MongoDB Atlas**, and **Mongoose**.

---

## Project Structure

├── src
│ ├── config
│ │ └── database.js # Database connection
│ ├── middlewares # Authentication & other middleware
│ ├── models
│ │ └── user.js # User schema
│ ├── routes
│ │ ├── authRouter.js
│ │ ├── profileRouter.js
│ │ ├── connectionRequestRouter.js
│ │ └── userRouter.js
│ └── app.js # Express app entry point
├── package.json
└── .gitignore

---

## Features

- Connects to **MongoDB Atlas**.
- Implements user authentication using **JWT**.
- Handles user profiles, connections, and requests.
- Fully RESTful API design.

---

## API Endpoints

### **AuthRouter**

| Method | Route   | Description       |
| ------ | ------- | ----------------- |
| POST   | /signup | Create a new user |
| POST   | /login  | User login        |
| POST   | /logout | User logout       |

### **ProfileRouter**

| Method | Route                   | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | /profile/view           | Get logged-in user profile |
| PATCH  | /profile/edit           | Edit user profile          |
| PATCH  | /profile/patch/password | Change user password       |

### **ConnectionRequestRouter**

| Method | Route                           | Description                                |
| ------ | ------------------------------- | ------------------------------------------ |
| POST   | /request/send/:status/:userId   | Send request (status: ignore/interested)   |
| POST   | /request/review/:status/:userId | review request (status: accepted/rejected) |

### **UserRouter**

| Method | Route                   | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | /user/requests/recieved | Get all received requests    |
| GET    | /user/connections       | Get all accepted connections |
| GET    | /feed                   | Get user feed                |

> Request status can be: `ignore`, `interested`, `accepted`, `rejected`.

---
