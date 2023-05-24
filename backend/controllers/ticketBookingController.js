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
    const starting_depots = await Station.findOne({ location: departure_city });
    res.status(200).json({
        status: "success",
        tickets: tickets,
        starting_depots: starting_depots
    })
})

const bookTicket = catchAsync(async (req, res, next) => {

    // ticket 1
    const ticket = await Ticket.findById(req.body[0].ticket_id);
    ticket.booked_seats = [...ticket.booked_seats, ...req.body[0].chosen_seats];
    await ticket.save();

    const newBooking = await TicketHistory.create({
        ...req.body[0],
        "user_id": req.body[0].user_id,
        "bus_type": ticket.bus_type,
        "time_start": ticket.departure_time,
        "date_start": ticket.date,
        "stage": "Đang xử lí"
    })

    if (req.body[0].user_id) {
        const user = await User.findById(req.body[0].user_id)
        user.myTicket.unshift(newBooking._id)
        user.save()
    }

    const socket = io.getIO();
    // using socket_io for displaying the ticket ordered in admin view dashboard
    socket.emit("book-ticket", newBooking);

    // ticket 2
    if (req.body[1].ticket_id) {
        const _ticket = await Ticket.findById(req.body[1].ticket_id);
        _ticket.booked_seats = [..._ticket.booked_seats, ...req.body[1].chosen_seats];
        await _ticket.save()

        const _newBooking = await TicketHistory.create({
            ...req.body[1],
            "user_id": req.body[1].user_id,
            "bus_type": _ticket.bus_type,
            "time_start": _ticket.departure_time,
            "date_start": _ticket.date,
            "stage": "Đang xử lí"
        })

        if (req.body[1].user_id) {
            const _user = await User.findById(req.body[1].user_id)
            _user.myTicket.unshift(_newBooking._id)
            _user.save()
        }

        socket.emit("book-ticket", _newBooking);
    }


    res.status(200).json({
        status: "success",
    })
})


export default { getTickets, bookTicket };
