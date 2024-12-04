import express from 'express';
import * as scrapperController from '../controllers/scrapperController.js';
import { HandleErrors } from '../middleware/errorHandler.js';
import { addSummary } from '../dao/summaryDao.js';

const router = express.Router();

router.post('/job', HandleErrors(scrapperController.createJob));
router.get('/summary/:id', HandleErrors(scrapperController.getJobSummary));

export default router;