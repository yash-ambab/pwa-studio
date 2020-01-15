import React from 'react';
import { array, bool, func, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import LoadingIndicator from '../LoadingIndicator';

import EditItem from './editItem';
import EmptyMiniCartBody from './emptyMiniCartBody';
import ProductList from './productList';
import { useBody } from '@magento/peregrine/lib/talons/MiniCart/useBody';

const Body = props => {
    const {
        beginEditItem,
        cartItems,
        closeDrawer,
        currencyCode,
        endEditItem,
        isCartEmpty,
        isEditingItem,
        isLoading,
        isUpdatingItem
    } = props;

    const talonProps = useBody({
        beginEditItem,
        endEditItem
    });

    const { editItem, handleBeginEditItem, handleEndEditItem } = talonProps;

    if (isUpdatingItem) {
        return <LoadingIndicator>{'Updating Cart...'}</LoadingIndicator>;
    }

    if (isLoading) {
        return <LoadingIndicator>{`Fetching Cart...`}</LoadingIndicator>;
    }

    if (isCartEmpty) {
        return <EmptyMiniCartBody closeDrawer={closeDrawer} />;
    }

    if (isEditingItem) {
        return (
            <EditItem
                currencyCode={currencyCode}
                endEditItem={handleEndEditItem}
                isUpdatingItem={isUpdatingItem}
                item={editItem}
            />
        );
    }

    return (
        <React.Fragment>
            <ProductList
                beginEditItem={handleBeginEditItem}
                cartItems={cartItems}
                currencyCode={currencyCode}
            />
        </React.Fragment>
    );
};

Body.propTypes = {
    beginEditItem: func.isRequired,
    cartItems: array,
    classes: shape({
        root: string
    }),
    closeDrawer: func,
    currencyCode: string,
    editItem: object,
    endEditItem: func,
    isCartEmpty: bool,
    isEditingItem: bool,
    isLoading: bool,
    isUpdatingItem: bool
};

export default Body;
