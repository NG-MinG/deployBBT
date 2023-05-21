import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from "./app.js";
// import { Server } from 'socket.io';
import io from './socket.js';
import bcrypt from 'bcryptjs';


const port = process.env.PORT || 5000;

dotenv.config({ path: './config.env' });

mongoose
    .connect(process.env.DATABASE)
    .then(() => {
        console.log('Connected to DB successfully');
    });

const server = app.listen(port, async () => {
    console.log(`App is running on port ${port}...`);
    // console.log(await bcrypt.hash('11111111', 12));
});

// init socket
io.init(server);

process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection. Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1); // 0 is success, 1 is uncaught exception
    });
});

// export const io = new Server(server, {
//     cors: {
//         origin: "*"
//     }
// });

// io.on('connection', (socket) => {
//     console.log("socket connected")
//     socket.on('book-ticket', async (data) => {
//         io.emit("book-ticket", data)
//     })
//     const onBookTicket = function (data) {
//         io.emit("book-ticket", data);
//     };
// })

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDlcuVBmUxI8dV9pziNX5u6YktxfQjbKEw",
//   authDomain: "busticketbooking-455c8.firebaseapp.com",
//   projectId: "busticketbooking-455c8",
//   storageBucket: "busticketbooking-455c8.appspot.com",
//   messagingSenderId: "176983530226",
//   appId: "1:176983530226:web:fc34434c0203043606ce6b",
//   measurementId: "G-Y26Q2CKKRR"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
