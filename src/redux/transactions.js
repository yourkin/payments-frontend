import * as ActionTypes from './ActionTypes';

export const Transactions = (state = {isLoading: true, errMess: null, transactions: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TRANSACTIONS:
            return {...state, isLoading: false, errMess: null, transactions: action.payload};

        case ActionTypes.TRANSACTIONS_LOADING:
            return {...state, isLoading: true, errMess: null, transactions: []};

        case ActionTypes.TRANSACTIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.PURGE_TRANSACTIONS:
            return {...state, isLoading: false, errMess: null, transactions: []};

        default:
            return state;
    }
};