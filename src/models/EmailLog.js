import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Quiz from './Quiz.js';

const EmailLog = sequelize.define('EmailLog', {
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
  recipient: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('creation', 'submission'),
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'email_logs',
  timestamps: false,
});

EmailLog.belongsTo(Quiz, { foreignKey: 'quizId', onDelete: 'CASCADE' });
Quiz.hasMany(EmailLog, { foreignKey: 'quizId', onDelete: 'CASCADE' });

export default EmailLog;