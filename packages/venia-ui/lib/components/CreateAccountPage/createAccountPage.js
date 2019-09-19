import React, { useCallback, useMemo } from 'react';
import { func, shape } from 'prop-types';
import CreateAccountForm from '../CreateAccount';
import { mergeClasses } from '../../classify';
import defaultClasses from './createAccountPage.css';
import { getCreateAccountInitialValues } from './helpers';
import { useRouter } from '@magento/peregrine';

const CreateAccountPage = props => {
    const { history } = useRouter();
    const classes = mergeClasses(defaultClasses, props.classes);
    const { createAccount } = props;

    const handleCreateAccount = useCallback(
        async accountInfo => {
            await createAccount(accountInfo);
            history.push('/');
        },
        [createAccount, history]
    );

    const initialValues = useMemo(
        () => getCreateAccountInitialValues(window.location.search),
        []
    );

    return (
        <div className={classes.container}>
            <CreateAccountForm
                initialValues={initialValues}
                onSubmit={handleCreateAccount}
            />
        </div>
    );
};

CreateAccountPage.propTypes = {
    createAccount: func,
    initialValues: shape({})
};

export default CreateAccountPage;
