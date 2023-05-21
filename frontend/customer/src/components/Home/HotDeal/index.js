import React from 'react';

import classes from './HotDeal.module.css';

const HotDeal = () => {
    return <div className={classes.hot_deal}>
        <h1>Các ưu đãi nổi bật</h1>
        <div className={classes.more_deal}>
            <a className={classes.more_deal_btn} href='#more_deal'>Xem tất cả</a>
        </div>
        <div className={classes.deal_wrapper}>
            <a href='#deal' className={classes.deal_card}>
                <div className={classes.deal_card_img}>
                    <img src='https://storage.googleapis.com/vex-config/cms-tool/post/images/137/img_card.png' alt='deal_1' />
                </div>
                <div className={classes.deal_card_content}>
                    Tổng hợp chương trình khuyến mãi trong tháng
                </div>
            </a>
            <a href='#deal' className={classes.deal_card}>
                <div className={classes.deal_card_img}>
                    <img src='https://storage.googleapis.com/vex-config/cms-tool/post/images/166/img_card.png' alt='deal_1' />
                </div>
                <div className={classes.deal_card_content}>
                    Giới thiệu bạn mới - Nhận quà khủng từ Bus Booking Ticket
                </div>
            </a>
            <a href='#deal' className={classes.deal_card}>
                <div className={classes.deal_card_img}>
                    <img src='https://storage.googleapis.com/vex-config/cms-tool/post/images/152/img_card.png' alt='deal_1' />
                </div>
                <div className={classes.deal_card_content}>
                    Ưu đãi bất ngờ khi đặt xe
                </div>
            </a>
        </div>
    </div>
};

export default HotDeal; 