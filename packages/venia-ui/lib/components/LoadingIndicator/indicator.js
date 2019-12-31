import React from 'react';

import defaultClasses from './indicator.css';
import { mergeClasses } from '../../classify';
import Image from '../Image';

import logo from '../Logo/loader.png';

const LoadingIndicator = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const className = props.global ? classes.global : classes.root;

    return (
        <span className="Loading">
            <Image
                alt="Loading indicator"
                displayPlaceholder={false}
                height="43"
                src={logo}
                width="36"
            />
            <span className={classes.message}>{props.children}</span>
        </span>
    );
};

export default LoadingIndicator;
