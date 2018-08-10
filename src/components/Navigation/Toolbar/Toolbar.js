import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './Toolbar.css';
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
        if (event.keyCode == 13) {
            /*START OF ERROR TEST*/
            console.log('[Previous Subreddit]: '+this.props.subreddit);
            this.props.onSetSubreddit(this.state.subreddit);
            console.log('[New Subreddit (fake)]: '+this.props.subreddit);
            setTimeout(() => {
                console.log('[New Subreddit (real)]:'+this.props.subreddit);
            }, 1);
            /*END OF ERROR TEST*/
            let newSubreddit = this.state.subreddit === "" ? "popular" : this.state.subreddit;
            this.props.onDeletePosts();
            this.props.onFetchPosts(newSubreddit, "");
        }
    }

    getButtonsHandler = () => {
        document.getElementsByClassName(classes.View)[0].onclick = this.selectViewHandler;
    }

    selectPredetView = () => {
        document.getElementById('view-2').className = classes.Active;
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