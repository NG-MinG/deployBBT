import React, { useEffect, useState } from 'react'
import styles from './MyTicket.module.css'
import MyTicketItem from './MyTicketItem/MyTicketItem'
import axios from 'axios'
import { auth } from '../../../utilities/storage'

export default function MyTicket() {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + "/user/my-ticket", { headers: { Authorization: 'Bearer ' + auth.getAccessToken() } }).then(res => {
      console.log(res.data.data)
      setTickets(res.data.data)
    }).catch(error => {
      console.log(error)
    })
  }, [])


  return (
    <div className={styles.MyTicket}>
      {tickets.length > 0 && <div className={styles.listTicket}>
        {
          tickets.map((item, index) => (
            <MyTicketItem key={item.id} value={item} />
          ))
        }
      </div>}
    </div>
  )
}
