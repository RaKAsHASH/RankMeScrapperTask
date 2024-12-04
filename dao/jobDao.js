import {Job, Summary}  from '../models/associations.js'
import _ from 'lodash'
import db from '../config/sequalize.js'

const createJob = async (data) =>{
    console.log('<<<hello from createJob dao')
    const res= JSON.parse(JSON.stringify(await db.upsert(Job, {
		where: {
			id: data.id || null
		},
		defaults: data
	})))
	return res
}

const getJobDetailById = async (id) =>{
    console.log('<<<hello from getJobDetailById dao')
	const job = await Job.findOne({
		where :{id},
		attributes:['id','url','status','error','createdAt','updatedAt'],
		include: [
			{
				model: Summary,
				as : 'summary',
				attributes: ['summary']
			}
		]
	})
    return JSON.parse(JSON.stringify(job))
}

export{ createJob,getJobDetailById }