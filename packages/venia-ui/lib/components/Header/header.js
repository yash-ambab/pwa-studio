import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';
import Menu from '../Menu';
import CartTrigger from './cartTrigger';
import SearchTrigger from './searchTrigger';
import Navigation from '../Navigation';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '../../classify';
import defaultClasses from './header.css';

import myStyles from 'style-loader!css-loader!../../../assets/style.css';


const SearchBar = React.lazy(() => import('../SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen
    } = useHeader();
    const classes = mergeClasses(defaultClasses, props.classes, myStyles);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = searchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route
                render={({ history, location }) => (
                    <SearchBar
                        isOpen={searchOpen}
                        history={history}
                        location={location}
                        onHandleClick={handleSearchTriggerClick}
                    />
                )}
            />
        </Suspense>
    ) : null;

    return (
        <React.Fragment>
        <header id="htc__header" className="htc__header__area header--one">
        <OnlineIndicator
            hasBeenOffline={hasBeenOffline}
            isOnline={isOnline}
        />
    <div id="sticky-header-with-topbar" className="mainmenu__wrap sticky__header">
        <div className="container">
            <div className="row">
                <div className="menumenu__container clearfix">
                    <div className="col-lg-2 col-md-2 col-sm-3 col-xs-5"> 
                        <div className="logo">
                             <Link to={resourceUrl('/')}>
                                <Logo classes={{ logo: classes.logo }} />
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-7 col-lg-8 col-sm-5 col-xs-3">
                        <nav className="main__menu__nav hidden-xs hidden-sm">
                            <Menu/>
                        </nav> 
                    </div>
                    <div className="col-md-3 col-lg-2 col-sm-4 col-xs-4">
                        <div className="header__right">
                            <Navigation />
                            <SearchTrigger
                                active={searchOpen}
                                onClick={handleSearchTriggerClick}
                            />
                            <CartTrigger />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mobile-menu-area"></div>
        </div>
    </div>
    {searchBar}
</header>
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
