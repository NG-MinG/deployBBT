import express from 'express'
import { updateProfile, userProfile, changePassword, getMyTicket } from '../controllers/userProfileController.js'
import authController from '../controllers/authController.js';
const router = express.Router()

// router.patch('/updateMyPassword', authController.updatePassword);

// Update current user's data
router.patch('/updateProfile', authController.protect, updateProfile);

// Update password
router.patch('/updatePassword', authController.protect, changePassword);

// Get user information
router.get('/userProfile', authController.protect, userProfile);

router.get('/my-ticket', authController.protect, getMyTicket)

export default router;