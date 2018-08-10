import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Dashboard.css';
import * as actions from '../../store/actions/index';
import Post from '../Post/Post';
import Spinner from '../../components/UI/Spinner_2/Spinner_2';

class Dashboard extends Component {
    componentDidMount() {
        if (this.props.posts.length === 0) {
            this.props.onFetchPosts("popular", this.props.after);
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.props.posts != nextProps.posts || this.props.loading != nextProps.loading
    }

    render() {
        let posts = "";
        this.props.posts
            ? posts = this.props.posts.map(post => {
                return <Post post={post} key={post.id} />
            })
            : posts = <p className={classes.PostsNotFound}>Sorry, no posts where found with your matching criteria :(</p>;
        let getMoreButton = (
            <button
                onClick={() => this.props.onFetchPosts(this.props.subreddit, this.props.after)}
                className={classes.GetMoreButton}
            >   Get some more action!
                </button>
        );
        this.props.loading ? getMoreButton = <Spinner /> : null;
        return (
            <div className={classes.Dashboard}>
                <div className={classes.Posts}>
                    {posts}
                </div>
                {this.props.posts ? getMoreButton : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        viewMode: state.auxReducer.viewMode,
        after: state.redditReducer.after,
        posts: state.redditReducer.posts,
        subreddit: state.redditReducer.subreddit,
        loading: state.redditReducer.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPosts: (subreddit, after) => dispatch(actions.fetchPosts(subreddit, after))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);