import mongoose from 'mongoose';

const ticketHistorySchema = new mongoose.Schema({
  ticket_id: String,
  date: String,
  time: String,
  departure_city: String,
  arrival_city: String,
  time_start: String,
  date_start: Date,
  depot_address: String,
  payment_method: String,
  user_id: String,
  bus_type: String,
  number_of_seats: Number,
  chosen_seats: [String],
  total_price: Number,
  stage: String,
  guestInfo: {
    name: String,
    phoneNumber: String,
    email: String,
    age: String,
    city: String
  }
}, { toJSON: { virtuals: true } })

// ticketHistorySchema.virtual('truncatedDate').get(function () {
//   return this.date.toISOString().substring(0, 10);
// })

const TicketHistory = mongoose.model('ticket-histories', ticketHistorySchema);

export default TicketHistory;