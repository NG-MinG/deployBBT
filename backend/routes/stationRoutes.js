import express from 'express'
import { getAll, getBySearch } from '../controllers/stationController.js';

const router = express.Router()

// router.patch('/updateMyPassword', authController.updatePassword);

// Get user information
router.get('/stations', getAll);
router.patch('/searchStations', getBySearch);

export default router;