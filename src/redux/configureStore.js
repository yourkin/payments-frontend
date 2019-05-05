import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { Transactions } from './transactions';
import { Transfer } from './transfer';
import { Accounts } from './accounts';
import { UserData } from './userData';
import { Auth } from './auth';
import { Login } from './login';
import { Register } from './register';
import { Modals } from './modals';
import { InitialTransfer, InitialLogin, InitialRegister } from './forms';

export const ConfigureStore = () => {
    return createStore(
        combineReducers({
            auth: Auth,
            login: Login,
            register: Register,
            transactions: Transactions,
            transfer: Transfer,
            accounts: Accounts,
            userData: UserData,
            modals: Modals,
            ...createForms({
                transferForm: InitialTransfer,
                loginForm: InitialLogin,
                registerForm: InitialRegister
            })
        }),
        applyMiddleware(thunk, logger)
    );
};
