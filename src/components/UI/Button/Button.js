import React from 'react';

import classes from './Button.css';

const Button = (props) => {
    let buttonClasses = [classes.GeneralButton];
    if(props.buttonType === "white"){
        buttonClasses.push(classes.White);
    }else if(props.buttonType === "green"){
        buttonClasses.push(classes.Green);
    }else if(props.buttonType === "blue"){
        buttonClasses.push(classes.Blue);
    }

    buttonClasses = buttonClasses.join(' ');

    return <button 
                className={buttonClasses}
                onClick={props.click}
                disabled={props.disabled}
            >
                {props.value}
            </button>;
};

export default Button;