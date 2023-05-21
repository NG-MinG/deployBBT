import Station from '../models/stationModel.js';
import Trip from '../models/scheduleModel.js';
import Location from '../models/locationModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

const getSearchTrip = catchAsync(async (req, res) => {
    const trip = await Trip.find({$text: {$search: req.query.q}});
    const location = await Location.find();
    const getStation = await Station.find();
    for (let i = 0; i < getStation.length; i++) {
        location.push({ location: getStation[i].location });
    }
    res.status(200).json({
        status: 'success',
        data: { trip, location },
    });
  })

const getAllTrip = catchAsync(async (req, res) => {
    const trip = await Trip.find();
    const location = await Location.find();
    const getStation = await Station.find();
    for (let i = 0; i < getStation.length; i++) {
        location.push({ location: getStation[i].location });
    }
    res.status(200).json({
        status: 'success',
        data: { trip, location },
    });
});

const createTrip = catchAsync(async (req, res) => {
    await Trip.create({
        departure_city: req.body.departure_city,
        arrival_city: req.body.arrival_city,
        bus_type: req.body.bus_type,
        duration: req.body.duration,
        distance: req.body.distance,
    })
    getAllTrip(req, res);
});

const deleteTrip = catchAsync(async (req, res) => {
    await Trip.deleteOne({_id: req.params.id})
    getAllTrip(req, res);
});

const editTrip = catchAsync(async (req, res) => {
    await Trip.updateOne(
        { _id: req.params.id },
        {
            departure_city: req.body.departure_city,
            arrival_city: req.body.arrival_city,
            bus_type: req.body.bus_type,
            duration: req.body.duration,
            distance: req.body.distance,
        }
    );
    getAllTrip(req, res);
});

export { getSearchTrip, getAllTrip, editTrip, deleteTrip, createTrip };
