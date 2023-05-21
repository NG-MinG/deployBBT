import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    location: String,
    stations: [
        {
            name: String,
            address: String,
            phone: String,
        },
    ],
});

stationSchema.index(
    {
        location: 'text',
        stations: 'text',
        'stations.name': 'text',
        'stations.address': 'text',
        'stations.phone': 'text',
    },
    { default_language: 'none' }
);

const Station = mongoose.model('stations', stationSchema);

export default Station;