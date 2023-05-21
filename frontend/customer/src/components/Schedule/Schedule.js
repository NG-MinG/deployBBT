import React, { useEffect, useState } from 'react'
import styles from './Schedule.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightLong, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ScheduleItem from './ScheduleItem/ScheduleItem'
import axios from 'axios'

export default function Schedule() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + '/schedule/schedules').then((res) => {
      // setData(res.data.data.user)
      // console.log(res.data.data.schedules)
      setData(res.data.data.schedules)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const [departureSearch, setDepartureSearch] = useState('')

  const handleOnChangeDeparture = (e) => {
    setDepartureSearch(e.target.value)
    axios.patch(process.env.REACT_APP_API_HOST + '/schedule/searchSchedule', { search: e.target.value }).then((res) => {
      setData(res.data.data.schedule_filter)
    }).catch(error => {
      console.log(error)
    })
  }


  const searchHandle = () => {
    axios.patch(process.env.REACT_APP_API_HOST + '/schedule/searchSchedule', { search: departureSearch }).then((res) => {
      setData(res.data.data.schedule_filter)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      searchHandle()
    }
  };

  return (
    <div className={styles.Schedule}>
      <div className={styles['main-content']}>
        <p className={styles.searchTitle}>Tìm chuyến xe</p>
        <div className={styles.searches}>
          <div className={styles.search}>
            <input onKeyDown={(e) => handleKeyUp(e)} onChange={handleOnChangeDeparture} placeholder="Nhập địa điểm cần tìm..." />
            <FontAwesomeIcon onClick={searchHandle} icon={faMagnifyingGlass} style={{ color: '#A2ABB3', fontSize: '2.2rem', position: 'absolute', top: '25%', right: '4%', cursor: 'pointer' }} />
          </div>
          {/* <FontAwesomeIcon icon={faArrowRightLong} style={{ color: '#417DD8', fontSize: '4.5rem' }} />
          <div className={styles.search}>
            <input onChange={handleOnChangeArrival} placeholder="Nhập điểm đến..." />
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#A2ABB3', fontSize: '2.2rem', position: 'absolute', top: '25%', right: '4%', cursor: 'pointer' }} />
          </div> */}
        </div>
        {data.length > 0 ? <div className={styles.table}>
          <div className={styles.header}>
            <p>Tuyến xe</p>
            <p>Loại xe</p>
            <p>Quãng đường</p>
            <p>Thời gian hành trình</p>
          </div>
          <div className={styles.content}>
            <p>Đi từ TP.Hồ Chí Minh đến</p>
            <div className={styles.fromHCM}>
              {data.map((value, index) => (
                value.departure_city === "TP.Hồ Chí Minh" && <ScheduleItem key={index} type={"from"} diem={value.arrival_city} value={value} />
              ))}
            </div>
            <p>Đi đến TP.Hồ Chí Minh từ</p>
            <div className={styles.toHCM}>
              {data.map((value, index) => (
                value.arrival_city === "TP.Hồ Chí Minh" && <ScheduleItem key={index} type={"to"} diem={value.departure_city} value={value} />
              ))}
            </div>
          </div>
        </div> : <div style={{ marginTop: '2.5rem', marginBottom: '60rem', fontSize: '2.1rem' }}>
          Không có kết quả...
        </div>}
      </div>
    </div>
  )
}
