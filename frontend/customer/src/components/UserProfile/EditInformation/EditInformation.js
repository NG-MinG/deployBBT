import React, { useState, useEffect } from 'react'
import styles from './EditInformation.module.css'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { auth } from '../../../utilities/storage'
import user_avatart from '../../../assets/images/User/user_avatart.png'



export default function EditInformation() {
  const [information, setInformation] = useState({})

  const [nameError, setNameError] = useState(" ");

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_HOST + '/user/userProfile', { headers: { Authorization: 'Bearer ' + auth.getAccessToken() } }).then((res) => {
      setInformation(res.data.data.user)
      // console.log(res.data.data.user)
    }).catch(error => {
      console.log(error)


    })
  }, [])

  const handleSave = (event) => {
    event.preventDefault()

    axios.patch(process.env.REACT_APP_API_HOST + '/user/updateProfile', information, { headers: { Authorization: 'Bearer ' + auth.getAccessToken() } }).then((res) => {
      console.log('Successfully!!!')
      setNameError("")
    }).catch(error => {
      // console.log(error)
      let name_error = error.response.data.message
      setNameError(name_error)
    })
  }

  const handleChangeInput = (e) => {
    console.log(e.target.value)
    setInformation(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form className={styles.EditInformation} onSubmit={handleSave}>
      <div className={styles['title']}>
        <p>Họ và tên:</p>
        <p>Số điện thoại:</p>
        <p>Email:</p>
        <p>Ngày sinh:</p>
        <p>Giới tính:</p>
        <p>Địa chỉ:</p>
      </div>
      <div className={styles['content']}>
        <input onFocus={() => setNameError(" ")} name='fullname' onChange={handleChangeInput} value={information.fullname} />
        <input onFocus={() => setNameError(" ")} name='phone' onChange={handleChangeInput} value={information.phone} />
        <input onFocus={() => setNameError(" ")} name='email' onChange={handleChangeInput} value={information.email} />
        <input onFocus={() => setNameError(" ")} name='dob' onChange={handleChangeInput} value={information.dob} />
        <input onFocus={() => setNameError(" ")} name='gender' onChange={handleChangeInput} value={information.gender} />
        <input onFocus={() => setNameError(" ")} name='address' onChange={handleChangeInput} value={information.address} />
      </div>
      <div className={styles['avatar']}>
        <div className={styles.addIcon}>
          <FontAwesomeIcon icon={faPlus} style={{ color: '#417DD8', fontSize: '3.5rem', cursor: "pointer" }} />
        </div>
        <img alt="" src={user_avatart} />
      </div>
      <button type='submit'>Lưu</button>
      {nameError.length > 0 ? <p className={styles['error']}>{nameError}</p> : <p className={styles['success']}>Lưu thành công!</p>}
    </form>
  )
}
