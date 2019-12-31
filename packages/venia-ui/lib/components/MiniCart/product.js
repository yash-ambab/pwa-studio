import React, { useMemo } from 'react';
import { array, func, number, shape, string } from 'prop-types';

import { Price } from '@magento/peregrine';
import { useProduct } from '@magento/peregrine/lib/talons/MiniCart/useProduct';
import { transparentPlaceholder } from '@magento/peregrine/lib/util/images';

import { mergeClasses } from '../../classify';
import Image from '../Image';
import Kebab from './kebab';
import defaultClasses from './product.css';
import ProductOptions from './productOptions';
import Section from './section';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import REMOVE_ITEM_MUTATION from '../../queries/removeItem.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';

const PRODUCT_IMAGE_WIDTH = 80;

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

    const classes = mergeClasses(defaultClasses, props.classes);

    const productImageComponent = useMemo(() => {
        const imageProps = {
            alt: productName,
            classes: { image: classes.image, root: classes.imageContainer },
            width: PRODUCT_IMAGE_WIDTH
        };

        if (!productImage) {
            imageProps.src = transparentPlaceholder;
        } else {
            imageProps.resource = productImage;
        }

        return <Image {...imageProps} />;
    }, [classes.image, classes.imageContainer, productImage, productName]);

    const mask = isLoading ? <div className="body__overlay" /> : null;

    return (
        <React.Fragment>
        <div className="shp__single__product">
            <div className="shp__pro__thumb">
                {productImageComponent}
            </div>
            <div className="shp__pro__details">
                <h2>{productName}</h2>
                <ProductOptions options={productOptions} />
                <span className="quantity">QTY: {productQuantity}</span>
                <span className="shp__price">
                        <Price
                            currencyCode={currencyCode}
                            value={productPrice}
                        />
                </span>
            </div>
            <div className="remove__btn">
                <button onClick={handleRemoveItem} title="Remove this item"><i className="zmdi zmdi-close"></i></button>
            </div>
        </div>
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
