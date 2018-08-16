import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    posts: [],
    savedPosts: [],
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

const fetchPostByIdStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchPostByIdSuccess = (state, action) => {
    return updateObject(state, {
        savedPosts: action.savedPosts,
        loading: false,
        error: null
    })
}

const fetchPostByIdFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCH_POSTS_START: return fetchPostsStart(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        case actionTypes.DELETE_POSTS: return deletePosts(state, action);
        case actionTypes.FETCH_POST_BY_ID_START: return fetchPostByIdStart(state, action);
        case actionTypes.FETCH_POST_BY_ID_SUCCESS: return fetchPostByIdSuccess(state, action);
        case actionTypes.FETCH_POST_BY_ID_FAIL: return fetchPostByIdFail(state, action);
        default: return state;
    }
};

export default reducer;