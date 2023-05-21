import express from 'express'
import { getAll, getBySearch } from '../controllers/scheduleController.js';

const router = express.Router()

// router.patch('/updateMyPassword', authController.updatePassword);

// Get user information
router.get('/schedules', getAll);
router.patch('/searchSchedule', getBySearch);

export default router;