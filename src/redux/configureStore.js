import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Transactions } from './transactions';
import { Accounts } from './accounts';
import { ApiToken } from './apiToken';
import { USERS } from '../shared/users';
import { USER } from '../shared/user';
import { InitialTransfer } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            apiToken: ApiToken,
            users: USERS,
            transactions: Transactions,
            accounts: Accounts,
            user: USER,
            ...createForms({
                transfer: InitialTransfer
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};

