import React, { useEffect, useState } from 'react';

import calendar_bg from '../../assets/images/calendar/bg.jpg';

import classes from './Calendar.module.css';
import DayRow from './DayRow';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Calendar = ({ onChange }) => {
    const [currentDate, setDate] = useState(new Date());

    const chunks = (a, size) =>
    Array.from(
        new Array(Math.ceil(a.length / size)),
        (_, i) => a.slice(i * size, i * size + size)
    );

    useEffect(() => {
        onChange(`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`);
    }, [onChange, currentDate]);

    const makeDayList = (dayLength) => Array.from({ length: dayLength - 1 + 1, }, (_, i) => 1 + i );
    
    const addMonths = (date, months) => {
        date.setMonth(date.getMonth() + months);
        date.setDate(1);
      
        return date;
    };

    const increase_month = () => setDate(new Date(addMonths(currentDate, 1)));
    const decrease_month = () => setDate(new Date(addMonths(currentDate, -1)));

    const updateDate = (day) => setDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    
    const TheDayFirstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const IndexFirstDayOfMonth = TheDayFirstDayOfMonth === 0 ? 8 : TheDayFirstDayOfMonth + 1;

    const TheLastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const day_list = makeDayList(TheLastDayOfMonth);

    const IndexLastDayOfWeek = 8;

    const init_first_row = [];

    for (let i = 1; i < IndexFirstDayOfMonth - 1; ++i)
        init_first_row.push(-1);

    const first_row = [...init_first_row , ...makeDayList(IndexLastDayOfWeek - IndexFirstDayOfMonth + 1)];

    day_list.splice(0, IndexLastDayOfWeek - IndexFirstDayOfMonth + 1);

    // const num_row = Math.ceil((TheLastDayOfMonth - (IndexLastDayOfWeek - IndexFirstDayOfMonth + 1)) / 7) + 1;
    const newDayArr = chunks(day_list, 7);
    newDayArr.unshift(first_row);

    const today = new Date();
    const todayDate = today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear() ? today.getDate() : -1;

    const ops = {year: 'numeric'};
    ops.month = ops.day = '2-digit';

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    console.log(new Date().toDateString());

    return <div className={classes.calendar}>
        <div className={classes.image}>
            <div className={classes.elegant_calendar}>
                <span className={classes.title}>TODAY</span>
                <span className={classes.month_year}>{
                    monthNames[today.getMonth()] + ' - ' + today.getFullYear()
                }</span>
                <span className={classes.day_cur}>
                    {today.getDate()}
                </span>
            </div>
            <img src={calendar_bg} alt="calendar_bg" />
        </div>
        <div className={classes.calendar_group}>
            <div className={classes.calendar_controls}>
                <button type='button' onClick={decrease_month}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span>{ new Intl.DateTimeFormat('vi', ops).format(currentDate).replaceAll('/', ' / ') }</span>
                <button type='button' onClick={increase_month}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <table className={classes.calendar_table}>
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
                </thead>
                <tbody>
                    {  newDayArr.map((el, index) => <DayRow key={`d${index}`} list_day={el} updateDate={updateDate} classes={classes} active={todayDate} current_date={currentDate.getDate()} />) }
                </tbody>
            </table>
        </div>
    </div>
};

export default Calendar;