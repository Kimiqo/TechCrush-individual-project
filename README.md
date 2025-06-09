🧠 QuizMaster API
QuizMaster API is a lightweight quiz management platform built as a solo project for the Tech Crush Internship. It allows users to create quizzes, submit answers, and receive email notifications, with interactive Swagger documentation for easy API exploration.

🔧 Features
👤 User

Create quizzes with multiple-choice questions
Retrieve quizzes and view details
Submit answers and get instant scores
Receive email notifications for quiz creation and results

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
├── models/       # Sequelize models
├── routes/       # Express routes
└── index.js      # App entry point


🔐 Roles

User
Create, retrieve, and answer quizzes
Receive email notifications




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




Start the server:
npm start




📡 API Endpoints



Method
Endpoint
Description



POST
/api/quizzes
Create a quiz


GET
/api/quizzes
List all quizzes


GET
/api/quizzes/:id
Get quiz by ID


POST
/api/quizzes/:id/answers
Submit answers and get score


Explore detailed specs at http://localhost:3000/api-docs.

📚 Swagger Documentation
Access interactive API documentation at http://localhost:3000/api-docs after starting the server. Test endpoints, view schemas, and try requests directly in the Swagger UI.

🧪 Testing

Use Postman to test endpoints:
Create quizzes with valid/invalid data
Retrieve quizzes and submit answers
Verify email notifications


Check MySQL tables:SELECT * FROM quizzes;
SELECT * FROM questions;
SELECT * FROM email_logs;


Built with 💻 by Kimiko
