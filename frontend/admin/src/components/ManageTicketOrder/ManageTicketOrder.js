import styles from "./ManageTicketOrder.module.css";
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ManageTicketOrderItem from "./ManageTicketOrderItem/ManageTicketOrderItem";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import axios from "axios";
import { toDateFormat, toPriceFormat } from "../../utils/format";



const ManageTicketOrder = () => {

  const [ticketHistory, setTicketHistory] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + '/admin/ticket-history/ticketHistory').then((res) => {
      // console.log(res.data.data.ticketHistory)
      setTicketHistory(res.data.data.ticketHistory)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const socket = io(process.env.REACT_APP_ipAddress)

  useEffect(() => {
    socket.on("book-ticket", (data) => {
      setTicketHistory(prev => [data, ...prev])
    });
  }, [])

  const [detail, setDetail] = useState(false)
  const [currentData, setCurrentData] = useState()
  const navigate = useNavigate()

  const showDetail = (id) => {
    axios.get(process.env.REACT_APP_API_HOST + '/admin/ticket-history/ticketHistory').then((res) => {
      setCurrentData(res.data.data.ticketHistory.filter(el => el.id === id)[0])
      setDetail(true)
    }).catch(error => {
      console.log(error)
    })
  }

  const editData = () => {
    navigate("edit/" + currentData.id, { state: currentData })
  }

  // const [search, setSearch] = useState()
  // const handleChangeSearch = (e) => {
  //   setSearch(e.target.value)
  // }

  const handleSearch = (e) => {
    axios.patch(process.env.REACT_APP_API_HOST + '/admin/ticket-history/searchTicketHistory', { search: e.target.value }).then((res) => {
      setTicketHistory(res.data.data.ticket_history_filter)
    }).catch(error => {
      console.log(error)
    })
  }

  // const handleKeyUp = (e) => {
  //   if (e.key === "Enter") {
  //     handleSearch()
  //   }
  // };

  const deleteItem = (id) => {
    axios.patch(process.env.REACT_APP_API_HOST + '/admin/ticket-history/deleteItem', { id: id }).then((res) => {
      setTicketHistory(prev => prev.filter(val => val.id !== id))
    }).catch(error => {
      console.log(error)
    })
  }


  return <div className={styles.ManageTicketOrder}>
    <div className={styles['main-content']}>
      {/* <p className={styles.title}>vé xe đã đặt</p> */}
      <div className={styles.search}>
        <input onChange={handleSearch} placeholder="Tìm kiếm..." />
        <FontAwesomeIcon onClick={handleSearch} className={styles.icon} icon={faMagnifyingGlass} style={{ color: '#737B83', fontSize: '2.1rem' }} />
      </div>
      <div className={styles.table}>
        <div className={styles.header}>
          <p>#</p>
          <p>Tên</p>
          <p>Số điện thoại</p>
          <p>Tuyến</p>
          <p>Thời gian đặt vé</p>
          <p>Trạng thái</p>
        </div>
        <div className={styles.listItem}>
          {ticketHistory.map((value, index) => (
            <ManageTicketOrderItem key={index} index={index + 1} value={value} showDetail={showDetail} deleteItem={deleteItem} />
          ))}
        </div>
      </div>
      {detail && <div className={styles.detail}>
        <div onClick={() => setDetail(false)} className={styles.overlay}>
        </div>
        <div className={styles.popup}>
          <div className={styles["user-information"]}>
            <p style={{ fontWeight: '600', fontSize: '1.7rem' }}>Thông tin khách hàng</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p>Tên: {currentData.guestInfo.name}</p>
              <p>Số điện thoại: {currentData.guestInfo.phoneNumber}</p>
            </div>
            <p>Thời gian đặt vé: {currentData.time} {currentData.date}</p>
          </div>
          <div className={styles["ticket-information"]}>
            <p style={{ fontWeight: '600', fontSize: '1.7rem' }}>Thông tin vé</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: '18rem', fontWeight: '500' }}>Thời gian khởi hành:</p>
              <p style={{}}>{currentData.time_start} {new Date(currentData.date_start).toLocaleDateString('en-GB').toString()}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: '18rem', fontWeight: '500' }}>Tuyến: </p>
              <p style={{}}>{currentData.departure_city} &rarr; {currentData.arrival_city}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ minWidth: '18rem', fontWeight: '500' }}>Số ghế: </p>
              <div style={{ width: '100%', display: "flex", alignItems: "center" }}>
                {currentData.chosen_seats.map((value, index) => (
                  <p style={{}} >{value} &nbsp;</p>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ width: '18rem', fontWeight: '500' }}>Trạng thái: </p>
              <p style={{ color: '#D2712B', fontWeight: '500' }} className={`${currentData.stage === 'Đã đặt' ? styles.green : ""} ${currentData.stage === 'Đã huỷ' ? styles.red : ""}`}>{currentData.stage}</p>
            </div>
            <div style={{ display: "flex" }}>
              <p style={{ minWidth: '18rem', fontWeight: '500' }}>Điểm nhận vé:</p>
              <p style={{ textAlign: 'left' }}>{currentData.depot_address}</p>
            </div>
          </div>
          <div className={styles.bottom}>
            <p style={{ color: "#FF0000", fontSize: '21px', fontWeight: '600' }}>Tổng tiền: {toPriceFormat(currentData.total_price)}đ</p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button onClick={() => setDetail(false)} className={styles.closeIcon}>Đóng</button>
              {currentData.stage !== 'Đã huỷ' && <button onClick={editData} className={styles.editBtn}>Sửa</button>}
            </div>
          </div>
        </div>
      </div>}
    </div>
  </div>
}

export default ManageTicketOrder;