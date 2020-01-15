import React, { useMemo } from 'react';
import { array, func, number, shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';
import { useProduct } from '@magento/peregrine/lib/talons/MiniCart/useProduct';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';

import { mergeClasses } from '../../classify';
import Image from '../Image';
import Kebab from './kebab';
import ProductOptions from './productOptions';
import Section from './section';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import REMOVE_ITEM_MUTATION from '../../queries/removeItem.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';

const PRODUCT_IMAGE_WIDTH = 290;

const Product = props => {
    const { beginEditItem, currencyCode, item } = props;

    const talonProps = useProduct({
        beginEditItem,
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        item,
        removeItemMutation: REMOVE_ITEM_MUTATION
    });

    const {
        handleEditItem,
        handleFavoriteItem,
        handleRemoveItem,
        isFavorite,
        isLoading,
        productImage,
        productName,
        productOptions,
        productPrice,
        productQuantity
    } = talonProps;


    const productImageComponent = useMemo(() => {
        const imageProps = {
            alt: productName,
            width: PRODUCT_IMAGE_WIDTH
        };

        if (!productImage) {
            imageProps.src = transparentPlaceholder;
        } else {
            imageProps.resource = productImage;
        }

        return <Image {...imageProps} />;
    }, [productImage, productName]);

    const mask = isLoading ? <div className="body__overlay" /> : null;

    return (
        <React.Fragment>
        <tr>
            <td className="product-thumbnail">
                {productImageComponent}
            </td>
            <td className="product-name">
                {productName} <br/>
                <ProductOptions options={productOptions} />
            </td>
            <td className="product-price">
                <span className="amount">
                    <Price
                        currencyCode={currencyCode}
                        value={productPrice}
                    />
                </span>
            </td>
            <td className="product-quantity">
                QTY: {productQuantity}
            </td>
            <td className="product-subtotal">
                <Price
                    currencyCode={currencyCode}
                    value={productPrice}
                />
            </td>
            <td className="product-remove">
                <button onClick={handleRemoveItem} title="Remove this item"><i className="icon-trash icons"></i></button>
            </td>
        </tr>
        </React.Fragment>
    );
};

Product.propTypes = {
    beginEditItem: func.isRequired,
    currencyCode: string,
    item: shape({
        image: shape({
            file: string
        }),
        name: string,
        options: array,
        price: number,
        qty: number
    }).isRequired
};

export default Product;
