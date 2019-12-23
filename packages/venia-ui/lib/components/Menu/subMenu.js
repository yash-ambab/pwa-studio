import React from 'react';
import { func, number, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './subMenu.css';
import { Link, resourceUrl } from '../../drivers';
const suffix = '.html';
const subMenu = props => {
    const { category } = props;
    const { name, url_path, children_count } = category;
    const destination = resourceUrl(`/${url_path}${suffix}`);
        
    return (
            <Link to={destination}>
                <span>{name}</span>
            </Link>
    );
    
};

export default subMenu;