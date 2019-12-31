import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import { useNavigation } from '@magento/peregrine/lib/talons/Navigation/useNavigation';

import { mergeClasses } from '../../classify';
import AuthBar from '../AuthBar';
import CategoryTree from '../CategoryTree';
import LoadingIndicator from '../LoadingIndicator';
import NavHeader from './navHeader';
import defaultClasses from './navigation.css';
import GET_CUSTOMER_QUERY from '../../queries/getCustomer.graphql';

const AuthModal = React.lazy(() => import('../AuthModal'));

const Navigation = props => {
    const {
        catalogActions,
        categories,
        categoryId,
        handleBack,
        handleClose,
        hasModal,
        isOpen,
        isTopLevel,
        setCategoryId,
        showCreateAccount,
        showForgotPassword,
        showMainMenu,
        showMyAccount,
        showSignIn,
        view
    } = useNavigation({ customerQuery: GET_CUSTOMER_QUERY });

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClassName = isOpen ? classes.root_open : classes.root;
    const modalClassName = hasModal ? classes.modal_open : classes.modal;
    const bodyClassName = hasModal ? classes.body_masked : classes.body;
    const rootHeaderClassName =
        isTopLevel && view === 'MENU' ? classes.isRoot : classes.header;

    // Lazy load the auth modal because it may not be needed.
    const authModal = hasModal ? (
        <Suspense fallback={<LoadingIndicator />}>
            <AuthModal
                closeDrawer={handleClose}
                showCreateAccount={showCreateAccount}
                showForgotPassword={showForgotPassword}
                showMainMenu={showMainMenu}
                showMyAccount={showMyAccount}
                showSignIn={showSignIn}
                view={view}
            />
        </Suspense>
    ) : null;

    return (
    <React.Fragment>
        <AuthBar
            disabled={hasModal}
            showMyAccount={showMyAccount}
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
