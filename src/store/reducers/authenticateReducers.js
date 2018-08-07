import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    displayName: null,
    error: null,
    loading: false
}

const authenticationStart = (state, action) => {
    return updateObject(state, {
        error: null, 
        loading: true
    });
};

const authenticationSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken, 
        userId: action.userId, 
        displayName: action.displayName, 
        error: false, 
        loading: false
    });
};

const authenticationFail = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        displayName: null,
        error: action.error,
        loading: false
    });
};

const logout = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        displayName: null
    })
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.AUTHENTICATION_START: return authenticationStart(state, action);
        case actionTypes.AUTHENTICATION_SUCCESS: return authenticationSuccess(state, action);
        case actionTypes.AUTHENTICATION_FAIL: return authenticationFail(state, action);
        case actionTypes.AUTHENTICATION_LOGOUT: return logout(state, action);
        default: return state;
    }
}

export default reducer;