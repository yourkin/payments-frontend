import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const toggleLoginModal = () => ({
   type: ActionTypes.TOGGLE_LOGIN_MODAL
});

export const toggleRegisterModal = () => ({
    type: ActionTypes.TOGGLE_REGISTER_MODAL
});

export const setAuthData = (data) => ({
    type: ActionTypes.SET_AUTH_DATA,
    payload: data
});

export const clearAuthData = (data) => ({
    type: ActionTypes.CLEAR_AUTH_DATA,
    payload: data
});

export const transactionsLoading = () => ({
   type: ActionTypes.TRANSACTIONS_LOADING
});

export const addTransactions = (transactions) => ({
   type: ActionTypes.ADD_TRANSACTIONS,
   payload: transactions
});

export const transactionsFailed = (errMess) => ({
   type: ActionTypes.TRANSACTIONS_FAILED,
   payload: errMess
});

export const purgeTransactions = () => ({
    type: ActionTypes.PURGE_TRANSACTIONS
});

export const fetchTransactions = () => (dispatch, getState) => {

    dispatch(transactionsLoading(true));

    const token = getState().auth.apiToken;

    let request = new Request(baseUrl + 'transactions/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        })
    });

    return fetch(request)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(transactions => dispatch(addTransactions(transactions)))
        .catch(error => dispatch(transactionsFailed(error.message)));
};

export const accountsLoading = () => ({
    type: ActionTypes.ACCOUNTS_LOADING
});

export const addAccounts = (accounts) => ({
    type: ActionTypes.ADD_ACCOUNTS,
    payload: accounts
});

export const accountsFailed = (errMess) => ({
    type: ActionTypes.ACCOUNTS_FAILED,
    payload: errMess
});

export const purgeAccounts = () => ({
    type: ActionTypes.PURGE_ACCOUNTS
});

export const fetchAccounts = () => (dispatch, getState) => {

    dispatch(accountsLoading(true));

    const token = getState().auth.apiToken;

    let request = new Request(baseUrl + 'accounts/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        })
    });

    return fetch(request)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(accounts => dispatch(addAccounts(accounts)))
        .catch(error => dispatch(accountsFailed(error.message)));
};

export const userDataLoading = () => ({
    type: ActionTypes.USER_DATA_LOADING
});

export const addUserData = (userData) => ({
    type: ActionTypes.ADD_USER_DATA,
    payload: userData
});

export const userDataFailed = (errMess) => ({
    type: ActionTypes.USER_DATA_FAILED,
    payload: errMess
});

export const purgeUserData = () => ({
    type: ActionTypes.PURGE_USER_DATA
});

export const fetchUserData = () => (dispatch, getState) => {

    dispatch(userDataLoading(true));

    const token = getState().auth.apiToken;

    let request = new Request(baseUrl + 'core/current_user/', {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + token
        })
    });

    return fetch(request)
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                throw new Error(error.message);
            })
        .then(response => response.json())
        .then(userData => dispatch(addUserData(userData)))
        .catch(error => dispatch(userDataFailed(error.message)));
};