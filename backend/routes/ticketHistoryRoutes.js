import express from 'express'
import { getAll, getBySearch, updateStage, deleteItem, getTicketSeat, update } from '../controllers/ticketHistoryController.js';

const router = express.Router()

// router.patch('/updateMyPassword', authController.updatePassword);

// Get user information
router.get('/ticketHistory', getAll);
router.patch('/searchTicketHistory', getBySearch);
router.post('/updateStage', updateStage);
router.patch('/deleteItem', deleteItem)
router.patch('/getTicketSeat', getTicketSeat)
router.patch('/update', update)

export default router;