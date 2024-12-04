import config from '../../config/config.js';

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

import Groq from "groq-sdk";
import { addSummary } from '../../dao/summaryDao.js';
import { createJob } from '../../dao/jobDao.js';


let jobQueue = [];

export const addJobToQueue = (job) => {
  jobQueue.push(job);
};

export const processJobs = async () => {
    console.log('<<<worker started>>>>>>')
    const groq = new Groq({ apiKey: `${currentConfig.groq_api_key}` });
  setInterval(async () => {
    console.log('<<<looking for Jobs>>>')
    if (jobQueue.length > 0) {
      const job = jobQueue.shift();
      try {
        const summary = await getSummaryFromGrowq(groq,job.content);
        job.status = 'completed';
        job.summary = summary;
        job.jobId = job.id;
        await createJob(job)
        await addSummary(job)
        console.log(`Job ${job.id} completed: Summary generated`);
      } catch (error) {
        job.status = 'failed';
        job.error = error.message;
        await createJob(job)
        console.error(`Job ${job.id} failed: ${error.message}`);
      }
    }
  }, 5000);
};


const getSummaryFromGrowq = async (groq,content) => {
    const retryDelay = 1000;
    const maxRetries = 5;
    let retries = 0;
    while (retries < maxRetries) {
      try {
        const chatCompletion = await getGroqChatCompletion(groq,content);
        const summary = chatCompletion.choices[0]?.message?.content || ''
        return summary;
      } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Status:', error.response.status);
            console.error('Headers:', error.response.headers);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          throw new Error('Failed to generate summary');
      }
    }
    throw new Error('Max retries reached');
  };

export async function getGroqChatCompletion(groq,content) {
  return groq.chat.completions.create({
    messages: [
        {
            role: 'system',
            content: 'You are a helpful assistant that summarizes text concisely.',
        },
        {
            role: "user",
            content: `${content}`,
        },
    ],
    model: "llama3-8b-8192",
  });
}
