import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quiz App API',
      version: '1.0.0',
      description: 'A RESTful API for managing quizzes with email notifications, built with Node.js, Express, and MySQL.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to files with JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;