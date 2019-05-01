import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { createForms } from 'react-redux-form';
import { USERS } from '../shared/users';
import { TRANSACTIONS } from '../shared/transactions';
import { ACCOUNTS } from '../shared/accounts';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: USERS,
            accounts: ACCOUNTS,
            transactions: TRANSACTIONS
        })
    );

    return store;
};

