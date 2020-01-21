import React, { Fragment, Suspense } from 'react';
import { arrayOf, bool, number, shape, string } from 'prop-types';
import { Form } from 'informed';

import { Price } from '@magento/peregrine';
import { useProductFullDetail } from '@magento/peregrine/lib/talons/ProductFullDetail/useProductFullDetail';
import { isProductConfigurable } from '@magento/peregrine/lib/util/isProductConfigurable';

import Breadcrumbs from '../Breadcrumbs';
import Button from '../Button';
import Carousel from '../ProductImageCarousel';
import { fullPageLoadingIndicator } from '../LoadingIndicator';
import Quantity from '../ProductQuantity';
import RichText from '../RichText';
import ADD_CONFIGURABLE_MUTATION from '../../queries/addConfigurableProductsToCart.graphql';
import ADD_SIMPLE_MUTATION from '../../queries/addSimpleProductsToCart.graphql';
import CREATE_CART_MUTATION from '../../queries/createCart.graphql';
import GET_CART_DETAILS_QUERY from '../../queries/getCartDetails.graphql';

import defaultClasses from './productFullDetail.css';
import { mergeClasses } from '../../classify';

import shareUrl from '../Logo/logo.png';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const Options = React.lazy(() => import('../ProductOptions'));

const ProductFullDetail = props => {
    const { product } = props;

    const talonProps = useProductFullDetail({
        addConfigurableProductToCartMutation: ADD_CONFIGURABLE_MUTATION,
        addSimpleProductToCartMutation: ADD_SIMPLE_MUTATION,
        createCartMutation: CREATE_CART_MUTATION,
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        product
    });

    const {
        breadcrumbCategoryId,
        handleAddToCart,
        handleSelectionChange,
        handleSetQuantity,
        isAddToCartDisabled,
        mediaGalleryEntries,
        productDetails,
        quantity
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);

    const options = isProductConfigurable(product) ? (
        <Suspense fallback={fullPageLoadingIndicator}>
            <Options
                onSelectionChange={handleSelectionChange}
                options={product.configurable_options}
            />
        </Suspense>
    ) : null;

    const breadcrumbs = breadcrumbCategoryId ? (
        <Breadcrumbs
            categoryId={breadcrumbCategoryId}
            currentProduct={productDetails.name}
        />
    ) : null;

    return (
        <Fragment>
            <section className="htc__product__details bg__white ptb--30">
                <div className="htc__product__details__top">
                    <div className="container">
                        <div className="row">
                        {breadcrumbs}
                        <Form>
                            <div className="col-md-5 col-lg-5 col-sm-12 col-xs-12">
                                <Carousel images={mediaGalleryEntries} />
                            </div>
                            <div className="col-md-7 col-lg-7 col-sm-12 col-xs-12 smt-40 xmt-40">
                                <div className="ht__product__dtl">
                                    <h2>{productDetails.name}</h2>
                                    <h6>SKU: <span>{productDetails.sku}</span></h6>
                                    <ul className="pro__prize">
                                        <li><Price
                                            currencyCode={productDetails.price.currency}
                                            value={productDetails.price.value}
                                        /></li>
                                    </ul>
                                    <div className="ht__pro__desc">
                                        {options}
                                        <div className="sin__desc align--left">
                                            <p><span>Quantity:</span></p>
                                            <Quantity
                                                initialValue={quantity}
                                                onValueChange={handleSetQuantity}
                                            />
                                        </div>
                                    </div>
                                    <div className="ht__pro__desc add-to-cart-btn">
                                        <Button
                                            priority="high"
                                            onClick={handleAddToCart}
                                            disabled={isAddToCartDisabled}
                                        >
                                            Add to Cart
                                        </Button>
                                    </div>
                                    <FacebookShareButton url={shareUrl}>
                                        <FacebookIcon size={32} round={true} />
                                    </FacebookShareButton>

                                    <TwitterShareButton url={shareUrl}>
                                        <TwitterIcon size={32} round={true} />
                                    </TwitterShareButton>

                                    <WhatsappShareButton url={shareUrl}>
                                        <WhatsappIcon size={32} round={true} />
                                    </WhatsappShareButton>

                                    <EmailShareButton url={shareUrl}>
                                        <EmailIcon size={32} round={true} />
                                    </EmailShareButton>
                                    
                                </div>
                            </div>
                        </Form>
                        </div>
                    </div>
                </div>
            </section>
             <section className="htc__produc__decription bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                                <ul className="pro__details__tab" role="tablist">
                                    <li className="description active">
                                        <a href="#description" role="tab" data-toggle="tab" aria-expanded="true">Product Description</a>
                                    </li>
                                </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div class="ht__pro__details__content">
                                <RichText content={productDetails.description} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

ProductFullDetail.propTypes = {
    classes: shape({
        cartActions: string,
        description: string,
        descriptionTitle: string,
        details: string,
        detailsTitle: string,
        imageCarousel: string,
        options: string,
        productName: string,
        productPrice: string,
        quantity: string,
        quantityTitle: string,
        root: string,
        title: string
    }),
    product: shape({
        __typename: string,
        id: number,
        sku: string.isRequired,
        price: shape({
            regularPrice: shape({
                amount: shape({
                    currency: string.isRequired,
                    value: number.isRequired
                })
            }).isRequired
        }).isRequired,
        media_gallery_entries: arrayOf(
            shape({
                label: string,
                position: number,
                disabled: bool,
                file: string.isRequired
            })
        ),
        description: string
    }).isRequired
};

export default ProductFullDetail;
