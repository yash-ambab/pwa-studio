import { useCallback, useState } from 'react';

import { useAppContext } from '@magento/peregrine/lib/context/app';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useCheckoutContext } from '@magento/peregrine/lib/context/checkout';

import getCurrencyCode from '@magento/peregrine/lib/util/getCurrencyCode';

export const useMiniCart = () => {
    const [{ drawer }, { closeDrawer }] = useAppContext();
    const [cartState] = useCartContext();
    const [, { cancelCheckout }] = useCheckoutContext();
    const [step, setStep] = useState('cart');

    const { isLoading, isUpdatingItem } = cartState;

    const [isEditingItem, setIsEditingItem] = useState(false);

    const currencyCode = getCurrencyCode(cartState);
    const cartItems = cartState.details.items;
    const numItems = cartState.details.items_qty;
    const subtotal = cartState.totals.subtotal;

    const shouldShowFooter =
        step === 'receipt' ||
        step === 'form' ||
        !((cartState.isEmpty && step === 'cart') || isLoading || isEditingItem);

    const isMiniCartMaskOpen = step === 'form';
    const isOpen = drawer === 'cart';

    const handleClose = useCallback(() => {
        setStep('cart');
        setIsEditingItem(false);
        closeDrawer();
    }, [closeDrawer, setStep]);

    const handleBeginEditItem = useCallback(() => {
        setIsEditingItem(true);
    }, []);

    const handleEndEditItem = useCallback(() => {
        setIsEditingItem(false);
    }, []);

    const handleDismiss = useCallback(() => {
        setStep('cart');
        cancelCheckout();
    }, [cancelCheckout]);

    return {
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
    };
};
