import { RestApi } from '@magento/peregrine';
import actions from './actions';

const { request } = RestApi.Magento2;

export const signUpForNewsletter = ({ email }) =>
    async function thunk(...args) {
        const [dispatch] = args;

        dispatch(actions.signUpForNewsletter.request(email));

        const body = {
            email: email
        };
        const response = await request('rest/V1/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify(body)
        });

        console.log('newsletter action response', response);
        if (response.success == true) {
            await dispatch(actions.signUpForNewsletter.receive(response));
        }

        if (response.success == false) {
            await dispatch(actions.newsletterError.receive(response));
        }
    };