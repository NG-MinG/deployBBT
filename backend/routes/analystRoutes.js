import express from 'express';
import analystController from "../controllers/analystController.js";

const router = express.Router();

router.get('/', analystController.getAnalyst);

export default router;