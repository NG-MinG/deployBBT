import React, { useEffect, useState } from 'react';

import classes from './Activities.module.css';
import axios from 'axios';
import { toPriceFormat } from '../../../utils/format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Activities = () => {

    const [activities_list, setActivities] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-history/ticketHistory`)
        .then((res) => {
            const currentDate = new Date();
            // setActivities(res.data.data.ticketHistory);
            setActivities(res.data.data.ticketHistory.filter(el => el.date === `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`));
        })
        .catch(err => console.log(err));
    }, []);

    // const activities_list = [
    //     {
    //         name: 'Jonas Schemdsakdkwad',
    //         from: 'Thành phố Hồ Chí Minh',
    //         to: 'Bến Tre',
    //         time: '5h',
    //         seat: '23',
    //         price: '100.000đ',
    //         date: '14 - 03 - 2022'
    //     },
    //     {
    //         name: 'Jonas Schemdsakdkwad',
    //         from: 'Thành phố Hồ Chí Minh',
    //         to: 'Bến Tre',
    //         time: '5h',
    //         seat: '23',
    //         price: '100.000đ',
    //         date: '14 - 03 - 2022'
    //     },
    //     {
    //         name: 'Jonas Schemdsakdkwad',
    //         from: 'Thành phố Hồ Chí Minh',
    //         to: 'Bến Tre',
    //         time: '5h',
    //         seat: '23',
    //         price: '100.000đ',
    //         date: '14 - 03 - 2022'
    //     },
    //     {
    //         name: 'Jonas Schemdsakdkwad',
    //         from: 'Thành phố Hồ Chí Minh',
    //         to: 'Bến Tre',
    //         time: '5h',
    //         seat: '23',
    //         price: '100.000đ',
    //         date: '14 - 03 - 2022'
    //     },
    //     {
    //         name: 'Jonas Schemdsakdkwad',
    //         from: 'Thành phố Hồ Chí Minh',
    //         to: 'Bến Tre',
    //         time: '5h',
    //         seat: '23',
    //         price: '100.000đ',
    //         date: '14 - 03 - 2022'
    //     }
    // ]

    return <div className={classes.activities} style={{ width: '41%' }}>
        <div className={classes.header}>
            <b>Hoạt động gần đây</b>
        </div>
        <div className={classes.main_content} style={{ width: '100%' }}>
        {
            activities_list && activities_list.length ? activities_list.map((item, index) => {
                return <div key={`activity_${index}`} className={classes.sub_item}>
                    <div className={classes.details}>
                        <b>{item.guestInfo.name}</b>
                        <span>{item.departure_city} <FontAwesomeIcon icon={faArrowRight} /> {item.arrival_city}</span>
                        <span>{ item.time.split(':').join('h') } - Ghế { item.chosen_seats.join(', ') } - { toPriceFormat(item.total_price) }đ</span>
                        <i>{ item.date.split('/').join(' - ') }</i>
                    </div>
                    <div className={classes.control}>
                        <button className={(item.stage === 'Đang xử lí') ? classes.processing : ((item.stage === 'Đã huỷ') ? classes.canceled : '')} type='button'>{ item.stage }</button>
                    </div>
                </div>
            }) : 
            <div className={classes.sub_item} >
                <div className={classes.details}>
                    Không có dữ liệu
                </div>
                <div className={classes.control}>
                </div>
            </div>
        }
        </div>
    </div>
};

export default Activities;