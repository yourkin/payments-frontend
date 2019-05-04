import { API_TOKEN } from '../shared/localStorage';
import * as ActionTypes from './ActionTypes';

const apiToken = localStorage.getItem(API_TOKEN);
const username = localStorage.getItem('username');
const userUUID = localStorage.getItem('userUUID');

export const Auth = (state = {apiToken: apiToken, isLoggedIn: !!apiToken, username: username, uuid: userUUID}, action) => {

    switch (action.type) {

        case ActionTypes.SET_AUTH_DATA:
            localStorage.setItem(API_TOKEN, action.payload.token);
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('userUUID', action.payload.uuid);
            return {
                ...state, apiToken: action.payload.token, isLoggedIn: true,
                username: action.payload.username, uuid: action.payload.uuid
            };

        case ActionTypes.CLEAR_AUTH_DATA:
            localStorage.removeItem(API_TOKEN);
            localStorage.removeItem('username');
            localStorage.removeItem('userUUID');
            return {...state, apiToken: '', isLoggedIn: false, username: ''};

        default:
            return state;
    }
};
