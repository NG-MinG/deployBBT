import styles from "./Ticket.module.css";
import { ReactComponent as RightArrowIcon } from "../../assets/svg/TicketBooking/right_arrow.svg";
import { ReactComponent as WaterIcon } from "../../assets/svg/TicketBooking/water.svg";
import { ReactComponent as SleeperIcon } from "../../assets/svg/TicketBooking/sleeper.svg";
import { ReactComponent as WifiIcon } from "../../assets/svg/TicketBooking/wifi.svg";
import { ReactComponent as DotIcon } from "../../assets/svg/TicketBooking/dot.svg";
import { ReactComponent as LocationIcon } from "../../assets/svg/TicketBooking/location.svg";
import Seat from "../TicketBooking/Seat/Seat.js";
import Status from "../TicketBooking/Seat/Status.js";
import LimousineLayout from "../BusLayout/LimousineLayout/LimousineLayout";
import SleeperLayout from "../BusLayout/SleeperLayout/SleeperLayout";
import ChairLayout from "../BusLayout/ChairLayout/ChairLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTicketBookingDetails } from "../../store/reducers/ticketBookingSlice";


const Ticket = (props) => {
    const [choosingSeats, setChoosingSeats] = useState([]);
    const [price, setPrice] = useState(0);
    const dispatch = useDispatch();
    const chooseSeat = (seatID) => {
        return setChoosingSeats((pre) => {
            if (pre.includes(seatID)) {
                setPrice((pre) => pre - parseInt(props.ticketDetails.price.replace(/\D/g, '')))
                return pre.filter((el, index) => el !== seatID);
            }
            setPrice((pre) => pre + parseInt(props.ticketDetails.price.replace(/\D/g, '')))
            return [...pre, seatID];
        })
    }

    const processContinueBtn = () => {
        props.onSetStep({
            stepOne: false,
            stepTwo: true,
        });
        dispatch(setTicketBookingDetails({
            ticket_id: props.ticketDetails._id,
            truncatedDate: props.ticketDetails.truncatedDate,
            departure_time: props.ticketDetails.departure_time,
            arrival_time: props.ticketDetails.arrival_time,
            departure_city: props.ticketDetails.departure_city,
            arrival_city: props.ticketDetails.arrival_city,
            ticket_type: props.ticketDetails.ticket_type,
            price: props.ticketDetails.price,
            travel_time: props.ticketDetails.travel_time,
            distance: props.ticketDetails.distance,
            departure_depot: props.ticketDetails.departure_depot,
            arrival_depot: props.ticketDetails.arrival_depot,
            bus_type: props.ticketDetails.bus_type,
            booked_seats: props.ticketDetails.booked_seats,
            reserved_seats: props.ticketDetails.reserved_seats,
            total_seats: props.ticketDetails.total_seats,
            choosing_seats: choosingSeats,
            total_price: price,
            // ***
            starting_depots: props.startingDepots,
        }))
    }


    return <div className={props.dropDown ? `${styles["ticket"]} ${styles["ticket-active"]}` : styles["ticket"]} onClick={() => { props.onChooseTicket(props.ticketDetails.id) }}>
        <div className={styles["quick-description"]}>
            <div className={styles["time-travel"]}>
                <span className={styles["start-time"]}>{props.ticketDetails.departure_time}</span>
                <span className={styles["arrow"]}>{<RightArrowIcon />}</span>
                <span className={styles["end-time"]}>{props.ticketDetails.arrival_time}</span>
            </div>
            <div className={styles["features"]}>
                <WaterIcon />
                {props.ticketDetails.bus_type !== "Ghế" && <SleeperIcon />}
                <WifiIcon />
            </div>
            <div className={styles["ticket-details"]}>
                <span className={styles["ticket-price"]}>{props.ticketDetails.price}</span>
                <span className={styles["bus-type"]}>
                    <span className={styles["Dot-icon"]}><DotIcon /></span>
                    <span className={styles["name"]}>{props.ticketDetails.bus_type}</span>
                </span>
                <span className={styles["left-slots"]}>
                    <span className={styles["Dot-icon"]}><DotIcon /></span>
                    <span className={styles["status"]}>Còn {props.ticketDetails.total_seats - props.ticketDetails.reserved_seats} chỗ</span>
                </span>
            </div>
            <div className={styles["location"]}>
                <LocationIcon />
                <span className={styles["departure-place"]}>{props.ticketDetails.departure_depot}</span>
                <span className={styles["arrival-place"]}>{props.ticketDetails.arrival_depot}</span>
                <span className={styles["distance"]}>Xe tuyến: {props.ticketDetails.distance} - {props.ticketDetails.travel_time}</span>
            </div>
        </div>
        {props.dropDown && 
        <>
            <div className={styles["layout-seat-description"]}>Vị trí ghế ngồi</div>
            <div className={styles["layout-seat"]}>
                {props.ticketDetails.bus_type === "Limousine" && <LimousineLayout bookedSeats = {props.ticketDetails.booked_seats} choosingSeats = {choosingSeats} onChooseSeat = {chooseSeat}/>}
                {props.ticketDetails.bus_type === "Giường" && <SleeperLayout bookedSeats = {props.ticketDetails.booked_seats} choosingSeats = {choosingSeats} onChooseSeat = {chooseSeat}/>}
                {props.ticketDetails.bus_type === "Ghế" && <ChairLayout bookedSeats = {props.ticketDetails.booked_seats} choosingSeats = {choosingSeats} onChooseSeat = {chooseSeat}/>}
               
                <div className={styles["notes"]}>
                    <div className={styles["status"]}>
                        <span className={styles["color-indicate"]}><Status color = "#C0C6CC"/></span>
                        <span className={styles["description"]} style = {{color: "#737B83", fontWeight: 500}}>Trống</span>
                    </div>
                    <div className={styles["status"]}>
                        <span className={styles["color-indicate"]}><Status color =  "#417DD8"/></span>
                        <span className={styles["description"]} style = {{color: "#417DD8", fontWeight: 500}}>Đang chọn</span>
                    </div>
                    <div className={styles["status"]}>
                        <span className={styles["color-indicate"]}><Status color = "#FF0000"/></span>
                        <span className={styles["description"]} style = {{color: "#FF0000", fontWeight: 500}}>Đã đặt</span>
                    </div>
                </div>
                {choosingSeats.length > 0 &&
                    <>
                        <div className={styles["calculation"]}>
                            <div className={styles["chosenSeats"]}>{choosingSeats.length} vé: {choosingSeats.map((el, index) => index === choosingSeats.length - 1 ? `${el}` : `${el}, `)}</div>
                            <div className={styles["total-price"]}>Tổng tiền: <span className={styles["price"]} style={{ color: "red", fontWeight: 600 }}>{String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}</span></div>
                        </div>
                        <button className={styles["continue-btn"]} onClick={processContinueBtn}>Tiếp tục</button>
                    </>
                }
            </div>
        </>
        }
    </div>
}

export default Ticket;