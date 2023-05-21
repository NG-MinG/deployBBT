import React, { useEffect, useState } from 'react'
import styles from './ManageTicketOrderEdit.module.css'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import SleeperLayout from '../../BusLayout/SleeperLayout/SleeperLayout'
import LimousineLayout from '../../BusLayout/LimousineLayout/LimousineLayout'
import ChairLayout from '../../BusLayout/ChairLayout/ChairLayout'
import axios from 'axios'
import Status from '../../Seat/Status'

export default function ManageTicketOrderEdit() {
  const navigate = useNavigate();
  const location = useLocation();

  const [information, setInformation] = useState(location.state)
  const [choosingSeats, setChoosingSeats] = useState([]);
  const [ticketInformation, setTicketInformation] = useState({})

  useEffect(() => {
    axios.patch(process.env.REACT_APP_API_HOST + '/admin/ticket-history/getTicketSeat', { ticket_id: information.ticket_id, history_id: information._id }).then((res) => {
      // setTicketInformation(res.data.data)
      setInformation(res.data.data.ticket_history)
      setChoosingSeats(res.data.data.ticket_history.chosen_seats)
      const _info = res.data.data.ticket
      _info.booked_seats = res.data.data.ticket.booked_seats.filter(val => !res.data.data.ticket_history.chosen_seats.includes(val))
      setTicketInformation(_info)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const chooseSeat = (seatID) => {
    return setChoosingSeats((pre) => {
      if (pre.includes(seatID)) {
        // setPrice((pre) => pre - parseInt(props.ticketDetails.price.replace(/\D/g, '')))
        return pre.filter((el, index) => el !== seatID);
      }
      // setPrice((pre) => pre + parseInt(props.ticketDetails.price.replace(/\D/g, '')))
      return [...pre, seatID];
    })
  }

  const handleChangeInputName = (e) => {
    const _info = information.guestInfo
    _info.name = e.target.value
    setInformation(prev => ({ ...prev, guestInfo: _info }));
  }

  const handleChangeInputPhone = (e) => {
    const _info = information.guestInfo
    _info.phoneNumber = e.target.value
    setInformation(prev => ({ ...prev, guestInfo: _info }));
  }

  const [message, setMessage] = useState('')

  const handleSave = () => {
    if (information.guestInfo.name.length === 0 || information.guestInfo.phoneNumber.length === 0) {
      alert('Hãy điền đầy đủ thông tin!')
    }
    else {
      const ticket_update = {
        id: information._id,
        guestInfo: information.guestInfo,
        chosen_seats: choosingSeats
      }
      axios.patch(process.env.REACT_APP_API_HOST + '/admin/ticket-history/update', ticket_update).then((res) => {
        console.log("successfully!")
        setMessage("Successfully!")
        if (choosingSeats.length === 0) navigate("/admin/manage-ticket/ticket-order")
      }).catch(error => {
        console.log(error)
      })
    }
  }

  return (
    <div className={styles.ManageTicketOrderEdit}>
      {/* <FontAwesomeIcon onClick={() => navigate("/admin/manage-ticket/ticket-order")} className={styles.icon} icon={faArrowLeft} style={{ alignSelf: "flex-start", cursor: "pointer", fontSize: "3.2rem", color: '#083F73' }} /> */}
      <div className={styles.main}>
        <div className={styles.information}>
          <div className={styles['information-item']}>
            <p>Họ và tên</p>
            <input onChange={handleChangeInputName} value={information.guestInfo.name} />
          </div>
          <div className={styles['information-item']}>
            <p>Số điện thoại</p>
            <input onChange={handleChangeInputPhone} value={information.guestInfo.phoneNumber} />
          </div>
        </div>
        <div className={styles["layout-seat"]}>
          {ticketInformation.bus_type === "Limousine" && <LimousineLayout bookedSeats={ticketInformation.booked_seats} choosingSeats={choosingSeats} onChooseSeat={chooseSeat} />}
          {ticketInformation.bus_type === "Giường" && <SleeperLayout bookedSeats={ticketInformation.booked_seats} choosingSeats={choosingSeats} onChooseSeat={chooseSeat} />}
          {ticketInformation.bus_type === "Ghế" && <ChairLayout bookedSeats={ticketInformation.booked_seats} choosingSeats={choosingSeats} onChooseSeat={chooseSeat} />}


          <div className={styles["notes"]}>
            <div className={styles["status"]}>
              <span className={styles["color-indicate"]}><Status color="#C0C6CC" /></span>
              <span className={styles["description"]} style={{ color: "#737B83", fontWeight: 500 }}>Trống</span>
            </div>
            <div className={styles["status"]}>
              <span className={styles["color-indicate"]}><Status color="#417DD8" /></span>
              <span className={styles["description"]} style={{ color: "#417DD8", fontWeight: 500 }}>Đang chọn</span>
            </div>
            <div className={styles["status"]}>
              <span className={styles["color-indicate"]}><Status color="#FF0000" /></span>
              <span className={styles["description"]} style={{ color: "#FF0000", fontWeight: 500 }}>Đã đặt</span>
            </div>
          </div>
        </div>
        <button className={styles.save} onClick={handleSave}>Lưu</button>
        {message.length > 0 && <p style={{ color: '#51cf66', marginTop: '1rem' }}>Lưu thành công!</p>}
      </div>

    </div>
  )
}
