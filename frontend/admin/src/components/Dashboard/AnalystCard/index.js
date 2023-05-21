import React from 'react';

import classes from './AnalystCard.module.css';

const AnalystCard = ({ title, value, yellow, blue, green, red, className, ...attribute }) => {

    const classArr = [classes.analyst_card];
    const classStr = () => {

        if (yellow) {
            classArr.push(classes.yellow);
        }
        
        if (blue) {
            classArr.push(classes.blue);
        }
        
        if (green) {
            classArr.push(classes.green);
        }
        
        if (red) {
            classArr.push(classes.red);
        }

        classArr.push(className);

        return classArr.join(' ');
    };

    return <div {...attribute} className={classStr()}>
        <b>{ title }</b>
        <div>{ value }</div>
    </div>
};

export default AnalystCard;