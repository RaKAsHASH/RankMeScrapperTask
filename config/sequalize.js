import Sequelize from 'sequelize';
import config from './config.js';

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

const sequelize = new Sequelize(
  currentConfig.database,
  currentConfig.username,
  currentConfig.password,
  {
    host: currentConfig.host,
    dialect: currentConfig.dialect,
    port: currentConfig.port,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    },
    benchmark: true,
    timezone: '+05:30',
    logging: console.log
  }
);

async function upsert(model,options) {
  const modelInstance = await model.findOne({where :options['where']})
  if(modelInstance) {
    return await modelInstance.update(options['defaults'])
  } else {
    return await model.create(options['defaults'])
  }
}

const db = {
  sequelize,
  Sequelize, 
  upsert
};

export default db;
