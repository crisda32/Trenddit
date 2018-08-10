import axios from '../../instances/axios-authentication';

import * as actionTypes from './actionTypes';

const authenticationStart = () => {
    return {
        type: actionTypes.AUTHENTICATION_START
    };
};

const authenticationSuccess = (token, userId, displayName) => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS,
        idToken: token,
        userId: userId,
        displayName: displayName
    };
};

const authenticationFail = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('displayName');
    return {
        type: actionTypes.AUTHENTICATION_LOGOUT
    }
}

const checkAuthenticationTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const signUpAuthentication = (email, password, displayName) => {
    return dispatch => {
        dispatch(authenticationStart());
        const authData = {
            displayName: displayName,
            email: email,
            password: password,
            returnSecureToken: true
        };
        const url = "signupNewUser?key=AIzaSyD2w3TS-cvpkDRnpv8arN109P3lf0bb9uA";
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('displayName', response.data.displayName);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId, response.data.displayName));
                dispatch(checkAuthenticationTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authenticationFail(error.response.data.error))
            });
    };
};

export const logInAuthentication = (email, password, name) => {
    return dispatch => {
        dispatch(authenticationStart());
        const authData = {
            displayName: name,
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "verifyPassword?key=AIzaSyD2w3TS-cvpkDRnpv8arN109P3lf0bb9uA";
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('displayName', response.data.displayName);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId, response.data.displayName));
                dispatch(checkAuthenticationTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authenticationFail(error.response.data.error))
            });
    };
};

export const authenticationCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate >= new Date()) {
                const userId = localStorage.getItem('userId');
                const displayName = localStorage.getItem('displayName');
                dispatch(authenticationSuccess(token, userId, displayName));
                dispatch(checkAuthenticationTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    };
};