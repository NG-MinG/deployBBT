import React from 'react';

import classes from './RadioButton.module.css';

const RadioButton = ({ value = '', text = '', name = 'radio_btn', ...attributes }) => {
    
    return <div className={classes.radio_group}>
        <label className={classes.radio_label}>
            <span {...attributes} className={classes.radio_button}>
                <input name={name} className={classes.fake_radio} type='radio' value={value} {...attributes} />
                <span className={classes.dot}></span>
            </span>
            <span className={classes.radio_title}>{ text }</span>
        </label>
    </div>
}

export default RadioButton;