import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Transactions} from './transactions';
import { USERS } from '../shared/users';
import { ACCOUNTS } from '../shared/accounts';
import { USER } from '../shared/user';
import { InitialTransfer } from './forms';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: USERS,
            accounts: ACCOUNTS,
            transactions: Transactions,
            user: USER,
            ...createForms({
                transfer: InitialTransfer
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};

