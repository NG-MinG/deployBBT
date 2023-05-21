import React, { useState } from 'react'
import styles from './MyTicketItem.module.css'
import { faCalendarCheck, faClock } from '@fortawesome/free-regular-svg-icons'
import { faArrowRightLong, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toDateFormat, toPriceFormat } from "../../../../utilities/format";


export default function MyTicketItem(props) {
  // const date = new Date()
  const result1 = new Date(props.value.date_start).toLocaleDateString('en-GB');
  // var dateParts = result1.split("/");

  // let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  // const [expire, setExpire] = useState(dateObject.getTime() < date.getTime());

  return (
    <div className={styles.MyTicketItem}>
      <div className={styles.top}>
        <div className={styles.route}>
          <p>{props.value.departure_city}</p>
          <FontAwesomeIcon icon={faArrowRightLong} style={{ color: '#ffffff', fontSize: '2.6rem' }} />
          <p>{props.value.arrival_city}</p>
        </div>
        <div className={styles.date}>
          <FontAwesomeIcon icon={faCalendarCheck} style={{ color: '#ffffff', fontSize: '2.6rem' }} />
          <p>{result1}</p>
        </div>
        <div className={styles.hour}>
          <FontAwesomeIcon icon={faClock} style={{ color: '#ffffff', fontSize: '2.6rem' }} />
          <p>{props.value.time_start}</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.name}>
            <p>Tên hành khách:</p>
            <p>{props.value.guestInfo.name}</p>
          </div>
          <div className={styles.seats}>
            <p>Số lượng ghế:</p>
            <p>{props.value.number_of_seats}</p>
          </div>
          <div className={styles.seatName}>
            <p style={{ display: 'flex', fontWeight: '500' }} >Số ghế: &nbsp;
              {props.value.chosen_seats.map((value, index) => (
                <p key={index} style={{ fontWeight: '400' }}>{value} &nbsp;</p>
              ))}</p>
          </div>
          <div className={styles.ticketPickUp}>
            <p style={{ minWidth: '9.6rem' }}>Nơi nhận vé:</p>
            <p>{props.value.depot_address}</p>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.phoneNumber}>
            <p>Số điện thoại:</p>
            <p>{props.value.guestInfo.phoneNumber}</p>
          </div>
          <div className={styles.busType}>
            <p>Loại xe:</p>
            <p>{props.value.bus_type}</p>
          </div>
          <div className={styles.expense}>
            {/* <p>Giá:</p> */}
            <p>{toPriceFormat(props.value.total_price)}đ</p>
          </div>
        </div>
        {/* <div className={styles.cancelButton}>
          <FontAwesomeIcon icon={faTrash} style={{ color: '#ffffff', fontSize: '2.1rem' }} />
          <p>hủy chuyến</p>
        </div> */}
      </div>
      {/* {expire && <div className={styles.expire}></div>} */}
      {/* {expire && <p className={styles['expire-text']}>Hết hạn</p>} */}
    </div>
  )
}
