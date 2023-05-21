import express from 'express';

import { getSearchAccount, getAllAccount, banAccount, deleteAccount } from '../controllers/adminAccountController.js';

import {
    getSearchStation,
    getAllStation,
    editStation,
    createStation,
    deleteStation,
} from '../controllers/adminStationController.js';

import { getSearchTrip, getAllTrip, editTrip, createTrip, deleteTrip } from '../controllers/adminTripController.js';

const router = express.Router();

// Account

router.get('/getaccount', getAllAccount);

router.post('/banaccount/:id', banAccount);

router.post('/deleteaccount/:id', deleteAccount);

router.get('/searchaccount', getSearchAccount);

// Station

router.get('/getstation', getAllStation);

router.post('/editstation/:id', editStation);

router.post('/deletestation', deleteStation);

router.post('/createstation', createStation);

router.get('/searchstation', getSearchStation);

//Trip

router.get('/gettrip', getAllTrip);

router.post('/edittrip/:id', editTrip);

router.post('/deletetrip/:id', deleteTrip);

router.post('/createtrip', createTrip);

router.get('/searchtrip', getSearchTrip);

export default router;
