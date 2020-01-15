import React from 'react';
import { number, shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';

import { mergeClasses } from '../../classify';


const TotalsSummary = props => {
    // Props.
    const { currencyCode, numItems, subtotal } = props;

    // Members.
    const hasSubtotal = Boolean(subtotal);
    const numItemsText = numItems === 1 ? 'item' : 'items';

    return (
        <React.Fragment>

                    
                    
                
            {hasSubtotal && (
                <div className="cart__desk__list">
                        <ul className="cart__desc">
                            <li>{'Cart Total'}</li>
                            <li>{'Tax'}</li>
                            <li>{'Shipping'}</li>
                        </ul>
                        <ul className="cart__price">
                            <li><Price
                                currencyCode={currencyCode}
                                value={subtotal}
                            /></li>
                            <li>$9.00</li>
                            <li>0</li>
                        </ul>
                </div>
            )}
            <div className="cart__total">
                    <span>{'Order Total'}</span>
                    <span>US$402.00</span>
                </div>
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
