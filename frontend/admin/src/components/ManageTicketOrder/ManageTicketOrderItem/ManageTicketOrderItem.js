import React, { useEffect, useState } from 'react'
import styles from './ManageTicketOrderItem.module.css'
import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ManageTicketOrderItem(props) {
  const navigate = useNavigate()
  const editData = () => {
    navigate("edit/" + props.value.id, { state: props.value })
  }
  const [stage, setStage] = useState(props.value.stage)
  // console.log(props.value.date)
  // const result1 = new Date(props.value.date).toLocaleDateString('en-GB');
  // let dateObject = new Date();


  const handleStage = () => {
    if (stage === "Đang xử lí") {
      axios.post(process.env.REACT_APP_API_HOST + '/admin/ticket-history/updateStage', { id: props.value.id, stage: "Đã đặt" }).then((res) => {
        // console.log(res.data.data.ticketHistory)
        setStage("Đã đặt")
      }).catch(error => {
        console.log(error)
      })
    }
    else if (stage === "Đã đặt") {
      axios.post(process.env.REACT_APP_API_HOST + '/admin/ticket-history/updateStage', { id: props.value.id, stage: "Đã huỷ" }).then((res) => {
        // console.log(res.data.data.ticketHistory)
        setStage("Đã huỷ")
      }).catch(error => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    setStage(props.value.stage)
  }, [props.value.stage])

  return (
    <div className={styles.ManageTicketOrderItem}>
      <p>{props.index}</p>
      <p>{props.value.guestInfo.name}</p>
      <p>{props.value.guestInfo.phoneNumber}</p>
      <p>{props.value.departure_city} - {props.value.arrival_city}</p>
      <p>{props.value.time} {props.value.date}</p>
      <button onClick={handleStage} className={`${stage === 'Đã đặt' ? styles.green : ""} ${stage === 'Đã huỷ' ? styles.red : ""}`}>{stage}</button>
      <FontAwesomeIcon onClick={() => props.showDetail(props.value.id)} className={styles.icon} icon={faEye} style={{ color: '#1F84BD' }} />
      {stage !== 'Đã huỷ' && <FontAwesomeIcon onClick={editData} className={styles.icon} icon={faPenToSquare} style={{ color: '#1F84BD' }} />}
      <FontAwesomeIcon onClick={() => props.deleteItem(props.value.id)} className={styles.icon} icon={faTrashCan} style={{ color: '#FB6C6C' }} />
    </div>
  )
}
