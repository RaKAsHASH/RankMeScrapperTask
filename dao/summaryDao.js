import {Summary}  from '../models/associations.js'
import _ from 'lodash'
import db from '../config/sequalize.js'

const addSummary = async (data) =>{
    console.log('<<<hello from addSummary dao')
    return JSON.parse(JSON.stringify(await db.upsert(Summary, {
		where: {
			jobId: data.jobId || null
		},
		defaults: data
	})))
}


export{ addSummary }