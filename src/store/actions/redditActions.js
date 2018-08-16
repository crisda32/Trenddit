import axiosReddit from '../../instances/axios-reddit';
import axios from 'axios';

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
        axiosReddit.get("r/" + queryParams)
            .then(response => {
                const data = response.data.data;
                const posts = [];
                for (let i = 0; i < data.children.length; i++) {
                    const post = {
                        subreddit: data.children[i].data.subreddit,
                        postTitle: data.children[i].data.title,
                        thumbnail: data.children[i].data.thumbnail,
                        preview: data.children[i].data.preview,
                        id: data.children[i].data.name,
                        author: data.children[i].data.author,
                        permalink: data.children[i].data.permalink,
                        url: data.children[i].data.url,
                        score: {
                            ups: data.children[i].data.ups,
                            numComments: data.children[i].data.num_comments
                        },
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
    return {
        type: actionTypes.DELETE_POSTS
    }
}

const fetchPostsByIdStart = () => {
    return {
        type: actionTypes.FETCH_POST_BY_ID_START
    }
}

const fetchPostsByIdSuccess = (savedPosts) => {
    return {
        type: actionTypes.FETCH_POST_BY_ID_SUCCESS,
        savedPosts: savedPosts
    }
}

const fetchPostsByIdFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    }
}

export const fetchPostsById = (posts) => {
    return dispatch => {
        dispatch(fetchPostsByIdStart());
        const savedPosts = [];
        const promises = [];

        posts.forEach(post => {
            const queryParams = post.postId + "/.json";
            promises.push(axiosReddit.get("/by_id/" + queryParams));
        });

        axios.all(promises)
            .then(results => {
                results.forEach(response => {
                    const data = response.data.data;
                    const post = {
                        subreddit: data.children[0].data.subreddit,
                        postTitle: data.children[0].data.title,
                        thumbnail: data.children[0].data.thumbnail,
                        preview: data.children[0].data.preview,
                        id: data.children[0].data.name,
                        author: data.children[0].data.author,
                        permalink: data.children[0].data.permalink,
                        url: data.children[0].data.url,
                        score: {
                            ups: data.children[0].data.ups,
                            numComments: data.children[0].data.num_comments
                        },
                        selfText: data.children[0].data.selftext ? data.children[0].data.selftext : "none",
                        media: data.children[0].data.media
                    }
                    savedPosts.push(post);
                })
                dispatch(fetchPostsByIdSuccess(savedPosts));
            })
            .catch(error => {
                dispatch(fetchPostsByIdFail(error));
            });
    }
}