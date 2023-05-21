import {ReactComponent as SeatIcon} from "../../../assets/svg/TicketBooking/seat.svg";
import styles from "./Seat.module.css";

const Seat = (props) => {
    return (<div className={styles["seat"]} onClick = {() => {
        if (props.color !== "red") props.onChooseSeat(props.seatID)}}>
        <SeatIcon className = {styles["seat-icon"]} style = {{fill: props.isChoosing && props.color !== "red" ? "#417DD8" : props.color}}/>
        <span className={styles["seat-id"]} style = {{color: props.isChoosing && props.color !== "red" ? "#417DD8" : props.color}}>{props.seatID}</span>
    </div>)
}

export default Seat;