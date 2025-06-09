import express from 'express';
import { check } from 'express-validator';
import { createQuiz, getQuizzes, getQuiz, submitAnswers } from '../controllers/quizzes.js';

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, email, questions]
 *             properties:
 *               title:
 *                 type: string
 *                 example: General Knowledge Quiz
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  [
    check('title').notEmpty().withMessage('Title is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
    check('questions.*.questionText').notEmpty().withMessage('Question text is required'),
    check('questions.*.options').isArray({ min: 2 }).withMessage('At least two options are required'),
    check('questions.*.correctOptionId').isInt().withMessage('Correct option ID is required')
  ],
  createQuiz
);

/**
 * @swagger
 * /api/quizzes:
 *   get:
 *     summary: Get all quizzes
 *     tags: [Quizzes]
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
 *       500:
 *         description: Server error
 */
router.get('/', getQuizzes);

/**
 * @swagger
 * /api/quizzes/{id}:
 *   get:
 *     summary: Get a quiz by ID
 *     tags: [Quizzes]
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
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getQuiz);

/**
 * @swagger
 * /api/quizzes/{id}/answers:
 *   post:
 *     summary: Submit answers and get score
 *     tags: [Quizzes]
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
 *             required: [email, answers]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
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
 *       404:
 *         description: Quiz not found
 *       500:
 *         description: Server error
 */
router.post(
  '/:id/answers',
  [
    check('email').isEmail().withMessage('Valid email is required'),
    check('answers').isArray({ min: 1 }).withMessage('At least one answer is required')
  ],
  submitAnswers
);

export default router;