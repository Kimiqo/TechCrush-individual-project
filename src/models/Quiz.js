import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './User.js';

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'quizzes',
  timestamps: false,
});

Quiz.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Quiz, { foreignKey: 'userId' });

export default Quiz;