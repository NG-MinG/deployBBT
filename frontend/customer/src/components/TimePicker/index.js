import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as DropdownIcon } from '../../assets/svg/DatePicker/dropdown.svg';

import classes from './TimePicker.module.css';

const TimePicker = ({className, disable, ...attribute}) => {

    const [date_value, setDate] = useState('');

    const updateDate = (e) => {
        setDate(e.target.value);
    };

    return <div className={classes.date_picker_group}>
        { disable && <div className={classes.disable}></div> }
        <label className={classes.date_picker}>
            <span className={classes.date_picker_icon}>
                <FontAwesomeIcon icon={faCalendarDays} />
            </span>
            <div className={classes.date_group}>
                <input className={classes.input_date} type="date" {...attribute} onChange={updateDate} value={date_value} />
                <span className={classes.drop_icon}>
                    <DropdownIcon />
                </span>
            </div>
        </label>
    </div>
}

export default TimePicker;