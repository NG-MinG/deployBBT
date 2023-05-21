import React from 'react';

const DayRow = ({ list_day, classes, active, updateDate, current_date }) => {

    const classGen = (index) => {
        if (index === -1) return null;
        const classStr = [classes.day_item];

        if (current_date === index) classStr.push(classes.day_item_curr);
        if (index === active) classStr.push(classes.day_item_active);
        
        return classStr.join(', ');
    }

    return <tr>
        { list_day.map((day, index) => <td key={`day${index}`} onClick={() => updateDate(day)} className={classGen(day)}>{ (day === - 1) ? '' : day }</td>) }
    </tr>
};

export default DayRow;