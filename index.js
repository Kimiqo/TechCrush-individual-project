import express from 'express';
import dotenv from 'dotenv';
import quizRoutes from './src/routes/quizzes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './src/config/swagger.js';
import { connectDB } from './src/config/db.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/quizzes', quizRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});