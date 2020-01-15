import React, { Suspense } from 'react';
import { bool, number, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Checkout from '../Checkout';
import CheckoutButton from '../Checkout/checkoutButton';

import defaultClasses from './footer.css';
import TotalsSummary from './totalsSummary';

const Footer = props => {
    const {
        currencyCode,
        isMiniCartMaskOpen,
        numItems,
        setStep,
        step,
        subtotal
    } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const footerClassName = isMiniCartMaskOpen
        ? classes.root_open
        : classes.root;
    const placeholderButton = (
        <div className={classes.placeholderButton}>
            <CheckoutButton disabled={true} />
        </div>
    );

    return (
    <React.Fragment>
        <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="buttons-cart--inner">
                    <div className="buttons-cart">
                        <a href="#">Continue Shopping</a>
                    </div>
                    <div className="buttons-cart checkout--btn">
                        <a href="#">update</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12">
            <div className="ht__coupon__code">
                <span>enter your discount code</span>
                <div className="coupon__box">
                    <input type="text" placeholder=""/>
                    <div className="ht__cp__btn">
                        <a href="#">enter</a>
                    </div>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-sm-12 col-xs-12 smt-40 xmt-40">
            <div className="htc__cart__total">
                <h6>cart total</h6>
                <TotalsSummary
                    currencyCode={currencyCode}
                    numItems={numItems}
                    subtotal={subtotal}
                />
                <Suspense fallback={placeholderButton}>
                    <Checkout setStep={setStep} step={step} />
                </Suspense>
            </div>
        </div>
            
            
        </div>
    </React.Fragment>
    );
};

Footer.propTypes = {
    cart: object,
    classes: shape({
        placeholderButton: string,
        root: string,
        root_open: string,
        summary: string
    }),
    currencyCode: string,
    isMiniCartMaskOpen: bool,
    numItems: number,
    subtotal: number
};

export default Footer;
