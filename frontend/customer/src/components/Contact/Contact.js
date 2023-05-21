import React from 'react'
import MailIcon from "../../assets/svg/Contact/mail.svg";
import AddressIcon from "../../assets/svg/Contact/address.svg";
import PhoneIcon from "../../assets/svg/Contact/phone.svg";
import styles from "./Contact.module.css"


export default function Contact() {
  const formData = [
    'Họ tên',
    'Số điện thoại', 
    'Email', 
    'Tiêu đề']

  return (
    <div>
      <h2 className={styles["header"]}>LIÊN HỆ BUS TICKET BOOKING</h2>
      <div className={styles["container"]}>
        <div className={styles["info-container"]}>
          <div className={styles["sub-info"]}>
            <h2>Bus Booking Ticket</h2>
            <p>Chúng tôi sẵn lòng nghe ý kiến từ bạn. Bộ phận chăm sóc khách hàng chúng tôi luôn trực để phản hồi bạn sớm nhất.</p>
            <div className={styles["sub-element"]}>
              <img src={MailIcon} />
              <div className={styles["text-element"]}>
                <h4>Mail</h4>
                <p>example1@gmail.com</p>
                <p>example2@student.hcmus.edu.vn</p>
              </div>
            </div>
            <div className={styles["sub-element"]}>
              <img src={AddressIcon} />
              <div className={styles["text-element"]}>
                <h4>Địa chỉ</h4>
                <p>Chung cư 24/16, đường Võ Oanh, P.25, quận Bình Thạnh</p>
              </div>
            </div>
            <div className={styles["sub-element"]}>
              <img src={PhoneIcon} />
              <div className={styles["text-element"]}>
                <h4>Số điện thoại</h4>
                <p>0976975548</p>
                <p>0903861515</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["contact-container"]}>
          <div className={styles["sub-contact"]}>
            <h2>Thông tin liên hệ</h2>
            <p className={styles["sub-contact-content"]}>Cảm ơn bạn đã ghé thăm chúng tôi. Nếu bạn muốn nhận thông tin từ chúng tôi dễ dàng, vui lòng điền form dưới đây</p>
            <p className={styles["underline-css"]}>______________________</p>
            <div className={styles["form-data-container"]}>
              {formData.map((data)=>(
                <div className={styles["label-input"]}>
                  <h4>{data}</h4>
                  <input></input>   
                </div>
              ))}
              <div className={styles["label-input"]}>
                  <h4>Nội dung</h4>
                  <textarea></textarea>   
              </div>
            </div>
          </div>
          <div className={styles["button-submit"]}>
            <a>Xác nhận và gửi</a>
          </div>
        </div>
      </div>
    </div>
  )
}
