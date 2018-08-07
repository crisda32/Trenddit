import React from 'react'

import classes from './ViewItem.css';

const viewItem = (props) => {
    const viewIcon = require('../../../../assets/Icons/' + props.type + ".png");
    return (
        <div className={classes.ViewItem}>
            <button id={props.type}>
                <img src={viewIcon} alt={"view" + props.type + "-icon"} />
            </button>
        </div>
    );
};

export default viewItem;