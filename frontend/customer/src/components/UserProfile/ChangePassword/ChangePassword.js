import React, { useState } from 'react'
import styles from './ChangePassword.module.css'
import axios from 'axios'
import { auth } from '../../../utilities/storage'


export default function ChangePassword() {
  const [value, setValue] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [message, setMessage] = useState(' ')

  const handleInput = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    axios.patch(process.env.REACT_APP_API_HOST + '/user/updatePassword', value, { headers: { Authorization: 'Bearer ' + auth.getAccessToken() } }).then((res) => {
      console.log('Successfully!!!')
      setMessage("")

    }).catch(error => {
      setMessage(error.response.data.message)
      console.log(error.response.data.message)
      // let a = error.response.data.message
      // console.log(a)
    })
  }

  return (
    <form className={styles.ChangePassword} onSubmit={handleSubmit}>
      <div className={styles['title']}>
        <p>Mật khẩu hiện tại</p>
        <p>Mật khẩu mới</p>
        <p>Xác nhận mật khẩu mới</p>
      </div>
      <div className={styles['content']}>
        <input onFocus={() => setMessage(" ")} name="currentPassword" onChange={handleInput} type="password" />
        <input onFocus={() => setMessage(" ")} name="newPassword" onChange={handleInput} type="password" />
        <input onFocus={() => setMessage(" ")} name="confirmPassword" onChange={handleInput} type="password" />
      </div>
      <button type='submit'>Lưu</button>
      {message.length > 0 ? <p className={styles['error']}>{message}</p> : <p className={styles['success']}>Successfully!</p>}
    </form>
  )
}
