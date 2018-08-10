import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    after: null,
    subreddit: null,
    loading: false,
    postsError: null
}

const fetchPostsStart = (state, action) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchPostsSuccess = (state, action) => {
    const updatedPosts = [...state.posts, ...action.posts]
    return updateObject(state, {
        posts: updatedPosts,
        after: action.after,
        subreddit: action.subreddit,
        loading: false,
        postsError: null
    });
};

const fetchPostsFail = (state, action) => {
    return updateObject(state, {
        posts: null,
        after: null,
        subreddit: null,
        loading: false,
        postsError: action.error
    });
};

const deletePosts = (state, action) => {
    return updateObject(state, {
        posts: []
    })
}

const setSubreddit = (state, action) => {
    return updateObject(state, {
        subreddit: action.subreddit
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.DELETE_POSTS: return deletePosts(state, action);
        case actionTypes.SET_SUBREDDIT: return setSubreddit(state, action);
        default: return state;
    };
};

export default reducer;