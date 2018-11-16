import { resetCheckout } from 'src/actions/checkout';
import { getAccountInformation } from 'src/selectors/checkoutReceipt';

export const createAccount = history => async (dispatch, getState) => {
    const accountInfo = getAccountInformation(getState());

    await dispatch(resetCheckout());

    history.push(`/create-account?${new URLSearchParams(accountInfo)}`);
};

export const continueShopping = history => async dispatch => {
    await dispatch(resetCheckout());

    history.push('/');
};
