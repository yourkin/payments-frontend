import * as ActionTypes from './ActionTypes';

export const Login = (state = {loginIn: false, errMess: null}, action) => {
    switch (action.type) {

        case ActionTypes.LOGIN_STARTED:
            return {...state, loginIn: true, errMess: null};

        case ActionTypes.LOGIN_FAILED:
            return {...state, loginIn: false, errMess: action.payload};

        default:
            return state;
    }
};