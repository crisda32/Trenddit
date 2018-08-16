import * as actionTypes from './actionTypes';
import axios from '../../instances/axios-firebase';

const savePostStart = () => {
    return{
        type: actionTypes.SAVE_POST_START
    };
};

const savePostSuccess = (postId, postData) => {
    return{
        type: actionTypes.SAVE_POST_SUCCESS,
        postId: postId,
        postData: postData
    };
};

const savePostFail = (error) => {
    return{
        type: actionTypes.SAVE_POST_FAIL,
        error: error
    };
};

export const savePost = (postData, token) => {
    return dispatch => {
        dispatch(savePostStart());
        axios.post("/posts.json?auth="+token, postData)
            .then(response => {
                dispatch(savePostSuccess(response.data.name, postData));
            })
            .catch(error => {
                dispatch(savePostFail(error));
            });
    }
};

const deletePostStart = () => {
    return{
        type: actionTypes.DELETE_POST_START
    };
};

const deletePostSuccess = (id) => {
    return{
        type: actionTypes.DELETE_POST_SUCCESS,
        id: id
    };
};

const deletePostFail = (error) => {
    return{
        type: actionTypes.DELETE_POST_FAIL,
        error: error
    };
};

export const deletePost = (id, token) => {
    return dispatch => {
        dispatch(deletePostStart());
        axios.delete("/posts/"+id+".json?auth="+token)
            .then(response => {
                dispatch(deletePostSuccess(id));
            })
            .catch(error => {
                dispatch(deletePostFail(error));
            })
    }
};

const fetchSavedPostsStart = () => {
    return{
        type: actionTypes.FETCH_SAVED_POSTS_START
    };
};

const fetchSavedPostsSuccess = (posts) => {
    return{
        type: actionTypes.FETCH_SAVED_POSTS_SUCCESS,
        posts: posts
    };
};

const fetchSavedPostsFail = (error) => {
    return{
        type: actionTypes.FETCH_SAVED_POSTS_FAIL,
        error: error
    };
};

export const fetchSavedPosts = (userId, token) => {
    return dispatch => {
        dispatch(fetchSavedPostsStart());
        const queryParams = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/posts.json'+queryParams)
            .then(response => {
                const fetchedPosts = [];
                for(let key in response.data){
                    fetchedPosts.push({
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(fetchSavedPostsSuccess(fetchedPosts))
            })
            .catch(error => {
                fetchSavedPostsFail(error);
            })
    }
};

export const removeSavedPosts = () => {
    return{
        type: actionTypes.REMOVE_SAVED_POSTS
    }
}