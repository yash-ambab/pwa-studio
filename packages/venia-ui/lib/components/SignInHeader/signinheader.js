import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';

import { mergeClasses } from '../../classify';
import AuthBar from '../AuthBar';
import LoadingIndicator from '../LoadingIndicator';
import defaultClasses from './signinheader.css';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';

const AuthModal = React.lazy(() => import('../AuthModal'));

const Navigation = props => {
    const {
        hasModal,
        showSignIn,
        view
    } = useNavigation({ customerQuery: GET_CUSTOMER_QUERY });

    const classes = mergeClasses(defaultClasses, props.classes);

    // Lazy load the auth modal because it may not be needed.
    const authModal = hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <AuthModal
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    return (
    <React.Fragment>
        <AuthBar
            disabled={hasModal}
            showSignIn={showSignIn}
        />
        <div className="customer-popup">{authModal}</div>
    </React.Fragment>
    );
};

export default Navigation;

Navigation.propTypes = {
    classes: shape({
        body: string,
        form_closed: string,
        form_open: string,
        footer: string,
        header: string,
        root: string,
        root_open: string,
        signIn_closed: string,
        signIn_open: string,
        isRoot: string
    })
};
