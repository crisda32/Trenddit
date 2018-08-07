import React, { Component } from 'react';
import {connect} from 'react-redux';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import ViewItems from '../ViewItems/ViewItems';
import MyProfile from './MyProfile/MyProfile';
import * as actions from '../../../store/actions/index';

class toolbar extends Component {
    componentDidMount() {
        this.getButtonsHandler();
        this.selectPredetView();
    }

    getButtonsHandler = () => {
        document.getElementsByClassName(classes.View)[0].onclick = this.selectViewHandler;
    }

    selectPredetView = () => {
        const views = document.getElementById('view-2').className = classes.Active;
    }

    selectViewHandler = (e) => {
        const views = document.getElementsByClassName(classes.Active);
        for (let i = 0; i < views.length; i++) {
            views[i].className = "";
        }

        if (e.target.tagName === 'BUTTON') {
            e.target.className = classes.Active;
            this.props.setViewMode(e.target.id);
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

const mapDispatchToProps = dispatch => {
    return{
        setViewMode: (viewMode) => dispatch(actions.setViewMode(viewMode))
    }
}

export default connect(null, mapDispatchToProps)(toolbar);