import React, { useEffect, useState } from 'react'
import styles from './Information.module.css'
import axios from 'axios'
import { auth } from '../../../utilities/storage'
import user_avatart from '../../../assets/images/User/user_avatart.png'
export default function Information() {

  const [information, setInformation] = useState({})

  console.log(auth.getAccessToken())
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + '/user/userProfile', { headers: { Authorization: 'Bearer ' + auth.getAccessToken() } }).then((res) => {
      setInformation(res.data.data.user)
      console.log(res.data.data.user)
    }).catch(error => {
      console.log(error)
    })
  }, [])

  return (
    <div className={styles['Information']}>
      <div className={styles['title']}>
        <p>Họ và tên:</p>
        <p>Số điện thoại:</p>
        <p>Email:</p>
        <p>Ngày sinh:</p>
        <p>Giới tính:</p>
        <p>Địa chỉ:</p>
      </div>
      <div className={styles['content']}>
        {information.fullname ? <p>{information.fullname}</p> : <p>&nbsp;</p>}
        {information.phone ? <p>{information.phone}</p> : <p>&nbsp;</p>}
        {information.email ? <p>{information.email}</p> : <p>&nbsp;</p>}
        {information.dob ? <p>{information.dob}</p> : <p>&nbsp;</p>}
        {information.gender ? <p>{information.gender}</p> : <p>&nbsp;</p>}
        {information.address ? <p>{information.address}</p> : <p>&nbsp;</p>}
      </div>
      <div className={styles['avatar']}>
        <img alt="" src={user_avatart} />
      </div>
    </div>
  )
}
