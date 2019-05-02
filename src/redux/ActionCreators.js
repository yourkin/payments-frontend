import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const transactionsLoading = () => ({
   type: ActionTypes.TRANSACTIONS_LOADING
});

export const addTransactions = (transactions) => ({
   type: ActionTypes.ADD_TRANSACTIONS,
   payload: transactions
});

export const transactionsFailed = (errmess) => ({
   type: ActionTypes.TRANSACTIONS_FAILED,
   payload: errmess
});

export const fetchTransactions = () => (dispatch) => {

    dispatch(transactionsLoading(true));

    return fetch(baseUrl + 'transactions/').
        then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let error = new Error('Error' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(transactions => dispatch(addTransactions(transactions)))
        .catch(error => dispatch(transactionsFailed(error.message)));
};