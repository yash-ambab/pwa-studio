import React, { createContext, useContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { func, object, string } from 'prop-types';

const RouterContext = createContext();

const MagentoRouter = props => {
    const { apiBase, children, routerProps, using: Router } = props;

    return (
        <Router {...routerProps}>
            <Route>
                {routeProps => (
                    <Provider value={{ apiBase, ...routeProps }}>
                        {children}
                    </Provider>
                )}
            </Route>
        </Router>
    );
};

MagentoRouter.propTypes = {
    apiBase: string.isRequired,
    routerProps: object,
    using: func // e.g., BrowserRouter, MemoryRouter
};

MagentoRouter.defaultProps = {
    routerProps: {},
    using: BrowserRouter
};

export default MagentoRouter;

export const useRouter = () => useContext(RouterContext);

export const { Consumer, Provider } = RouterContext;
