import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    savedPosts: [],
    loading: false,
    error: null,
    startFetch: false
}

const savePostStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        startFetch: false
    })
}

const savePostSuccess = (state, action) => {
    const newSavedPost = updateObject(action.postData, {id: action.postId});
    return updateObject(state, {
        loading: false,
        error: null,
        startFetch: false,
        savedPosts: state.savedPosts.concat(newSavedPost)
    })
}

const savePostFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        startFetch: false,
        error: action.error
    })
}

const deletePostStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        startFetch: false
    })
}

const deletePostSuccess = (state, action) => {
    const updatedSavedPosts = state.savedPosts.filter(post => post.id !== action.id);
    return updateObject(state, {
        savedPosts: updatedSavedPosts,
        loading: false,
        startFetch: false,
        error: null
    });
}

const deletePostFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false,
        startFetch: false
    })
}

const fetchSavedPostsStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        startFetch: true
    })
}

const fetchSavedPostsSuccess = (state, action) => {
    return updateObject(state, {
        savedPosts: action.posts,
        loading: false,
        startFetch: false,
        error: null
    })
}

const fetchSavedPostsFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        startFetch: false,
        error: null
    })
}

const removeSavedPosts = (state, action) => {
    return updateObject(state, {
        savedPosts: [],
        startFetch: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.SAVE_POST_START: return savePostStart(state, action);
        case actionTypes.SAVE_POST_SUCCESS: return savePostSuccess(state, action);
        case actionTypes.SAVE_POST_FAIL: return savePostFail(state, action);
        case actionTypes.DELETE_POST_START: return deletePostStart(state, action);
        case actionTypes.DELETE_POST_SUCCESS: return deletePostSuccess(state, action);
        case actionTypes.DELETE_POST_FAIL: return deletePostFail(state, action);
        case actionTypes.FETCH_SAVED_POSTS_START: return fetchSavedPostsStart(state, action);
        case actionTypes.FETCH_SAVED_POSTS_SUCCESS: return fetchSavedPostsSuccess(state, action);
        case actionTypes.FETCH_SAVED_POSTS_FAIL: return fetchSavedPostsFail(state, action);
        case actionTypes.REMOVE_SAVED_POSTS: return removeSavedPosts(state, action);
        default: return state;
    }
}

export default reducer;