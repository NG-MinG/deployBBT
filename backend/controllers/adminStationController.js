import Station from '../models/stationModel.js';
import catchAsync from '../utils/catchAsync.js';
import Location from '../models/locationModel.js';
import AppError from '../utils/appError.js';

const getSearchStation = catchAsync(async (req, res) => {
    const getStation = await Station.find({$text: {$search: req.query.q}});
    const location = await Location.find();
    const station = [];
    for (let i = 0; i < getStation.length; i++) {
        for (let j = 0; j < getStation[i].stations.length; j++) {
            const detail = {
                _id: getStation[i]._id,
                oldlocation: getStation[i].location,
                location: getStation[i].location,
                oldname: getStation[i].stations[j].name,
                name: getStation[i].stations[j].name,
                address: getStation[i].stations[j].address,
                phone: getStation[i].stations[j].phone,
            };
            station.push(detail);
        }
    }
    res.status(200).json({
        status: 'success',
        data: { station, location },
    });
  })

const getAllStation = catchAsync(async (req, res) => {
    const getStation = await Station.find();
    const location = await Location.find();
    const station = [];
    for (let i = 0; i < getStation.length; i++) {
        for (let j = 0; j < getStation[i].stations.length; j++) {
            const detail = {
                _id: getStation[i]._id,
                oldlocation: getStation[i].location,
                location: getStation[i].location,
                oldname: getStation[i].stations[j].name,
                name: getStation[i].stations[j].name,
                address: getStation[i].stations[j].address,
                phone: getStation[i].stations[j].phone,
            };
            station.push(detail);
        }
    }
    res.status(200).json({
        status: 'success',
        data: { station, location },
    });
});

const createStation = catchAsync(async (req, res) => {
    let getStation = await Station.findOne({ location: req.body.location });
    const newStation = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
    };
    getStation.stations.push(newStation);
    await Station.updateOne({ location: req.body.location }, { stations: [...getStation.stations] });
    getAllStation(req, res);
});

const deleteStation = catchAsync(async (req, res) => {
    let getStation = await Station.findOne({ _id: req.query.id });
    for (let i = 0; i < getStation.stations.length; i++) {
        if (getStation.stations[i].name === req.query.name) {
            getStation.stations.splice(i, 1);
            i--
        }
    }
    await Station.updateOne({ _id: req.query.id }, { stations: [...getStation.stations] });
    getAllStation(req, res);
});

const editStation = catchAsync(async (req, res) => {
    if (req.body.location === req.body.oldlocation) {
        let getStation = await Station.findOne({ _id: req.params.id });
        for (let i = 0; i < getStation.stations.length; i++) {
            if (getStation.stations[i].name === req.body.oldname) {
                getStation.stations[i].name = req.body.name;
                getStation.stations[i].address = req.body.address;
                getStation.stations[i].phone = req.body.phone;
            }
        }
        await Station.updateOne({ _id: req.params.id }, { stations: [...getStation.stations] });
    } else {
        let getStation = await Station.findOne({ location: req.body.location });
        const newStation = {
            name: req.body.name,
            address: req.body.address,
            phone: req.body.phone,
        };
        getStation.stations.push(newStation);
        await Station.updateOne({ location: req.body.location }, { stations: [...getStation.stations] });

        getStation = await Station.findOne({ location: req.body.oldlocation });
        for (let i = 0; i < getStation.stations.length; i++) {
            if (getStation.stations[i].name === req.body.oldname) {
                getStation.stations.splice(i, 1);
                i--
            }
        }
        await Station.updateOne({ location: req.body.oldlocation }, { stations: [...getStation.stations] });
    }
    getAllStation(req, res);
});

export { getSearchStation, getAllStation, editStation, createStation, deleteStation };
