import { API_TOKEN } from '../shared/localStorage';
import * as ActionTypes from './ActionTypes';

const initialState = localStorage.getItem(API_TOKEN);

export const ApiToken = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.SET_API_TOKEN:
            localStorage.setItem(API_TOKEN, action.value);
            return action.value;
        case ActionTypes.UNSET_API_TOKEN:
            localStorage.removeItem(API_TOKEN);
            return initialState;
        default:
            return state;
    }
};