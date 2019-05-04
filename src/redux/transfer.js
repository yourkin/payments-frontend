import * as ActionTypes from './ActionTypes';

export const Transfer = (state = {isLoading: true, errMess: null, result: []}, action) => {
    switch (action.type) {
        case ActionTypes.TRANSFER_FUNDS:
            return {...state, isLoading: true, errMess: null, result: []};

        case ActionTypes.TRANSFER_RESULT:
            return {...state, isLoading: false, errMess: null, result: action.payload};

        case ActionTypes.TRANSFER_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};