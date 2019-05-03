import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Transactions } from './transactions';
import { Accounts } from './accounts';
import { UserData } from './userData';
import { ApiToken } from './apiToken';
import { InitialTransfer } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            apiToken: ApiToken,
            transactions: Transactions,
            accounts: Accounts,
            userData: UserData,
            ...createForms({
                transfer: InitialTransfer
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};

