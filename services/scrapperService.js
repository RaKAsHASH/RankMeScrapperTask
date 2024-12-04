import _ from 'lodash'
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

import * as JobDao  from '../dao/jobDao.js'
import { scrapePageContent } from './puppeteer.js'
import { addJobToQueue } from './workers/growQ.js'


const createJob = async (data) => {
    try{
        const webContent = await scrapePageContent(data.url)
        if (webContent.success){
            const content = webContent.content
            const job = await JobDao.createJob(data)
            addJobToQueue({id:job.id,content})
            return { status: 200, message: `Your request has been recieved.Please Visit ${currentConfig.backend_url}/summary/${job.id} to see results after sometime.`, data: {job} }
        } else {
            await JobDao.createJob({...data,error:`${webContent.error}`,status:'failed'})
            return {status :418,message: webContent.error}
        }
    } catch(error){
        await JobDao.createJob({...data,error:`${error}`,status:'failed'})
        return {status :418,message:error}
    }
}


const getJobSummary = async (id) => {
    try{
        const job = await JobDao.getJobDetailById(id)
        if (_.isEmpty(job)){
            return {status:404 ,message:'Summary for the rquested JobId is not available,please check JobId'}
        }
        if (job.summary){
            job.summary = job.summary.summary
            const {error,...withoutError} = job
            return { status: 200, data: {...withoutError} }
        } else {
            const {summary, ...withoutSummary} = job
            return { status: 200, data: {...withoutSummary} }
        }
    } catch(error){
        return {status :418,message:error}
    }
}

export { createJob ,getJobSummary}