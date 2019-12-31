import React from 'react';
import { shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import defaultClasses from './fieldIcons.css';

const FieldIcons = props => {
    const { after, before, children } = props;

    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
};

FieldIcons.propTypes = {
    classes: shape({
        after: string,
        before: string,
        root: string
    })
};

export default FieldIcons;
