import React from 'react';
import { shape, string } from 'prop-types';

import { useMiniCart } from '@magento/peregrine/lib/talons/MiniCart/useMiniCart';

import Body from './body';
import Footer from './footer';
import Mask from './mask';


const Cart = props => {
    const {
        cartItems,
        cartState,
        currencyCode,
        handleBeginEditItem,
        handleDismiss,
        handleEndEditItem,
        handleClose,
        isEditingItem,
        isLoading,
        isMiniCartMaskOpen,
        isOpen,
        isUpdatingItem,
        numItems,
        setStep,
        shouldShowFooter,
        step,
        subtotal
    } = useMiniCart();

    const footer = shouldShowFooter ? (
        <Footer
            currencyCode={currencyCode}
            isMiniCartMaskOpen={isMiniCartMaskOpen}
            numItems={numItems}
            setStep={setStep}
            step={step}
            subtotal={subtotal}
        />
    ) : null;


    return (
        <React.Fragment>
            <div className="cart-main-area ptb--30 bg__white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <Body
                                beginEditItem={handleBeginEditItem}
                                cartItems={cartItems}
                                closeDrawer={handleClose}
                                currencyCode={currencyCode}
                                endEditItem={handleEndEditItem}
                                isCartEmpty={cartState.isEmpty}
                                isEditingItem={isEditingItem}
                                isLoading={isLoading}
                                isUpdatingItem={isUpdatingItem}
                            />
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

Cart.propTypes = {
    classes: shape({
        header: string,
        root: string,
        root_open: string,
        title: string
    })
};

export default Cart;
