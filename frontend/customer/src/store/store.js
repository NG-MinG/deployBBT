import {configureStore} from "@reduxjs/toolkit";
import ticketBookingReducer from "./reducers/ticketBookingSlice";

export const store = configureStore({
    reducer: {
        ticketBooking: ticketBookingReducer,
    }
});