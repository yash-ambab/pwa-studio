import React from 'react';
import { shape, string } from 'prop-types';
import { Search as SearchIcon } from 'react-feather';

import Icon from '../Icon';

import { mergeClasses } from '../../classify';
import defaultClasses from './searchTrigger.css';
import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';

const SearchTrigger = props => {
    const { active, onClick } = props;
    const talonProps = useSearchTrigger({
        onClick
    });
    const { handleClick } = talonProps;
    const classes = mergeClasses(defaultClasses, props.classes);
    const searchClass = active ? classes.open : classes.root;

    return (
        <React.Fragment>
        <div className="header__account">
            <button
            className={searchClass}
            aria-label={'Search'}
            onClick={handleClick}
        >
            <i className="icon-magnifier icons"></i>
        </button>
        </div>
        </React.Fragment>
    );
};

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;
