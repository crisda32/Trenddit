import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.css';
import viewItemClasses from '../ViewItems/ViewItem/ViewItem.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import ViewItems from '../ViewItems/ViewItems';
import MyProfile from './MyProfile/MyProfile';
import * as actions from '../../../store/actions/index';

class toolbar extends Component {
    state = {
        subreddit: ''
    }

    componentDidMount() {
        this.getButtonsHandler();
        this.selectPredetView();
    }

    inputChangedHandler = (event) => {
        const updatedSubreddit = event.target.value;
        this.setState({ subreddit: updatedSubreddit });
    }

    filterByNewSubreddit = (event) => {
        if (event.keyCode === 13) {
            let newSubreddit = this.state.subreddit === "" ? "popular" : this.state.subreddit;
            this.props.onDeletePosts();
            this.props.onFetchPosts(newSubreddit, "");
        }
    }

    getButtonsHandler = () => {
        document.getElementsByClassName(classes.View)[0].onclick = this.selectViewHandler;
    }

    selectPredetView = () => {
        document.getElementById('view-2').className += " " + classes.Active;
    }

    selectViewHandler = (e) => {
        const views = document.getElementsByClassName(classes.Active);
        let initialClasses = [viewItemClasses.ViewItem];
        for (let i = 0; i < views.length; i++) {
            switch (views[i].id) {
                case 'view-2':
                    initialClasses.push(viewItemClasses.View_2);
                    break;
                case 'view-4':
                    initialClasses.push(viewItemClasses.View_4);
                    break;
                case 'view-6':
                    initialClasses.push(viewItemClasses.View_6);
                    break;
                default:
                    initialClasses.push(viewItemClasses.View_2);
                    break;
            }

            views[i].className = initialClasses.join(' ');
        }

        if (e.target.tagName === 'BUTTON') {
            e.target.className += " " + classes.Active;
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
                        <input
                            type="text"
                            placeholder="Search Trenddit"
                            value={this.state.subreddit}
                            onChange={this.inputChangedHandler}
                            onKeyDown={this.filterByNewSubreddit}
                        />
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

const mapStateToProps = state => {
    return {
        after: state.redditReducer.after,
        subreddit: state.redditReducer.subreddit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setViewMode: (viewMode) => dispatch(actions.setViewMode(viewMode)),
        onDeletePosts: () => dispatch(actions.deletePosts()),
        onFetchPosts: (subreddit, after) => dispatch(actions.fetchPosts(subreddit, after)),
        onSetSubreddit: (subreddit) => dispatch(actions.setSubreddit(subreddit))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(toolbar));