import React, { Component } from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import ViewItems from '../ViewItems/ViewItems';
import MyProfile from './MyProfile/MyProfile';

class toolbar extends Component {
    componentDidMount() {
        this.getButtonsHandler();
        this.selectPredetView();
    }

    getButtonsHandler = () => {
        document.getElementsByClassName(classes.View)[0].onclick = this.selectViewHandler;
    }

    selectPredetView = () => {
        const views = document.getElementsByTagName('BUTTON')[0].className = classes.Active;
    }

    selectViewHandler = (e) => {
        const views = document.getElementsByClassName(classes.Active);
        for (let i = 0; i < views.length; i++) {
            views[i].className = "";
        }

        if (e.target.tagName == 'BUTTON') {
            e.target.className = classes.Active;
        }
    }

    render() {
        let searchIcon = require('../../../assets/Icons/search.png');
        return (
            <header className={classes.Toolbar}>
                <div className={classes.Top}>
                    <h1>Trenddit</h1>
                </div>
                <div className={classes.Bottom}>
                    <NavigationItems />
                    <div className={classes.SearchBar}>
                        <input type="text" placeholder="Search Trenddit" />
                        <img src={searchIcon} alt="search-icon" />
                    </div>
                    <div className={classes.MyProfile}>
                        <MyProfile />
                    </div>
                    <div className={classes.View}>
                        <ViewItems />
                    </div>
                </div>
            </header>
        );
    }
}

export default toolbar;