import AppError from "../utils/appError.js";
import Ticket from "../models/ticketModel.js";
import Station from "../models/stationModel.js";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import io from "../socket.js"
import TicketHistory from "../models/ticketHistoryModel.js";

const getTickets = catchAsync(async (req, res, next) => {
    const departure_city = req.query.departure_city;
    const arrival_city = req.query.arrival_city;
    const date = req.query.date;
    const startDate = new Date(`${date}T00:00:00.000Z`);
    const endDate = new Date(`${date}T23:59:59.999Z`);
    const tickets = date ? await Ticket.find({
        departure_city: departure_city,
        arrival_city: arrival_city,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }) : await Ticket.find({
        departure_city: departure_city,
        arrival_city: arrival_city,
    })
    const starting_depots = await Station.findOne({ location: arrival_city });
    res.status(200).json({
        status: "success",
        tickets: tickets,
        starting_depots: starting_depots
    })
})

const bookTicket = catchAsync(async (req, res, next) => {
    const ticket = await Ticket.findById(req.body.ticket_id);
    ticket.booked_seats = [...ticket.booked_seats, ...req.body.chosen_seats];
    await ticket.save();

    const newBooking = await TicketHistory.create({
        ...req.body,
        "user_id": req.body.user_id,
        "bus_type": ticket.bus_type,
        "time_start": ticket.departure_time,
        "date_start": ticket.date,
        "stage": "Đang xử lí"
    })


    if (req.body.user_id) {
        const user = await User.findById(req.body.user_id)
        user.myTicket.unshift(newBooking._id)
        user.save()
    }
    const socket = io.getIO();
    // using socket_io for displaying the ticket ordered in admin view dashboard
    socket.emit("book-ticket", newBooking);

    res.status(200).json({
        status: "success",
    })
})


export default { getTickets, bookTicket };
