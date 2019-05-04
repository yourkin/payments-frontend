import * as ActionTypes from './ActionTypes';

export const Modals = (state = {isLoginOpen: false, isRegisterOpen: false, isResultOpen: false}, action) => {
    switch (action.type) {

        case ActionTypes.TOGGLE_LOGIN_MODAL:
            return {...state, isLoginOpen: !state.isLoginOpen};

        case ActionTypes.TOGGLE_REGISTER_MODAL:
            return {...state, isRegisterOpen: !state.isRegisterOpen};

        case ActionTypes.TOGGLE_RESULT_MODAL:
            return {...state, isResultOpen: !state.isResultOpen};

        default:
            return state;
    }
};