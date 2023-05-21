import express from 'express'
import { getAllAccount, banAccount, deleteAccount } from '../controllers/accountController.js';

const router = express.Router()

// router.patch('/updateMyPassword', authController.updatePassword);

// Get user information
router.get('/getaccount', getAllAccount);

router.post('/banaccount/:id', banAccount);

router.post('/deleteaccount/:id', deleteAccount);

export default router;