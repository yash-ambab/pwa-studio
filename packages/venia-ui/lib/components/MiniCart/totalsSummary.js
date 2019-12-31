import React from 'react';
import { number, shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';

import defaultClasses from './totalsSummary.css';

const TotalsSummary = props => {
    // Props.
    const { currencyCode, numItems, subtotal } = props;

    // Members.
    const classes = mergeClasses(defaultClasses, props.classes);
    const hasSubtotal = Boolean(subtotal);
    const numItemsText = numItems === 1 ? 'item' : 'items';

    return (
        <React.Fragment>
            {hasSubtotal && (
                <ul className="shoping__total">
                    <li className="subtotal">
                            {'Cart Total : '}
                    </li>
                    <li class="total__price">
                        <Price
                            currencyCode={currencyCode}
                            value={subtotal}
                        />
                    </li>
                    {/*<li class="total__price">
                        ({numItems} {numItemsText})
                    </li>*/}
                </ul>
            )}

        </React.Fragment>
    );
};

TotalsSummary.propTypes = {
    classes: shape({
        root: string,
        subtotalLabel: string,
        subtotalValue: string,
        totals: string
    }),
    currencyCode: string,
    numItems: number,
    subtotal: number
};

export default TotalsSummary;
