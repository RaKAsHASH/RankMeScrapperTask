import Job from './job.js'
import Summary from './summary.js'



Job.hasOne(Summary, { foreignKey: 'jobId' });
Summary.belongsTo(Job, { foreignKey: 'jobId' });


export  {
    Job,
    Summary,
}