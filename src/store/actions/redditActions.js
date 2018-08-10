import axiosReddit from '../../instances/axios-reddit';

import * as actionTypes from './actionTypes';

const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    };
};

const fetchPostsSuccess = (posts, after, subreddit) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts,
        after: after,
        subreddit: subreddit
    }
}

const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    }
}

export const fetchPosts = (subreddit, after) => {
    return dispatch => {
        dispatch(fetchPostsStart());
        const queryParams = subreddit + "/.json?limit=10&after=" + after;
        axiosReddit.get("r/"+queryParams)
            .then(response => {
                const data = response.data.data;
                const posts = [];
                for(let i = 0; i < data.children.length; i++){
                    const post = {
                        subreddit: data.children[i].data.subreddit,
                        postTitle: data.children[i].data.title,
                        thumbnail: data.children[i].data.thumbnail,
                        preview: data.children[i].data.preview,
                        id: data.children[i].data.name,
                        author: data.children[i].data.author,
                        permalink: data.children[i].data.permalink,
                        url: data.children[i].data.url,                        
                        selfText: data.children[i].data.selftext ? data.children[i].data.selftext : "none",
                        media: data.children[i].data.media
                    }
                    posts.push(post);
                }
                dispatch(fetchPostsSuccess(posts, data.after, subreddit));
            })
            .catch(error => {
                dispatch(fetchPostsFail(error));
            })
    }
}

export const deletePosts = () => {
    return{
        type: actionTypes.DELETE_POSTS
    }
}

export const setSubreddit = (subreddit) => {
    return{
        type: actionTypes.SET_SUBREDDIT,
        subreddit: subreddit
    }
}