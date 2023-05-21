import styles from "./Payment.module.css"
import StepLine from "../StepLine/StepLine";
import Overlay from "../../Overlay/Overlay";
import { ReactComponent as RightArrowIcon } from "../../../assets/svg/TicketBooking/right_arrow.svg";
import { ReactComponent as BackIcon } from "../../../assets/svg/TicketBooking/back_arrow.svg"
import { ReactComponent as NextIcon } from "../../../assets/svg/TicketBooking/next_arrow.svg"
import { ReactComponent as GreenTickIcon } from "../../../assets/svg/TicketBooking/green_tick.svg"
import Momo from "../../../assets/images/Payment/Momo.png"
import Napas from "../../../assets/images/Payment/Napas.png"
import Visa from "../../../assets/images/Payment/Visa.png"
import Zalopay from "../../../assets/images/Payment/Zalopay.png"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTicketBookingDetails } from "../../../store/reducers/ticketBookingSlice";
import { useState, useEffect } from "react"
import axios from "axios";
import { auth } from '../../../utilities/storage'


const Payment = (props) => {
    const [isPayment, setIsPayment] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ticketBookingDetails = useSelector((state) => state.ticketBooking.ticketBookingDetails);
    const guestInfo = useSelector((state) => state.ticketBooking.guestInfo);
    const [paymentMethod, setPaymentMethod] = useState({
        momo: false,
        zalopay: false,
        napas: false,
        visa: false,
    })

    // date handle 

    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var date_now = day + "/" + month + "/" + year;
    var hours = dateObj.getHours().toString().padStart(2, '0');
    var minutes = dateObj.getMinutes().toString().padStart(2, '0');

    // processing state
    const processBackBtn = () => {
        props.onSetStep({
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            stepFour: true,
        })
        navigate('/')
    }

    const handlePaymentMethodChange = (paymentMethod) => {
        setPaymentMethod({ momo: false, zalopay: false, napas: false, visa: false, ...paymentMethod })
        dispatch(setTicketBookingDetails({
            ...ticketBookingDetails,
            payment_method: Object.keys(paymentMethod)[0]
        }))
    }

    const processPaymentBtn = () => {
        // post api
        const data = {
            ticket_id: ticketBookingDetails.ticket_id,
            date: date_now,
            time: `${hours}:${minutes}`,
            departure_city: ticketBookingDetails.departure_city,
            arrival_city: ticketBookingDetails.arrival_city,
            depot_address: ticketBookingDetails.chosen_depot,
            payment_method: ticketBookingDetails.payment_method,
            number_of_seats: ticketBookingDetails.choosing_seats.length,
            chosen_seats: ticketBookingDetails.choosing_seats,
            total_price: ticketBookingDetails.total_price,
            user_id: auth.isLogin() ? auth.getUserProfile()._id : '',
            guestInfo: {
                ...guestInfo
            }
        }

        axios.post(`${process.env.REACT_APP_API_HOST}/tickets/book-ticket`, data)
            .then((res) => {
                console.log(res)
                setIsPayment(true)
            }).catch((err) => console.log(err))

    }


    const processConfirmBtn = () => {
        props.onSetStep({
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            stepFour: true,
        })
        !auth.isLogin() ? navigate('/') : navigate('/user-profile/my-ticket');
    }

    const closeConfirmForm = () => {
        setIsPayment(false);
        props.onSetStep({
            stepOne: true,
            stepTwo: false,
            stepThree: false,
            stepFour: true,
        })
        navigate('/')
    }



    return <>
        <div className={styles["main-content"]}>
            <StepLine departure_city={props.departure_city} arrival_city={props.arrival_city} date={props.date} currentStep={props.currentStep} />
            <div className={styles["ticket-information"]}>
                <div className={styles["title"]}>Thông tin mua vé</div>
                <div className={styles["guest-info-label"]}>Thông tin khách hàng</div>
                <div className={styles["guest-info"]}>
                    <div className={styles["name-info"]}>
                        <span className={styles["label"]}>Họ tên:</span>
                        <span className={styles["value"]}>{guestInfo.name}</span>
                    </div>
                    <div className={styles["phone-info"]}>
                        <span className={styles["label"]}>Số điện thoại:</span>
                        <span className={styles["value"]}>{guestInfo.phoneNumber}</span>
                    </div>
                    <div className={styles["email-info"]}>
                        <span className={styles["label"]}>Email:</span>
                        <span className={styles["value"]}>{guestInfo.email}</span>
                    </div>
                </div>
                <div className={styles["route-info-label"]}>Thông tin chuyến:
                    <span className={styles["route"]}>
                        <span className={styles["departure_city"]}>{ticketBookingDetails.departure_city}</span>
                        <span className={styles[""]}><RightArrowIcon className={styles["right-arrow-icon"]} /></span>
                        <span className={styles["arrival_city"]}>{ticketBookingDetails.arrival_city}</span>
                    </span>
                </div>
                <div className={styles["route-info"]}>
                    <div className={styles["route-info-gr-1"]}>
                        <div className={styles["route"]}>
                            <span className={styles["label"]}>Tuyến xe:</span>
                            <span className={styles["route"]}>
                                <span className={styles["departure_city"]}>{ticketBookingDetails.departure_city}</span>
                                <span className={styles[""]}><RightArrowIcon className={styles["right-arrow-icon"]} /></span>
                                <span className={styles["arrival_city"]}>{ticketBookingDetails.arrival_city}</span>
                            </span>
                        </div>
                        <div className={styles["time"]}>
                            <span className={styles["label"]}>Thời gian:</span>
                            <span className={styles["time-info"]}>
                                <span className={styles["current-time"]}>{hours}:{minutes}</span>
                                <span className={styles["date"]}>{date_now}</span>
                            </span>
                        </div>
                        <div className={styles["arrival-depot"]}>
                            <span className={styles["label"]}>Điểm lên xe:</span>
                            <span className={styles["depot"]}>{ticketBookingDetails.chosen_depot}</span>
                        </div>
                    </div>
                    <div className={styles["route-info-gr-2"]}>
                        <div className={styles["number-of-seats"]}>
                            <span className={styles["label"]}>Số lượng ghế: </span>
                            <span className={styles["seats-num"]}>{ticketBookingDetails.choosing_seats.length}</span>
                        </div>
                        <div className={styles["chosen-seats"]}>
                            <span className={styles["label"]}>Số ghế: </span>
                            <span className={styles["seats-id"]}>{ticketBookingDetails.choosing_seats.map((el, index) => index === ticketBookingDetails.choosing_seats.length - 1 ? `${el}` : `${el}, `)}</span>
                        </div>
                    </div>
                </div>
                <div className={styles["total-price"]}>
                    <span className={styles["label"]}>Tổng tiền</span>
                    <span className={styles["price"]}>{String(ticketBookingDetails.total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}</span>
                </div>
            </div>
            <div className={styles["payment-title"]}>Chọn cách thanh toán</div>
            <div className={styles["payment-methods-wrapper"]}>
                <div className={styles["payment-methods"]}>
                    <div className={paymentMethod.momo ? `${styles["momo"]} ${styles["payment-active"]}` : styles["momo"]} onClick={() => handlePaymentMethodChange({ momo: true })}>
                        <span className={styles["momo-icon"]}>
                            <img src={Momo} alt="" />
                        </span>
                        <span className={paymentMethod.momo ? styles["text-active"] : styles["text"]}>MOMO</span>
                    </div>
                    <div className={paymentMethod.zalopay ? `${styles["zalo-pay"]} ${styles["payment-active"]}` : styles["zalo-pay"]} onClick={() => handlePaymentMethodChange({ zalopay: true })}>
                        <span className={styles["zalopay-icon"]}>
                            <img src={Zalopay} alt="" />
                        </span>
                        <span className={paymentMethod.zalopay ? styles["text-active"] : styles["text"]}>ZALOPAY</span>
                    </div>
                    <div className={paymentMethod.napas ? `${styles["napas"]} ${styles["payment-active"]}` : styles["napas"]} onClick={() => handlePaymentMethodChange({ napas: true })}>
                        <span className={styles["napas-icon"]}>
                            <img src={Napas} alt="" />
                        </span>
                        <span className={paymentMethod.napas ? styles["text-active"] : styles["text"]}>NASPAS</span>
                    </div>
                    <div className={paymentMethod.visa ? `${styles["visa"]} ${styles["payment-active"]}` : styles["visa"]} onClick={() => handlePaymentMethodChange({ visa: true })}>
                        <span className={styles["visa-icon"]}>
                            <img src={Visa} alt="" />
                        </span>
                        <span className={paymentMethod.visa ? styles["text-active"] : styles["text"]}>VISA</span>
                    </div>
                </div>
            </div>

            <div className={styles["btn-wrapper"]}>
                <button className={styles["back-to-previous"]} onClick={processBackBtn}>
                    <span className={styles[""]}><BackIcon className={styles["back-icon"]} /></span>
                    <span className={styles["content"]}>Quay lại</span>
                </button>
                <button className={styles["continue"]} onClick={processPaymentBtn}>
                    <span className={styles["content"]}>Thanh toán</span>
                    <span className={styles[""]}><NextIcon className={styles["next-icon"]} /></span>
                </button>
            </div>
        </div>

        {isPayment && <div className={styles["confirm-form"]}>
            <Overlay onCloseOverlay={closeConfirmForm} />
            <div className={styles["form"]}>
                <div className={styles["title"]}>Thanh toán thành công</div>
                <div className={styles["green-tick-icon"]}>
                    <GreenTickIcon />
                </div>
                <div className={styles["confirm"]}>
                    <button className={styles["back-to-previous"]} onClick={processBackBtn}>
                        <span className={styles[""]}><BackIcon className={styles["back-icon"]} /></span>
                        <span className={styles["content"]}>Trở về trang chủ</span>
                    </button>
                    <button className={styles["confirm-btn"]} onClick={processConfirmBtn}>
                        Xem lịch sử đặt vé của bạn
                    </button>
                </div>
            </div>
        </div>}
    </>
}

export default Payment;