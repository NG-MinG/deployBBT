import React from 'react';
import PaymentCertificate from '../../assets/images/Footer/payment_cert.png';
import Momo from '../../assets/images/Footer/momo.png';
import Zalo from '../../assets/images/Footer/zalo.png';
import Cert from '../../assets/images/Footer/cert.png';

import classes from './Footer.module.css';

const Footer = () => {
    return <footer className={classes.footer}>
        <div className={classes.footer_main}>
            <div className={classes.footer_content}>
                <strong>Về chúng tôi</strong>
                <div className={classes.footer_nav}>
                    <a href='/about'>Giới thiệu về BTB</a>
                    <a href='#news'>Tin tức</a>
                    <a href='#contact'>Liên hệ</a>
                </div>
            </div>
            <div className={classes.footer_content}>
                <strong>Hỗ trợ</strong>
                <div className={classes.footer_nav}>
                    <a href='#help_booking'>Hướng dẫn đặt xe</a>
                    <a href='#help_payment'>Hướng dẫn thanh toán</a>
                    <a href='#questions'>Câu hỏi thường gặp</a>
                    <a href='#searching_order'>Tra cứu vé đã đặt</a>
                </div>
            </div>
            <div className={classes.footer_content}>
                <strong>Chính sách</strong>
                <div className={classes.footer_nav}>
                    <a href='#policy'>Điều khoản sử dụng</a>
                    <a href='#info_policy'>Chính sách bảo mật thông tin</a>
                    <a href='#payment_policy'>Chính sách bảo mật thanh toán</a>
                    <a href='#qa_policy'>Chính sách và quy trình giải quyết tranh chấp, khiếu nại</a>
                </div>
            </div>
            <div className={classes.footer_content}>
                <strong>Thanh toán</strong>
                <img className={classes.cert} width={190} alt='credit_cert' src={PaymentCertificate} />
                <div className={classes.payment_method}>
                    <img src={Momo} alt='momo' />
                    <img src={Zalo} alt='zalo' />
                </div>
            </div>
            <div className={classes.footer_content}>
                <strong>&nbsp;</strong>
                <img className={classes.cert} width={160} src={Cert} alt='certificate' />
            </div>
        </div>
        <div className={classes.footer_foot}>
            <strong>Công ty TNHH Thương Mại Dịch Vụ Bus booking ticket</strong>
            <div>Website: <a href='/'>https://busticketbooking.com</a></div>
            <div>Bản quyền © 2023 thuộc về bus ticket booking</div>
        </div>
    </footer>
};

export default Footer;