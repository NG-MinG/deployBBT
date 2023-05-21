import React from "react";

import { ReactComponent as LocationIcon } from "../../assets/svg/TicketCard/locations.svg";
import classes from './TicketCard.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import { faBusSimple, faCouch } from "@fortawesome/free-solid-svg-icons";
import { toDateFormat, toPriceFormat } from "../../utils/format";
 
const TicketCard = ({ ticket }) => {
    return (Object.keys(ticket).length > 0) && (
        <div className={classes.ticket_card}>
            <div className={classes.ticket_card_heading}>
                <span className={classes.ticket_card_title}>
                    {ticket.departure_city} - {ticket.arrival_city}
                </span>
                <span className={classes.ticket_info_time}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{ticket.departure_time.split(':').join('h')} - {ticket.arrival_time.split(':').join('h')}</span>
                </span>
            </div>
            <div className={classes.ticket_info_details}>
                <div className={classes.ticket_info_location}>
                    <LocationIcon />
                    <div className={classes.ticket_info_trips}>
                        <span>{ticket.departure_depot}</span>
                        <span className={classes.ticket_info_remaining}>{(Math.trunc(ticket.distance / 1000))}km - {(Math.trunc(17940 / 60**2))} tiếng</span>
                        <span>{ticket.arrival_depot}</span>
                    </div>
                </div>  
                <div className={classes.ticket_info_right}>
                    <div className={classes.ticket_info_bus}>
                        <span><FontAwesomeIcon icon={faCouch} /> Còn { ticket.total_seats - ticket.booked_seats.length } chỗ</span>
                        <span><FontAwesomeIcon icon={faBusSimple} /> { ticket.bus_type }</span>
                    </div>
                    <b className={classes.ticket_info_price}>{ toPriceFormat(ticket.price) }đ</b>
                </div>
            </div>
        </div>
    );
};

export default TicketCard;