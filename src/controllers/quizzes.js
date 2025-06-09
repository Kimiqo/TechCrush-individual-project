import { validationResult } from 'express-validator';
import { Quiz, Question, EmailLog } from '../models/index.js';
import { sendEmail } from '../config/email.js';
import { Op } from 'sequelize';

export const createQuiz = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title, email, questions } = req.body;

  const transaction = await Quiz.sequelize.transaction();
  try {
    // Create quiz
    const quiz = await Quiz.create({ title, email }, { transaction });

    // Create questions
    const questionData = questions.map(q => ({
      quizId: quiz.id,
      questionText: q.questionText,
      options: q.options.map((opt, index) => ({ id: index + 1, text: opt.text })),
      correctOptionId: q.correctOptionId,
    }));
    await Question.bulkCreate(questionData, { transaction });

    // Log email and send notification
    await EmailLog.create({ quizId: quiz.id, recipient: email, type: 'creation' }, { transaction });
    const emailSent = await sendEmail(
      email,
      `Quiz "${title}" Created`,
      `Your quiz "${title}" with ${questions.length} question(s) has been created successfully.`
    );

    await transaction.commit();
    res.status(201).json({ id: quiz.id, title, email, questions });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.findAll({
      attributes: ['id', 'title', 'email', 'createdAt'],
    });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};

export const getQuiz = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findByPk(id, {
      attributes: ['id', 'title', 'email', 'createdAt'],
      include: [{
        model: Question,
        attributes: ['id', 'questionText', 'options', 'correctOptionId'],
      }],
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    res.json(quiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
};

export const submitAnswers = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { email, answers } = req.body;

  const transaction = await Quiz.sequelize.transaction();
  try {
    const quiz = await Quiz.findByPk(id, { transaction });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    const questions = await Question.findAll({
      where: { quizId: id },
      attributes: ['id', 'correctOptionId'],
      transaction,
    });
    if (!questions.length) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    const total = questions.length;
    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (question && question.correctOptionId === answer.selectedOptionId) {
        score++;
      }
    }

    // Log email and send notification
    await EmailLog.create({ quizId: id, recipient: email, type: 'submission' }, { transaction });
    const emailSent = await sendEmail(
      email,
      `Quiz Results for "${quiz.title}"`,
      `You scored ${score}/${total} (${(score / total * 100).toFixed(2)}%) on "${quiz.title}".`
    );

    await transaction.commit();
    res.json({ score, total, percentage: (score / total * 100).toFixed(2) });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
};