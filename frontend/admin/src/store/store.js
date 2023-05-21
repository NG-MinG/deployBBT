import {configureStore} from "@reduxjs/toolkit";
import ticketManagingReducer from "./reducers/ticketManagingSlice"

export const store = configureStore({
    reducer: {
        ticketManaging: ticketManagingReducer,
    }
})