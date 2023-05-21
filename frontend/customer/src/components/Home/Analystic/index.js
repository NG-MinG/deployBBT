import React from 'react';

import classes from './Analystic.module.css';
import { ReactComponent as SwapIcon } from '../../../assets/svg/SearchForm/swap.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faGasPump, faMapLocationDot, faMedal, faUsers } from '@fortawesome/free-solid-svg-icons';

const Analystic = (props) => {

    return <div className={classes.analys_container}>
        <div className={classes.analys_header}>
            <div className={classes.line}></div>
            <div className={classes.analys_heading}>
                <h1>Bus ticket booking</h1>
                <div className={classes.analys_des}>
                    <span>TP.HCM</span>
                    <SwapIcon />
                    <span>MIỀN TÂY</span>
                </div>
            </div>
            <div className={classes.line}></div>
        </div>
        <div className={classes.analys_main}>
            <div className={classes.main_item}>
                <FontAwesomeIcon icon={faMapLocationDot} />
                <b>30+</b>
                <b className={classes.main_item_details}>Hơn 30 Tỉnh Thành <br /> Miền Tây Nam Bộ</b>
            </div>
            <div className={classes.sub_wrapper}>
                <div className={classes.sub_item}>
                    <div className={classes.analys_number}>
                        <b>100.K+</b>
                        <FontAwesomeIcon icon={faUsers} />
                    </div>
                    <div className={classes.analys_details}>
                        Hơn 100K khách hàng tin tưởng sử dụng
                    </div>
                </div>
                <div className={classes.sub_item}>
                    <div className={classes.analys_number}>
                        <b>200+</b>
                        <FontAwesomeIcon icon={faBusSimple} />
                    </div>
                    <div className={classes.analys_details}>
                        Hơn 200 chuyến xe di chuyển mỗi ngày
                    </div>
                </div>
                <div className={classes.sub_item}>
                    <div className={classes.analys_number}>
                        <b>40+</b>
                        <FontAwesomeIcon icon={faGasPump} />
                    </div>
                    <div className={classes.analys_details}>
                        Hơn 40 nhà xe rải rác trên khắp các tỉnh miền tây
                    </div>
                </div>
                <div className={classes.sub_item}>
                    <div className={classes.analys_number}>
                        <b>3+</b>
                        <FontAwesomeIcon icon={faMedal} />
                    </div>
                    <div className={classes.analys_details}>
                        Chứng nhận đạt chuẩn đảm bảo an toàn trong lưu thông
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Analystic;