import React, { useMemo } from 'react';
import { array, func, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';

import Product from './product';

const ProductList = props => {
    const { beginEditItem, cartItems, currencyCode } = props;

    const products = useMemo(
        () =>
            cartItems.map(product => {
                return (
                    <Product
                        beginEditItem={beginEditItem}
                        currencyCode={currencyCode}
                        item={product}
                        key={product.id}
                    />
                );
            }),
        [beginEditItem, cartItems, currencyCode]
    );

    return(

        <React.Fragment>
            <div className="table-content table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th className="product-thumbnail">products</th>
                            <th className="product-name">name of products</th>
                            <th className="product-price">Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-subtotal">Total</th>
                            <th className="product-remove">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </table>
            </div>
        </React.Fragment>

    );
};

ProductList.propTypes = {
    beginEditItem: func,
    cartItems: array,
    classes: shape({
        root: string
    }),
    currencyCode: string
};

export default ProductList;
