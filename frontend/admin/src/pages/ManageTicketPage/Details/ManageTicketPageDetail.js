import React, { useEffect, useState } from 'react';

import classes from './ManageTicketPageDetail.module.css';
import AnalystCard from '../../../components/Dashboard/AnalystCard';
import ChairLayout from '../../../components/BusLayout/ChairLayout/ChairLayout';
import SleeperLayout from '../../../components/BusLayout/SleeperLayout/SleeperLayout';
import LimousineLayout from '../../../components/BusLayout/LimousineLayout/LimousineLayout';
import TicketCard from '../../../components/TicketCard/TicketCard';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toDateFormat, toPriceFormat } from '../../../utils/format';

const ManageTicketPageDetail = () => {

    const ticketId = useParams().id;
    const [ticket, setTicket] = useState({});
    const [ticketHistory, setTicketHistory] = useState([]);

    const [chooseTicket, setChooseTicket] = useState({
        id: '',
        name: '',
        choosenSeats: []
    });

    useEffect(() => {
    
        axios.get(`${process.env.REACT_APP_API_HOST}/admin/ticket-managing/details/${ticketId}`)
        .then((res) => {
            setTicket(res.data.ticket);
            setTicketHistory(res.data.ticketHistory);
        })
        .catch(err => console.log(err));
    
    }, [ticketId]);

    const booked_seats = Object.keys(ticket).length ? ticket.booked_seats.length < 10 ? `0${ticket.booked_seats.length}` : ticket.booked_seats.length : '--';
    const total_ticket = Object.keys(ticket).length ? ticket.total_seats : '--';

    const total_price = Object.keys(ticket).length ? toPriceFormat(ticket.booked_seats.length * ticket.price) : '--';
    const num_cus = Array.from(new Set(ticketHistory.map(el => el.guestInfo.phoneNumber.trim()))).length;
    const customers = num_cus >= 0 ? num_cus < 10 ? `0${num_cus}` : num_cus : '--';

    const num_postpone = ticketHistory.filter(el => el.stage.toLowerCase().indexOf('đã huỷ')).length;
    const postpones = num_postpone >= 0 ? num_postpone < 10 ? `0${num_postpone}` : num_postpone : '--';

    console.log(chooseTicket);


    return (<>
        <div className={classes.main_content}>
            <div className={classes.list_analyst}>
                <AnalystCard title='SỐ VÉ BÁN RA' value={`${booked_seats} / ${total_ticket} VÉ`} yellow className={classes.analyst_card} />
                <AnalystCard title='DOANH THU' value={`${total_price}đ`} blue className={classes.analyst_card} />
                <AnalystCard title='KHÁCH HÀNG' value={`${customers}`} green className={classes.analyst_card} />
                <AnalystCard title='SỐ VÉ BỊ HỦY / TRẢ' value={`${postpones} VÉ`} red className={classes.analyst_card} />
            </div>
            <div className={classes.ticket_info}>
                <div className={classes.ticket_info_left}>
                    <TicketCard ticket={ticket} />
                    <table className={classes.ticket_info_table}>
                        <thead>
                            <th>Thời gian</th>
                            <th>Số điện thoại</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </thead>
                        <tbody>
                            {ticketHistory && ticketHistory.length ? ticketHistory.map(el => (
                                <tr key={el._id} className={(el._id.toString() === chooseTicket.id) ? classes.active_row : ''} onClick={() => {setChooseTicket({ id: el._id, name: el.guestInfo.name, choosenSeats: [...el.chosen_seats] })}}>
                                    <td>
                                        <div>{ el.time_start.split(':').join(' : ') }</div>
                                        <div>{ toDateFormat(new Date(el.date.split('/').reverse().join('-')), ' / ') }</div>
                                    </td>
                                    <td>
                                        {el.guestInfo.phoneNumber}
                                    </td>
                                    <td>{ el.number_of_seats } vé</td>
                                    { (el.stage.toLowerCase()) === 'đã huỷ'
                                        ? <td className={classes.red_price}>- { toPriceFormat(el.total_price ) }đ</td>
                                        : <td className={classes.green_price}>+ { toPriceFormat(el.total_price) }đ</td>
                                    }
                                </tr>
                            )) : <tr><td colSpan={4}>Không có dữ liệu</td></tr>}
                        </tbody>
                    </table>
                </div>
                <div className={classes.ticket_info_seats}>
                    <div className={classes.seats_title}>
                        <span>Tầng dưới</span>
                        <span>Tầng trên</span>
                    </div>
                    { Object.keys(ticket).length > 0 && ticket.bus_type.toLowerCase() === 'ghế' && <ChairLayout hiddenHeader greenColor={true} classes={classes} bookedSeats={ticket.booked_seats.filter(el => !chooseTicket.choosenSeats.includes(el) )} choosingSeats={chooseTicket.choosenSeats} /> }
                    { Object.keys(ticket).length > 0 && ticket.bus_type.toLowerCase() === 'giường' && <SleeperLayout hiddenHeader greenColor={true} bookedSeats={ticket.booked_seats.filter(el => !chooseTicket.choosenSeats.includes(el) )} choosingSeats={chooseTicket.choosenSeats} /> }
                    { Object.keys(ticket).length > 0 && ticket.bus_type.toLowerCase() === 'limousine' && <LimousineLayout hiddenHeader greenColor={true} bookedSeats={ticket.booked_seats.filter(el => !chooseTicket.choosenSeats.includes(el) )} choosingSeats={chooseTicket.choosenSeats} /> }
                    <div className={classes.description_status}>
                        <div>
                            <span className={classes.none_color}></span>
                            <span>Trống</span>
                        </div>
                        <div>
                            <span className={classes.order_color}></span>
                            <span>Đã đặt</span>
                        </div>
                        <div>
                            <span className={classes.choose_color}></span>
                            <span>{chooseTicket.name}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ManageTicketPageDetail;