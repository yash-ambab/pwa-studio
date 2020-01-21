import { createActions } from 'redux-actions';

const prefix = 'NEWSLETTER';

const actionMap = {
    SIGN_UP_FOR_NEWSLETTER: {
        REQUEST: null,
        RECEIVE: null
    },
    NEWSLETTER_ERROR: {
        REQUEST: null,
        RECEIVE: null
    }
};

export default createActions(actionMap, { prefix });