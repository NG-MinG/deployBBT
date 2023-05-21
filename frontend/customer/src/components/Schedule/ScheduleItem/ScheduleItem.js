import React from 'react'
import styles from './ScheduleItem.module.css'
import { useNavigate } from 'react-router-dom';

export default function ScheduleItem({ diem, type, value }) {
  function toHoursAndMinutes(totalSeconds) {
    const minutes = totalSeconds % 60;
    const hours = Math.floor(totalSeconds / 3600);

    return minutes > 0 ? `${hours}h${padTo2Digits(minutes)}` : `${hours}h`;
  }

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  const navigate = useNavigate()
  const handleClick = () => {
    const date = new Date().toISOString().split('T')[0]
    if (type === "from") {
      navigate(
        `/ticket-booking?departure_city=${"TP.Hồ Chí Minh"}&arrival_city=${diem}&date=${date}&ticket_type=${value.bus_type}`
      );
    } else {
      navigate(
        `/ticket-booking?departure_city=${diem}&arrival_city=${"TP.Hồ Chí Minh"}&date=${date}&ticket_type=${value.bus_type}`
      );
    }
  }


  return (
    <div className={styles.ScheduleItem}>
      <p>{diem}</p>
      <p>{value.bus_type}</p>
      <p>{Math.round(parseFloat(value.distance) / 1000)}km</p>
      <p>{toHoursAndMinutes(parseFloat(value.duration))}</p>
      <button onClick={handleClick}>Đặt vé</button>
    </div>
  )
}
