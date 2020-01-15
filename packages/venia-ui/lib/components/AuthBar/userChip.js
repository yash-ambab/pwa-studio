import React from 'react';
import {
    ChevronRight as ChevronRightIcon,
    User as UserIcon
} from 'react-feather';
import { func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import defaultClasses from './userChip.css';
import { useUserChip } from '@magento/peregrine/lib/talons/AuthBar/useUserChip';

const UserChip = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { display, handleClick } = useUserChip(props);

    return (
        <button className={classes.root} onClick={handleClick}>
            <i className="icon-user icons"></i>
            <span>{display}</span>
        </button>
    );
};

export default UserChip;

UserChip.propTypes = {
    classes: shape({
        email: string,
        fullName: string,
        icon: string,
        root: string,
        user: string
    }),
    showMyAccount: func.isRequired,
    user: shape({
        email: string,
        firstname: string,
        lastname: string
    })
};
