import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import userProfileRouter from "./routes/userProfileRoutes.js"
import scheduleRouter from "./routes/scheduleRoutes.js"
import stationRouter from "./routes/stationRoutes.js"
import adminRouter from "./routes/adminRoutes.js"
import analystRouter from "./routes/analystRoutes.js"
import authRouter from './routes/authRoutes.js';
import ticketBookingRouter from "./routes/ticketBookingRoutes.js";
import ticketManagingRouter from "./routes/ticketManagingRoutes.js";
import ticketHistoryRouter from "./routes/ticketHistoryRoutes.js"
import globalErrorhandler from "./controllers/ErrorController.js"
import bodyParser from 'body-parser'

const limiter = rateLimit({
  // limiter is now become a middleware function
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try this again in an hour!',
}); // define how many requests per IP we are going to allow in a certain of time

const app = express();
app.use(limiter);
app.use(cors());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json({ limit: '10mb' }));

app.use('/bus/api/v1/auth', authRouter);
app.use('/bus/api/v1/user', userProfileRouter); // mounting new router on route (URL)
app.use('/bus/api/v1/schedule', scheduleRouter);
app.use('/bus/api/v1/station', stationRouter);
app.use('/bus/api/v1/tickets', ticketBookingRouter)

app.use('/bus/api/v1/admin/ticket-managing', ticketManagingRouter);
app.use('/bus/api/v1/admin', adminRouter);
app.use('/bus/api/v1/admin/analyst', analystRouter);
app.use('/bus/api/v1/admin/ticket-history', ticketHistoryRouter);

app.use(globalErrorhandler);

export default app;