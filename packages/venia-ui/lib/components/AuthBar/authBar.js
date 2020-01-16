import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Button from '../Button';
import UserChip from './userChip';
import defaultClasses from './authBar.css';
import { useAuthBar } from '@magento/peregrine/lib/talons/AuthBar/useAuthBar';

import { useHistory } from 'react-router-dom';

const AuthBar = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const history = useHistory();
    const {
        currentUser,
        handleShowMyAccount,
        handleSignIn,
        isSignedIn,
        isSignInDisabled
    } = useAuthBar(props);

    const child = isSignedIn ? (
        <UserChip user={currentUser} showMyAccount={handleShowMyAccount} />
    ) : (
        <Button
            disabled={isSignInDisabled}
            priority="high"
            onClick={() => {history.push('sign-in')}}
        >
            <i className="icon-user icons"></i>
        </Button>
    );

    return <div className="header__search search search__open">{child}</div>;
};

export default AuthBar;

AuthBar.propTypes = {
    classes: shape({
        root: string
    }),
    disabled: bool,
    showMyAccount: func.isRequired,
    showSignIn: func.isRequired
};
