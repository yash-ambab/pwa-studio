import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { X as CloseIcon } from 'react-feather';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';
import Trigger from '../Trigger';

import defaultClasses from './header.css';
import { useHeader } from '@magento/peregrine/lib/talons/MiniCart/useHeader';

const Header = props => {
    const { closeDrawer, isEditingItem } = props;

    const talonProps = useHeader({
        closeDrawer
    });

    const { handleClick } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    const title = isEditingItem ? 'Edit Cart Item' : 'Shopping Cart';

    return (
        <React.Fragment>
        <div className="offsetmenu__close__btn">
            <Trigger action={handleClick}>
                <i className="zmdi zmdi-close"></i>
            </Trigger>
        </div>
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        root: string,
        title: string
    }),
    closeDrawer: func,
    isEditingItem: bool
};

export default Header;
