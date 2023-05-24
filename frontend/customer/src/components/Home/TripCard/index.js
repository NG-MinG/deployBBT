import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './TripCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft, faLocationDot, faTicket } from '@fortawesome/free-solid-svg-icons';

const TripCard = ({ trip }) => {
    const navigate = useNavigate();
    
    return (
        <div onClick={() => { navigate(`/ticket-booking?departure_city=${trip.departure_city}&arrival_city=${trip.arrival_city}&date=${new Date().toISOString().split('T')[0]}`) }} className={classes.trip_card}>
            <div className={classes.trip_card_img}>
                <img src={trip.img} alt={trip.title} />
            </div>
            <div className={classes.trip_card_content}>
                <strong className={classes.trip_card_title}>{trip.title}</strong>
                <div className={classes.trip_card_info}>
                    <div className={classes.trip_card_info_item}>
                        <span><FontAwesomeIcon icon={faLocationDot} /></span>
                        <span>{trip.distance}km</span>
                    </div>
                    <div className={classes.trip_card_info_item}>
                        <span><FontAwesomeIcon icon={faClockRotateLeft} /></span>
                        <span>{trip.duration}h</span>
                    </div>
                    <div className={classes.trip_card_info_item}>
                        <span><FontAwesomeIcon icon={faTicket} /></span>
                        <span>{trip.price}đ</span></div>
                </div>
            </div>
        </div>
    );
};

export default TripCard;