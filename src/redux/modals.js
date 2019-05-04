import * as ActionTypes from './ActionTypes';

export const Modals = (state = {isLoginOpen: false, isRegisterOpen: false}, action) => {
    switch (action.type) {

        case ActionTypes.TOGGLE_LOGIN_MODAL:
            return {...state, isLoginOpen: !state.isLoginOpen};

        case ActionTypes.TOGGLE_REGISTER_MODAL:
            return {...state, isRegisterOpen: !state.isRegisterOpen};

        default:
            return state;
    }
};