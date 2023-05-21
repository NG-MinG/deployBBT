import express from 'express';
import {getAllLocations} from "../controllers/locationController.js";

const router = express.Router();

router.get('/get-locations', getAllLocations)

export default router;