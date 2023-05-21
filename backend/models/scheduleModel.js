import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
    departure_city: String,
    arrival_city: String,
    bus_type: {
        type: String,
        enum: ['Ghế', 'Giường', 'Limousine'],
    },
    duration: Number,
    distance: Number,
});

scheduleSchema.index(
    {
        departure_city: 'text',
        arrival_city: 'text',
        bus_type: 'text',
        duration: 'text',
        distance: 'text',
    },
    { default_language: 'none' }
);
const Schedule = mongoose.model('trips', scheduleSchema);

export default Schedule;
