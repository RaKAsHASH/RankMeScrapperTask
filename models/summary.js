import db from '../config/sequalize.js'
export default db.sequelize.define(
    'summary',
    {
        jobId: {
            type: db.Sequelize.INTEGER,
            primaryKey: true,
            // references: {
            //   model: 'Jobs',
            //   key: 'id',
            // },
            // onDelete: 'CASCADE',
          },
          summary: {
            type: db.Sequelize.TEXT,
            allowNull: false,
          },
        createdAt: {
            type: db.Sequelize.DATE,
            defaultValue: db.Sequelize.NOW,
        },
        updatedAt: {
            type: db.Sequelize.DATE,
            defaultValue: db.Sequelize.NOW,
        },
    }, { tableName: 'summary' });
