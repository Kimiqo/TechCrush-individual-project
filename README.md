🧠 QuizMaster API
QuizMaster API is a secure quiz management platform built as a solo project for the Tech Crush Internship. Authenticated users can create quizzes, submit answers, and receive email notifications at their registered email, with interactive Swagger documentation.

🔧 Features
👤 User

Sign up and log in with email and password
Receive a welcome email upon sign-up at registered email
Create quizzes with multiple-choice questions
Retrieve personal quizzes and view details
Submit answers and get instant scores
Receive email notifications for quiz creation and results at registered email

📜 API Documentation

Interactive Swagger UI for testing endpoints


🧱 Tech Stack



Layer
Technology



Backend
Node.js (ESM), Express.js


Database
MySQL


ORM
Sequelize


Authentication
JWT, bcrypt


Email
Nodemailer (Gmail)


Documentation
Swagger UI, swagger-jsdoc


Environment
dotenv for environment variables



📁 Project Structure
src/
├── config/       # Database, email, and Swagger configs
├── controllers/  # Route controllers
├── middleware/   # Authentication middleware
├── models/       # Sequelize models
├── routes/       # Express routes
└── index.js      # App entry point


🔐 Roles

User
Register, log in, create, retrieve, and answer quizzes
Receive email notifications at registered email




Prerequisites

Node.js (v20.10.0+)
MySQL (8.0+)
npm
Gmail account (with App Password for Nodemailer)

Installation

Clone the repository:
git clone https://github.com/<your-repo>/quiz-app.git
cd quiz-app


Install dependencies:
npm install


Set up MySQL:

Start MySQL: mysql.server start
Create database:CREATE DATABASE quiz_app;




Configure environment variables:

Create .env:PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=quiz_app
DB_DIALECT=mysql
DB_PORT=3306
NODE_ENV=development
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
JWT_SECRET=your_jwt_secret


Generate JWT_SECRET:openssl rand -base64 32




Start the server:
npm start




📡 API Endpoints



Method
Endpoint
Description
Auth Required



POST
/api/auth/signup
Register a user
No


POST
/api/auth/login
Log in a user
No


POST
/api/quizzes
Create a quiz
Yes


GET
/api/quizzes
List user’s quizzes
Yes


GET
/api/quizzes/:id
Get quiz by ID
Yes


POST
/api/quizzes/:id/answers
Submit answers and get score
Yes


Explore detailed specs at http://localhost:3000/api-docs.

📚 Swagger Documentation
Access interactive API documentation at http://localhost:3000/api-docs. Test endpoints with JWT tokens, view schemas, and try requests in the Swagger UI.

🧪 Testing

Use Postman to test endpoints:
Sign up: POST /api/auth/signup (check welcome email)
Log in: POST /api/auth/login to get a JWT token
Add token to headers: Authorization: Bearer <token>
Test quiz endpoints (verify notification emails)


Check MySQL tables:SELECT * FROM users;
SELECT * FROM quizzes;
SELECT * FROM questions;
SELECT * FROM email_logs;


Built with 💻 by Kimiko
