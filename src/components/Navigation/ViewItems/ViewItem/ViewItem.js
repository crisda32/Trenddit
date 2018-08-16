import React from 'react'

import classes from './ViewItem.css';

const viewItem = (props) => {
    let className = classes.ViewItem;
    switch (props.type) {
        case 'view-2':
            className += " "+classes.View_2;
            break;
        case 'view-4':
            className += " "+classes.View_4;
            break;
        case 'view-6':
            className += " "+classes.View_6;
            break;
        default:
            className += " "+classes.View_2;
            break
    }
    return (
        <button id={props.type} className={className}></button>
    );
};

export default viewItem;