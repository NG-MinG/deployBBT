import catchAsync from "../utils/catchAsync.js";
import ticketHistoryModel from "../models/ticketHistoryModel.js";
import AppError from "../utils/appError.js";

const getAnalyst = catchAsync(async (req, res, next) => {

    const query = (req.query && req.query.q) ? { date: req.query.q } : { date: `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}` };
    const listHistory = await ticketHistoryModel.find({...query, stage: { $in: ['Đã đặt', 'Đang xử lí'] } });

    const total_price = listHistory.reduce((total, history) => total + history.total_price, 0);
    const total_bus_type = Array.from(new Set(listHistory.map(el => el.bus_type.toLowerCase()))).length;
    const total_customer = Array.from(new Set(listHistory.map(el => el.guestInfo.phoneNumber.trim()))).length;
    const total_ticket = listHistory.reduce((total, history) => total + (history.stage !== 'Đã huỷ') ? (history.chosen_seats.length) : 0, 0);
    // const total_ticket = listHistory.length;

    res.status(200).json({
        total_price,
        total_bus_type,
        total_customer,
        total_ticket
    });
});

export default { getAnalyst };