import React from 'react';
import { bool, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Mask from '../Mask';


const MiniCartMask = props => {
    const { dismiss, isActive } = props;

    // We're rendering the shared Mask component but passing it
    // our own custom class for its active state.
    return (
        <Mask
            dismiss={dismiss}
            isActive={isActive}
        />
    );
};

MiniCartMask.propTypes = {
    classes: shape({
        root_active: string
    }),
    dismiss: func,
    isActive: bool
};

export default MiniCartMask;
