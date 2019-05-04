import * as ActionTypes from './ActionTypes';

export const Register = (state = {registering: false, errMess: null}, action) => {
    switch (action.type) {

        case ActionTypes.REGISTRATION_STARTED:
            return {...state, registering: true, errMess: null};

        case ActionTypes.REGISTRATION_FAILED:
            return {...state, registering: false, errMess: action.payload};

        default:
            return state;
    }
};