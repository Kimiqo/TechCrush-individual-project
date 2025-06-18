import { validationResult } from 'express-validator';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../config/email.js';

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(409).json({ error: 'Email already exists' });

    const user = await User.create({ email, password });

    // Send welcome email
    const emailSent = await sendEmail(
      email,
      'Welcome to QuizMaster!',
      `Thank you for signing up, ${email}! Start creating quizzes now at http://localhost:3000/api-docs.`
    );
    if (!emailSent) {
      console.warn(`Welcome email failed to send for ${email}`);
    } else {
      console.log(`Welcome email sent to ${email}`);
    }

    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await user.validatePassword(password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to login' });
  }
};