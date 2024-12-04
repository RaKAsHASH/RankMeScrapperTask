import db from '../config/sequalize.js'

export default db.sequelize.define(
  'job',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: db.Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: db.Sequelize.ENUM('pending', 'completed', 'failed'),
      defaultValue: 'pending',
    },
    error:{
      type: db.Sequelize.TEXT,
    },
    createdAt: {
      type: db.Sequelize.DATE,
      defaultValue: db.Sequelize.NOW,
    },
    updatedAt: {
      type: db.Sequelize.DATE,
      defaultValue: db.Sequelize.NOW,
    },
    createdBy: {
      type: db.Sequelize.STRING,
    },
    updatedBy: {
      type: db.Sequelize.STRING,
    },
  }, { tableName: 'job' });
