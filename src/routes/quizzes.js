import express from 'express';
import { check } from 'express-validator';
import { createQuiz, getQuizzes, getQuiz, submitAnswers } from '../controllers/quizzes.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management and answer submission
 */

/**
 * @swagger
 * /api/quizzes:
 *   post:
 *     summary: Create a new quiz
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, questions]
 *             properties:
 *               title:
 *                 type: string
 *                 example: General Knowledge Quiz
 *               questions:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required: [questionText, options, correctOptionId]
 *                   properties:
 *                     questionText:
 *                       type: string
 *                       example: What is 2+2?
 *                     options:
 *                       type: array
 *                       minItems: 2
 *                       items:
 *                         type: object
 *                         properties:
 *                           text:
 *                             type: string
 *                             example: 4
 *                     correctOptionId:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Quiz created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 email:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  authenticate,
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
    check('questions.*.questionText').notEmpty().withMessage('Question text is required'),
    check('questions.*.options').isArray({ min: 2 }).withMessage('At least two options are required'),
    check('questions.*.correctOptionId').isInt().withMessage('Correct option ID is required'),
  ],
  createQuiz
);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes for the authenticated user
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   email:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', authenticate, getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz ID
 *     responses:
 *       200:
 *         description: Quiz details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 email:
 *                   type: string
 *                 questions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       questionText:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             text:
 *                               type: string
 *                       correctOptionId:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.get('/:id', authenticate, getQuiz);

/**
 * @swagger
 * /api/quizzes/{id}/answers:
 *   post:
 *     summary: Submit answers and get score
 *     tags: [Quizzes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quiz ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [answers]
 *             properties:
 *               answers:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: object
 *                   required: [questionId, selectedOptionId]
 *                   properties:
 *                     questionId:
 *                       type: integer
 *                       example: 1
 *                     selectedOptionId:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: Score details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 score:
 *                   type: integer
 *                 total:
 *                   type: integer
 *                 percentage:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.post(
  '/:id/answers',
  authenticate,
  [
    check('answers').isArray({ min: 1 }).withMessage('At least one answer is required'),
  ],
  submitAnswers
);

export default router;