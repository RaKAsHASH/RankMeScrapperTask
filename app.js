import express from 'express';
import cors from 'cors';
import db from './config/sequalize.js';
import routes from './routes/router.js';
import timeout from 'connect-timeout';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { processJobs } from './services/workers/growQ.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());


app.use('/', timeout('60s'), routes);

processJobs()

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
