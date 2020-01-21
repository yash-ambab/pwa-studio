import { handleActions } from 'redux-actions';    
import actions from '../actions/newsletter';    
export const name = 'newsletter';

const initialState = {
    isInProgress: false,
    isError: false,
    isSuccess: false
};

const reducerMap = {
    [actions.signUpForNewsletter.request]: state => {
        return {
            ...state,
            isInProgress: true,
            isError: false
        };
    },
    [actions.signUpForNewsletter.receive]: state => {
        return {
            ...state,
            isInProgress: false,
            isSuccess: true
        };
    },
    [actions.newsletterError.receive]: state => {
        return {
            ...state,
            isInProgress: false,
            isError: true
        };
    }
};

export default handleActions(reducerMap, initialState);