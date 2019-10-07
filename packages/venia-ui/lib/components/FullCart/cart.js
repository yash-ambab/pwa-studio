import React from "react"
import { useMiniCart } from "@magento/peregrine/lib/talons/MiniCart/useMiniCart"

import CartBody from "../MiniCart/body"
import defaultClasses from "./cart.css"

const Cart = props => {
    const {
        cartItems,
        cartState,
        currencyCode,
        handleBeginEditItem,
        handleDismiss,
        handleEndEditItem,
        handleClose,
        handleUpdateItemInCart,
        isEditingItem,
        isLoading,
        isMiniCartMaskOpen,
        isUpdatingItem,
        numItems,
        removeItemFromCart,
        setStep,
        shouldShowFooter,
        step,
        subtotal
    } = useMiniCart()

    return (
        <div className={defaultClasses.root}>
            <CartBody
                beginEditItem={handleBeginEditItem}
                cartItems={cartItems}
                closeDrawer={handleClose}
                currencyCode={currencyCode}
                endEditItem={handleEndEditItem}
                isCartEmpty={cartState.isEmpty}
                isEditingItem={isEditingItem}
                isLoading={isLoading}
                isUpdatingItem={isUpdatingItem}
                removeItemFromCart={removeItemFromCart}
                updateItemInCart={handleUpdateItemInCart}
            />
        </div>
    )
}

export default Cart
