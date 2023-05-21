import React, { useEffect, useState } from 'react'
import styles from './Branch.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import BranchItem from './BranchItem/BranchItem'
import axios from 'axios'

export default function Branch() {

  const [branches, setBranches] = useState([])

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + '/station/stations').then((res) => {
      // setData(res.data.data.user)
      setBranches(res.data.data.stations)
      // setData(res.data.data.schedules)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const [searchText, setSearchText] = useState('')
  const searchTextHandle = (e) => {
    setSearchText(e.target.value)
    axios.patch(process.env.REACT_APP_API_HOST + '/station/searchStations', { search: e.target.value }).then((res) => {
      setBranches(res.data.data.stations_filter)
      console.log(res.data.data.stations_filter)
    }).catch(error => {
      console.log(error)
    })
  }


  const searchHandle = () => {
    axios.patch(process.env.REACT_APP_API_HOST + '/station/searchStations', { search: searchText }).then((res) => {
      setBranches(res.data.data.stations_filter)
      console.log(res.data.data.stations_filter)
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
    <div className={styles.Branch}>
      <div className={styles['main-content']}>
        <p className={styles.title}>Chi nhánh của chúng tôi</p>
        <div className={styles.search}>
          <input onKeyDown={(e) => handleKeyUp(e)} onChange={searchTextHandle} placeholder="Tìm chi nhánh..." />
          <FontAwesomeIcon onClick={searchHandle} icon={faMagnifyingGlass} style={{ color: '#A2ABB3', fontSize: '2.2rem', marginLeft: '-3.5rem', cursor: 'pointer' }} />
        </div>
        {branches.length > 0 ? <div className={styles.table}>
          {branches.map((value, index) => (
            <BranchItem key={index} value={value} />
          ))}
        </div> : <div style={{ marginTop: '2.5rem', marginBottom: '60rem', fontSize: '2.1rem' }}>
          Không có kết quả...
        </div>}
      </div>
    </div>
  )
}
