import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    groq_api_key: process.env.GROQ_API_KEY,
    backend_url: process.env.BACKEND_URL,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_NAME,
    host: process.env.DB_HOST,
    groq_api_key: process.env.GROQ_API_KEY,
    backend_url: process.env.BACKEND_URL,
    dialect: 'postgres',

  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    groq_api_key: process.env.GROQ_API_KEY,
    groq_api_key: process.env.GROQ_API_KEY,
    backend_url: process.env.BACKEND_URL,
    dialect: 'postgres',
  }
};
