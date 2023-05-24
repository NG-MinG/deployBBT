import styles from "./ConfirmRoute.module.css";
import StepLine from "../StepLine/StepLine";
import {ReactComponent as LocationIcon} from "../../../assets/svg/TicketBooking/location.svg";
import {ReactComponent as DotIcon} from  "../../../assets/svg/TicketBooking/dot.svg"
import {ReactComponent as EyeIcon} from  "../../../assets/svg/TicketBooking/eye.svg"
import {ReactComponent as BackIcon} from  "../../../assets/svg/TicketBooking/back_arrow.svg"
import {ReactComponent as NextIcon} from  "../../../assets/svg/TicketBooking/next_arrow.svg"
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { setTicketBookingDetails, setReturnTicketBookingDetails } from "../../../store/reducers/ticketBookingSlice";
import { useSearchParams } from "react-router-dom"



const ConfirmRoute = (props) => {
    const [searchParams] = useSearchParams();

    const ticket_type = searchParams.get('ticket_type');
    const departure_city = searchParams.get('departure_city');
    const arrival_city = searchParams.get('arrival_city');
    const arrival_date = searchParams.get('arrival_date');
    const date = searchParams.get('date');

    const ticketBookingDetails = useSelector((state) => state.ticketBooking.ticketBookingDetails);
    const returnTicketBookingDetails = useSelector((state) => state.ticketBooking.return_ticketBookingDetails);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOptionChange = (event) => {
        if (!ticket_type) {
            dispatch(setReturnTicketBookingDetails({
                ...returnTicketBookingDetails,
                chosen_depot: event.target.value,
            }))
        }
        else {
            dispatch(setTicketBookingDetails({
                ...ticketBookingDetails,
                chosen_depot: event.target.value,
            }))
        }
    }

    const processContinueBtn = () => {
        if (ticket_type && ticket_type === '2') {
            navigate(`/ticket-booking?departure_city=${arrival_city}&arrival_city=${departure_city}&date=${arrival_date}`)
            props.onSetStep({
                stepOne: true,
                stepTwo: false,
                stepThree: false,
                stepFour: false
            })
            return;
        }
        props.onSetStep({
            stepTwo: false,
            stepThree: true,
        })
    }
    
    const processBackBtn = () => {
        props.onSetStep({
            stepOne: true,
            stepTwo: false,
        })
    }

    const ticketBookingDetail = ticket_type ? ticketBookingDetails : returnTicketBookingDetails;

    return <>
    <div className={styles["main-content"]}>
        <StepLine departure_city = {props.departure_city} arrival_city = {props.arrival_city} date = {props.date} currentStep = {props.currentStep}/>
        <div className={`${styles["ticket"]} ${styles["ticket-active"]}`}>
            <div className={styles["quick-description"]}>
                    <div className={styles["confirm-route-title"]}>Xác nhận lộ trình đi</div>
                    <div className={styles["ticket-details"]}>
                        <span className={styles["ticket-price"]}>{ticketBookingDetail.price}</span>
                        <span className={styles["bus-type"]}>
                            <span className={styles["Dot-icon"]}><DotIcon/></span>
                            <span className={styles["name"]}>{ticketBookingDetail.bus_type}</span>
                        </span>
                    </div>
                    <div className={styles["location"]}>
                        <LocationIcon/>
                        <span className={styles["departure-place"]}>{ticketBookingDetail.departure_depot}</span>
                        <span className={styles["arrival-place"]}>{ticketBookingDetail.arrival_depot}</span>
                        <span className={styles["distance"]}>Xe tuyến: {ticketBookingDetail.distance} - {ticketBookingDetail.travel_time}</span>
                    </div>
            </div>
        </div>
        <div className={styles["chosen-seats"]}>
                <div className={styles["seats"]}>
                    <span className={styles["title"]}>Ghế đã chọn</span>
                    <span className={styles["list-seats"]}>{ticketBookingDetail.choosing_seats.map((el, index) => index === ticketBookingDetail.choosing_seats.length - 1 ? `${el}` : `${el}, `)}</span>
                    {/* <span className={styles["watch-btn"]}>
                        <EyeIcon/>
                    </span> */}
                </div>
        </div>
        <div className={styles["border-line-spacing"]}></div>
        <div className={styles["chosen-depot"]}>
                <div className={styles["depot"]}>
                    <span className={styles["title"]}>Điểm lên xe</span>
                    <select className= {styles["list-depots"]} id="" onChange = {handleOptionChange}>
                        <option value="" disabled selected>Chọn điểm lên xe</option>
                        {ticketBookingDetail.starting_depots.map((el) => <option value= {el.address} >{el.name} - {el.address}</option>)}
                        {/* <option value="Bến Xe Miền tây" >Bến Xe Miền tây - VP Bến xe Trung Tâm Cần Thơ: P.Hưng Thạnh , Q. Cái Răng , TP.Cần Thơ</option>
                        <option value="Đồng Tâm" >Đồng Tâm</option> */}
                    </select>
                </div>
        </div>
        <div className={styles["btn-wrapper"]}>
            <button className={styles["back-to-previous"]}  onClick = {processBackBtn}>
                <span className={styles[""]}><BackIcon className = {styles["back-icon"]}/></span>
                <span className={styles["content"]}>Quay lại</span>
            </button>
            <button className={styles["continue"]} onClick = {processContinueBtn}>
                <span className={styles["content"]}>Tiếp tục</span>
                <span className={styles[""]}><NextIcon className = {styles["next-icon"]}/></span>
            </button>
        </div>
    </div>
</>
}

export default ConfirmRoute;


// () => props.onSetStep({
//     stepTwo: false,
//     stepThree: true,
// })