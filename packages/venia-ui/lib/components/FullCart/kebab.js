import React from 'react';
import { node, shape, string } from 'prop-types';
import { MoreVertical as MoreVerticalIcon } from 'react-feather';

import { mergeClasses } from '../../classify';
import Icon from '../Icon';

import { useKebab } from '@magento/peregrine/lib/talons/MiniCart/useKebab';

const Kebab = props => {
    const { handleKebabClick, isOpen, kebabRef } = useKebab();
    const { children } = props;
    const toggleClass = isOpen ? classes.dropdown_active : classes.dropdown;

    return (
        <div className={classes.root}>
            <button
                className={classes.kebab}
                onClick={handleKebabClick}
                ref={kebabRef}
            >
                <Icon src={MoreVerticalIcon} />
            </button>
            <ul className={toggleClass}>{children}</ul>
        </div>
    );
};

Kebab.propTypes = {
    children: node,
    classes: shape({
        dropdown: string,
        dropdown_active: string,
        kebab: string,
        root: string
    })
};

export default Kebab;