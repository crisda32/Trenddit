import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    viewMode: "view-2",
    hideMyProfile: true
}

const setViewMode = (state, action) => {
    return updateObject(state, { viewMode: action.viewMode })
}

const toggleMyProfile = (state, action) => {
    console.log(state.hideMyProfile);
    return updateObject(state, {hideMyProfile: !state.hideMyProfile})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_VIEW_MODE: return setViewMode(state, action);
        case actionTypes.TOGGLE_MY_PROFILE: return toggleMyProfile(state, action);
        default: return state;
    }
}

export default reducer;