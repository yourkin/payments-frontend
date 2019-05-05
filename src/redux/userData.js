import * as ActionTypes from './ActionTypes';

export const UserData = (state = {isLoading: true, errMess: null, userData: []}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_USER_DATA:
            return {...state, isLoading: false, errMess: null, userData: action.payload};

        case ActionTypes.USER_DATA_LOADING:
            return {...state, isLoading: true, errMess: null, userData: []};

        case ActionTypes.USER_DATA_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};