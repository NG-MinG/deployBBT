import styles from "./GuestInfo.module.css";
import StepLine from "../StepLine/StepLine";
import {ReactComponent as BackIcon} from  "../../../assets/svg/TicketBooking/back_arrow.svg"
import {ReactComponent as NextIcon} from  "../../../assets/svg/TicketBooking/next_arrow.svg"
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import { setTicketBookingDetails, setGuestInfo } from "../../../store/reducers/ticketBookingSlice";
import {useState} from "react";
import Overlay from "../../Overlay/Overlay";


export const GuestInfo = (props) => {
    const [note, setNote] = useState(false);
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phoneNumber: '', 
        age: null,
        city: ''
    })
    const guestInfo = useSelector((state) => state.ticketBooking.GuestInfo);
    const dispatch = useDispatch();

    const processContinueBtn = () => {
        const isEmptyField = Object.values(formValues).some(value => value === '' || value === null);
        if (isEmptyField) {
            alert("Vui lòng nhập đầy đủ thông tin trong form.");
            return;

        }
        setNote(true);
    }

    const processConfirmBtn = () => {
        props.onSetStep({
            stepThree: false,
            stepFour: true,
        })
        dispatch(setGuestInfo({
            ...guestInfo,
            ...formValues
        }))
    }

    
    const processBackBtn = () => {
        props.onSetStep({
            stepTwo: true,
            stepThree: false,
        })
    }

    const closeNoteForm = () => {
        setNote(false);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormValues({
            ...formValues,
            [name]: value,
        })
    }

    return <>
    <div className={styles["main-content"]}>
        <StepLine departure_city = {props.departure_city} arrival_city = {props.arrival_city} date = {props.date} currentStep = {props.currentStep}/>
        <div className={styles["guest-info"]}>
            <div className={styles["title"]}>Thông tin hành khách</div>
            <div className={styles["input"]}>
                <label htmlFor="">Họ và tên hành khách *</label>
                <input name = "name" value = {formValues.name} onChange = {handleInputChange} type="text" placeholder="Nhập họ và tên"/>
            </div>
            <div className={styles["input"]}>
                <label htmlFor="">Số điện thoại *</label>
                <input name = "phoneNumber" value = {formValues.phoneNumber} onChange = {handleInputChange} type="text" placeholder="Nhập số điện thoại"/>
            </div>
            <div className={styles["input"]}>
                <label htmlFor="">Email *</label>
                <input name = "email" value = {formValues.email} onChange = {handleInputChange} type="text" placeholder="Nhập email"/>
            </div>
            <div className={`${styles["input"]} ${styles["flex-container"]}`}>
                <div className={styles["age"]}>
                    <label htmlFor="">Tuổi</label>
                    <input name = "age" value = {formValues.age} onChange = {handleInputChange} type="text" placeholder="Nhập tuổi của bạn"/>
                </div>
                <div className={styles["city"]}>
                    <label htmlFor="">Tỉnh / TP *</label>
                    <select id="#city-choosing" name = "city" value = {formValues.city} onChange = {handleInputChange}>
                        <option value="" disable selected>Chọn tỉnh / thành phố</option>
                        <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                        <option value="Cần Thơ">Cần Thơ</option>
                        <option value="Long An">Long An</option>
                        <option value="Tiền Giang">Tiền Giang</option>
                        <option value="Bến Tre">Bến Tre</option>
                        <option value="Vĩnh Long">Vĩnh Long</option>
                        <option value="Trà Vinh">Trà Vinh</option>
                        <option value="Hậu Giang">Hậu Giang</option>
                        <option value="Sóc Trăng">Sóc Trăng</option>
                        <option value="Đồng Tháp">Đồng Tháp</option>
                        <option value="An Giang">An Giang</option>
                        <option value="Kiên Giang">Kiên Giang</option>
                        <option value="Bạc Liêu">Bạc Liêu</option>
                        <option value="Cà Mau">Cà Mau</option>
                    </select>
                </div>
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
    {note && <div className={styles["note-form"]}>
         <Overlay  onCloseOverlay = {closeNoteForm}/>
         <div className={styles["form"]}>
            <div className={styles["title"]}>Điều khoản & lưu ý</div>
            <span className={styles["text"]}>(*) Quý khách vui lòng mang email có chứa mã vé đến văn phòng để đổi vé lên xe trước giờ xuất bến ít nhất <span style = {{color: "#417DD8", fontWeight: 600}}>60 phút</span> để chúng tôi trung chuyển.</span>
            <span className={styles["text"]}>(*) Thông tin hành khách phải chính xác, nếu không sẽ không thể lên xe hoặc <span style = {{color: "#417DD8", fontWeight: 600}}>hủy/đổi vé</span>.</span>
            <span className={styles["text"]}>(*) Quý khách không được đổi/trả vé vào các ngày Lễ Tết (ngày thường quý khách được quyền chuyển đổi hoặc hủy vé một lần, duy nhất trước giờ xe chạy 24 giờ), phí hủy vé <span style = {{color: "#417DD8", fontWeight: 600}}>10%</span>.</span>
            <span className={styles["text"]}>(*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ số điện thoại <span style = {{color: "#417DD8", fontWeight: 600}}>1900 1404</span> trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe trung chuyển không thể tới được.</span>
            <div className={styles["confirm"]}>
                <button className={styles["confirm-btn"]} onClick = {processConfirmBtn}>
                    Tôi đồng ý, tiếp tục
                </button>
            </div>
         </div>
    </div>}
    </>
}

export default GuestInfo;