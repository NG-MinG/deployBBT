import { ReactComponent as SeatIcon } from "../../assets/svg/ManageTicket/seat.svg";
import styles from "./Seat.module.css";

const Seat = (props) => {

    const color = props.greenColor ? "#35BE3B" : "#417DD8";

    return (<div className={styles["seat"]} onClick={() => {
        if (props.color !== "red") props.onChooseSeat(props.seatID)
    }}>
        <SeatIcon className={styles["seat-icon"]} style={{ fill: props.isChoosing && props.color !== "red" ? color : props.color }} />
        <span className={styles["seat-id"]} style={{ color: props.isChoosing && props.color !== "red" ? color : props.color }}>{props.seatID}</span>
    </div>)
}

export default Seat;