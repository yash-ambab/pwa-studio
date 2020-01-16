import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import { fullPageLoadingIndicator } from '../LoadingIndicator';
import MagentoRoute from '../MagentoRoute';

const Cart = lazy(() => import("../FullCart/index"));
const Checkout = lazy(() => import("../Checkout/index"));
const CreateAccountPage = lazy(() => import('../CreateAccountPage'));
const SignInPage = lazy(() => import('../SignInPage/index'));
const ForgotPasswordPage = lazy(() => import('../ForgotPassword/index'));
const Search = lazy(() => import('../../RootComponents/Search'));

const Routes = () => {
    return (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Switch>
                <Route exact path="/cart">
                    <Cart />
                </Route>
                <Route exact path="/checkout">
                    <Checkout />
                </Route>
                <Route exact path="/search.html">
                    <Search />
                </Route>
                <Route exact path="/create-account">
                    <CreateAccountPage />
                </Route>
                <Route exact path="/sign-in">
                    <SignInPage />
                </Route>
                <Route exact path="/forgot-password">
                    <ForgotPasswordPage />
                </Route>
                <Route>
                    <MagentoRoute />
                </Route>
            </Switch>
        </Suspense>
    );
};

export default Routes;
