import React, { lazy, Suspense } from 'react';
import { Switch, Route } from '@magento/venia-drivers';
import { Page } from '@magento/peregrine';
import ErrorView from '../ErrorView/index';

const Cart = lazy(() => import("../FullCart/index"));
const Checkout = lazy(() => import("../Checkout/index"));
const CreateAccountPage = lazy(() => import('../CreateAccountPage/index'));
const SignInPage = lazy(() => import('../SignInPage/index'));
const ForgotPasswordPage = lazy(() => import('../ForgotPassword/index'));
const Search = lazy(() => import('../../RootComponents/Search'));

const renderRoutingError = props => <ErrorView {...props} />;

const renderRoutes = () => (
    <Suspense fallback={null}>
        <Switch>
        	<Route exact path="/cart" component={Cart} />
        	<Route exact path="/checkout" component={Checkout} />
            <Route exact path="/search.html" component={Search} />
            <Route exact path="/create-account" component={CreateAccountPage} />
            <Route exact path="/sign-in" component={SignInPage} />
            <Route exact path="/forgot-password" component={ForgotPasswordPage} />
            <Route render={() => <Page>{renderRoutingError}</Page>} />
        </Switch>
    </Suspense>
);

export default renderRoutes;
