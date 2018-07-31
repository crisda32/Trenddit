import React from 'react';

import Button from '../../components/UI/Button/Button';
import classes from './MainPage.css';

const mainPage = (props) => (
    <div className={classes.Container}>
        <h1>Trenddit</h1>
        <div className={classes.Buttons}>
            <Button value="Log in" buttonType="white" />
            <Button value="Sign up" buttonType="green" />
        </div>
    </div>
);

export default mainPage;