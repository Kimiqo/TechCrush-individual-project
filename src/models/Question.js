import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Quiz from './Quiz.js';

const Question = sequelize.define('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  quizId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'quizzes',
      key: 'id',
    },
  },
  questionText: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  correctOptionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'questions',
  timestamps: false,
});

Question.belongsTo(Quiz, { foreignKey: 'quizId', onDelete: 'CASCADE' });
Quiz.hasMany(Question, { foreignKey: 'quizId', onDelete: 'CASCADE' });

export default Question;