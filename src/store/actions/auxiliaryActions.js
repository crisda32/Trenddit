import * as actionTypes from './actionTypes';

export const setViewMode = (viewMode) => {
    return {
        type: actionTypes.SET_VIEW_MODE,
        viewMode: viewMode
    }
}

export const toggleMyProfile = (hideMyProfile) => {
    return {
        type: actionTypes.TOGGLE_MY_PROFILE,
        hideMyProfile: hideMyProfile
    }
}