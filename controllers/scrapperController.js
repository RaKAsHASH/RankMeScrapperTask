import * as ScrapperServices  from '../services/scrapperService.js'

const createJob = async (req, res) => {
  const body = req.body
  const {status,message,data} = await ScrapperServices.createJob(body)
  if (status === 200 ) {
    res.status(200).json({data:data,message:message});
  } else {
    res.status(status).json({error:message});
  }
};

const getJobSummary = async (req, res) => {
  const jobId = req.params.id
  const {status,message,data} = await ScrapperServices.getJobSummary(jobId)
  if (status === 200 ) {
    res.status(200).json({data:data});
  } else {
    res.status(status).json({error:message});
  }
};

export { createJob ,getJobSummary};