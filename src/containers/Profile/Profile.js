import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
import * as actions from '../../store/actions/index';
import Post from '../Post/Post';
import Spinner from '../../components/UI/Spinner_2/Spinner_2';

class Profile extends Component {

    componentDidMount() {
        this.props.onFetchPostsById(this.props.savedPostsId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.viewMode !== nextProps.viewMode
            || this.props.loadig !== nextProps.loading
            || this.props.savedPostsId !== nextProps.savedPostsId
    }

    render() {
        let savedPosts = "";
        if (this.props.savedPosts.length > 0) {
            savedPosts = this.props.savedPosts.map(savedPost => {
                return (
                    <Post
                        post={savedPost}
                        key={savedPost.id}
                        viewMode={this.props.viewMode}
                        isSaved={true}
                    />);
            })
        } else {
            if (this.props.loading) {
                savedPosts = <Spinner />;
            } else {
                savedPosts = <p className={classes.PostsNotFound}>Save some posts to keep them with you! <span role="img" aria-label="Smiley face">&#x1F604;</span></p>;
            }
        }
        return (
            <div className={classes.Profile}>
                <div className={classes.Posts}>
                    {savedPosts}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        viewMode: state.auxReducer.viewMode,
        savedPostsId: state.firebaseReducer.savedPosts,
        savedPosts: state.redditReducer.savedPosts,
        loading: state.redditReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPostsById: (posts) => dispatch(actions.fetchPostsById(posts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);