import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Transactions } from './transactions';
import { Accounts } from './accounts';
import { UserData } from './userData';
import { Auth } from './auth';
import { InitialTransfer } from './forms';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            auth: Auth,
            transactions: Transactions,
            accounts: Accounts,
            userData: UserData,
            ...createForms({
                transfer: InitialTransfer
            })
        }),
        applyMiddleware(thunk, logger)
    );
};
