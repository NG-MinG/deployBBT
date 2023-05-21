import React from 'react';

import classes from './Button.module.css';

const Button = ({ 
    className = '',
    outline = false,
    text = '',
    children,
    ...attributes 
}) => {

    const fetchClassName = (className, outline) => (`${className} ${(outline) ? classes.outline : classes.button}`).trim(' ');
    const customClassName = fetchClassName(className, outline);

    return <button type='button' {...attributes} className={customClassName}>
        {text ? text : children}
    </button>
}

export default Button;