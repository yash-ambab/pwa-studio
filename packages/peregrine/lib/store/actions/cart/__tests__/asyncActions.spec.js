import { Magento2 } from '../../../../RestApi';
import {
    mockGetItem,
    mockRemoveItem,
    mockSetItem
} from '../../../../util/simplePersistence';
import actions from '../actions';
import {
    addItemToCart,
    updateItemInCart,
    removeItemFromCart,
    createCart,
    getCartDetails,
    removeCart,
    writeImageToCache
} from '../asyncActions';

jest.mock('../../../../RestApi');
jest.mock('../../../../util/simplePersistence');

const { request } = Magento2;
const dispatch = jest.fn();
const fetchCartId = jest.fn().mockResolvedValue({
    data: {
        cartId: 'CART_ID_FROM_GRAPHQL'
    }
});
const getState = jest.fn(() => ({
    app: { drawer: null },
    cart: { cartId: 'CART_ID' },
    user: { isSignedIn: false }
}));
const thunkArgs = [dispatch, getState];

describe('createCart', () => {
    test('it returns a thunk', () => {
        expect(
            createCart({
                fetchCartId
            })
        ).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: false }
        }));

        const result = await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('its thunk earlies out if a cartId already exists in state', async () => {
        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(dispatch).not.toHaveBeenCalled();
        expect(fetchCartId).not.toHaveBeenCalled();
    });

    test('its thunk uses the cart from storage', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: false }
        }));
        const storedCartId = 'STORED_CART_ID';
        mockGetItem.mockImplementationOnce(() => storedCartId);

        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(mockGetItem).toHaveBeenCalledWith('cartId');
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1, actions.getCart.request());
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getCart.receive(storedCartId)
        );

        expect(fetchCartId).not.toHaveBeenCalled();
    });

    test('its thunk dispatches actions on success', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: false }
        }));

        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(dispatch).toHaveBeenNthCalledWith(1, actions.getCart.request());
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getCart.receive('CART_ID_FROM_GRAPHQL')
        );
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(mockSetItem).toHaveBeenCalledWith(
            'cartId',
            'CART_ID_FROM_GRAPHQL'
        );
    });

    test('its thunk calls endpoints when user is signed in', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: true }
        }));

        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(fetchCartId).toHaveBeenCalledTimes(1);
    });

    test('its thunk dispatches actions with custom error on errors from mutation', async () => {
        mockGetItem.mockImplementationOnce(() => {});
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: false }
        }));

        const errors = ['AN ERROR FROM GQL'];
        fetchCartId.mockResolvedValue({ errors });

        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(dispatch).toHaveBeenNthCalledWith(1, actions.getCart.request());
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getCart.receive(new Error(errors))
        );
        expect(dispatch).toHaveBeenCalledTimes(2);
    });

    test('its thunk dispatches actions with error on error', async () => {
        mockGetItem.mockImplementationOnce(() => {});
        getState.mockImplementationOnce(() => ({
            cart: {},
            user: { isSignedIn: false }
        }));

        const error = new Error('Woof');
        fetchCartId.mockRejectedValueOnce(error);

        await createCart({
            fetchCartId
        })(...thunkArgs);

        expect(dispatch).toHaveBeenNthCalledWith(1, actions.getCart.request());
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getCart.receive(error)
        );
        expect(dispatch).toHaveBeenCalledTimes(2);
    });
});

describe('addItemToCart', () => {
    const payload = {
        item: { sku: 'ITEM' },
        quantity: 1,
        addItemMutation: jest.fn().mockResolvedValue()
    };

    test('it returns a thunk', () => {
        expect(addItemToCart()).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        const result = await addItemToCart(payload)(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('its thunk dispatches actions on success', async () => {
        // Call the function.
        await addItemToCart(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(4);
        // Make assertions.
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.addItem.request(payload)
        );
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
        // toggleDrawer
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        expect(dispatch).toHaveBeenNthCalledWith(4, actions.addItem.receive());
    });

    test('its thunk tries to recreate a cart on non-network, invalid cart failure', async () => {
        const error = new Error('ERROR');
        error.networkError = false;
        error.graphQLErrors = [
            {
                message: 'Could not find a cart'
            }
        ];

        const customPayload = {
            ...payload,
            addItemMutation: jest.fn().mockRejectedValueOnce(error)
        };
        await addItemToCart({
            ...customPayload
        })(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(9);

        /*
         * Initial attempt will fail.
         */

        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.addItem.request(customPayload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.addItem.receive(error)
        );
        // removeCart
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(5, expect.any(Function));

        /*
         * And then the thunk is called again.
         */
        expect(dispatch).toHaveBeenNthCalledWith(
            6,
            actions.addItem.request(customPayload)
        );
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(7, expect.any(Function));
        // toggleDrawer
        expect(dispatch).toHaveBeenNthCalledWith(8, expect.any(Function));
        // addItem.receive
        expect(dispatch).toHaveBeenNthCalledWith(9, actions.addItem.receive());
    });
});

describe('removeItemFromCart', () => {
    const removeItem = jest.fn().mockResolvedValue();
    const payload = { item: { item_id: 1 }, removeItem };

    test('it returns a thunk', () => {
        expect(removeItemFromCart(payload)).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        getState.mockImplementationOnce(() => ({
            cart: { cartId: 'SOME_CART_ID', details: { items_count: 2 } }
        }));
        const result = await removeItemFromCart(payload)(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('its thunk dispatches actions on success', async () => {
        getState.mockImplementationOnce(() => ({
            cart: { cartId: 'SOME_CART_ID', details: { items_count: 2 } }
        }));

        await removeItemFromCart(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.removeItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.removeItem.receive()
        );
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
    });

    test('its thunk tries to recreate a cart on invalid cart failure', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {
                cartId: 'CART_ID',
                details: { id: 'HASH_ID', items_count: 2 }
            }
        }));
        const error = {
            networkError: false,
            graphQLErrors: [
                {
                    message: 'Could not find a cart'
                }
            ]
        };
        removeItem.mockRejectedValueOnce(error);

        await removeItemFromCart({
            ...payload,
            removeItem
        })(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(5);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.removeItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.removeItem.receive(error)
        );
        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
    });
});

describe('updateItemInCart', () => {
    const cartItemId = 2;
    const payload = {
        item: { item_id: 1 },
        quantity: 1,
        cartItemId,
        productType: 'ConfigurableProduct'
    };

    test('it returns a thunk', () => {
        expect(updateItemInCart(payload)).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        const result = await updateItemInCart(payload)(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('its thunk dispatches actions on success', async () => {
        await updateItemInCart(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.updateItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(2, expect.any(Function));
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        expect(dispatch).toHaveBeenNthCalledWith(
            4,
            actions.updateItem.receive()
        );
    });

    //TODO: Unskip when removeItem is converted to graphql.
    test.skip('its thunk tries to recreate a cart and add the updated item to it on an invalid cart failure', async () => {
        const error = {
            networkError: false,
            graphQLErrors: [
                {
                    message: 'Could not find a cart'
                }
            ]
        };

        await updateItemInCart({
            ...payload,
            removeItem: jest.fn().mockRejectedValueOnce(error)
        })(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(7);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.updateItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.updateItem.receive(error)
        );
        // removeCart
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
        // addItemToCart
        expect(dispatch).toHaveBeenNthCalledWith(5, expect.any(Function));
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(6, expect.any(Function));
    });
    //TODO: Unskip when removeItem is converted to graphql.
    test.skip('its thunk retries on 404 failure if the user is signed in', async () => {
        getState.mockImplementationOnce(() => ({
            cart: { cartId: 'UNIT_TEST', details: { id: 'QUOTE_ID' } },
            user: { isSignedIn: true }
        }));
        const error = {
            networkError: false,
            graphQLErrors: [
                {
                    message: 'Could not find a cart'
                }
            ]
        };

        await updateItemInCart({
            ...payload,
            removeItem: jest.fn().mockRejectedValueOnce(error)
        })(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(8);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.updateItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.updateItem.receive(error)
        );
        // removeCart
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));
        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(4, expect.any(Function));
        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(5, expect.any(Function));
        /*
         * The operation is now retried.
         */
        expect(dispatch).toHaveBeenNthCalledWith(
            6,
            actions.updateItem.request(payload)
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            7,
            actions.updateItem.receive()
        );

        // getCartDetails
        expect(dispatch).toHaveBeenNthCalledWith(8, expect.any(Function));
    });
});

describe('getCartDetails', () => {
    const payload = { forceRefresh: true };

    test('it returns a thunk', () => {
        expect(getCartDetails(payload)).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        const result = await getCartDetails(payload)(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('its thunk creates a cart if no id is found', async () => {
        getState.mockImplementationOnce(() => ({
            cart: {
                /* cartId purposefully not present */
            },
            user: { isSignedIn: false }
        }));

        await getCartDetails(payload)(...thunkArgs);

        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(1, expect.any(Function));
    });

    test('its thunk dispatches actions on success', async () => {
        const mockDetails = { items: [] };
        request
            // fetchCartPart (details)
            .mockResolvedValueOnce(mockDetails)
            // fetchCartPart (payment methods)
            .mockResolvedValueOnce(2)
            // fetchCartPart (totals)
            .mockResolvedValueOnce(3);

        await getCartDetails(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.getDetails.request('CART_ID')
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getDetails.receive({
                details: mockDetails,
                paymentMethods: 2,
                totals: 3
            })
        );
    });

    test('its thunk dispatches actions on failure', async () => {
        const error = new Error('ERROR');
        request.mockRejectedValueOnce(error);

        await getCartDetails(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.getDetails.request('CART_ID')
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getDetails.receive(error)
        );
    });

    test('its thunk tries to recreate a cart on 404 failure', async () => {
        const error = new Error('ERROR');
        error.response = {
            status: 404
        };
        request.mockRejectedValueOnce(error);

        await getCartDetails(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.getDetails.request('CART_ID')
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getDetails.receive(error)
        );
        // createCart
        expect(dispatch).toHaveBeenNthCalledWith(3, expect.any(Function));

        // And then the thunk is called again.

        // three (3) fetchCartParts x two (2) thunk calls (initial, then the retry) = 6.
        expect(request).toHaveBeenCalledTimes(6);
    });

    test('its thunk merges cached item images into details', async () => {
        // Mock getting the image cache from storage.
        const cache = { SKU_1: 'IMAGE_1' };
        mockGetItem.mockResolvedValueOnce(cache);

        const items = [
            { image: 'IMAGE_0', sku: 'SKU_0' },
            { sku: 'SKU_1' },
            { sku: 'SKU_2' }
        ];
        const expected = [
            items[0],
            { ...items[1], image: cache.SKU_1, options: [] },
            { ...items[2], image: {}, options: [] }
        ];
        const mockDetails = { items };
        request
            // fetchCartPart (details)
            .mockResolvedValueOnce(mockDetails)
            // fetchCartPart (payment methods)
            .mockResolvedValueOnce(2)
            // fetchCartPart (totals)
            .mockResolvedValueOnce(3);

        await getCartDetails(payload)(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(
            1,
            actions.getDetails.request('CART_ID')
        );
        expect(dispatch).toHaveBeenNthCalledWith(
            2,
            actions.getDetails.receive({
                details: { items: expected },
                paymentMethods: 2,
                totals: 3
            })
        );
    });

    test('its thunk uses the proper endpoint when the user is signed in', async () => {
        getState.mockImplementationOnce(() => ({
            cart: { cartId: 'UNIT_TEST' },
            user: { isSignedIn: true }
        }));

        await getCartDetails(payload)(...thunkArgs);

        const authedEndpoints = {
            details: '/rest/V1/carts/mine/',
            paymentMethods: '/rest/V1/carts/mine/payment-methods',
            totals: '/rest/V1/carts/mine/totals'
        };
        const cacheArg = expect.any(Object);
        expect(request).toHaveBeenNthCalledWith(
            1,
            authedEndpoints.details,
            cacheArg
        );
        expect(request).toHaveBeenNthCalledWith(
            2,
            authedEndpoints.paymentMethods,
            cacheArg
        );
        expect(request).toHaveBeenNthCalledWith(
            3,
            authedEndpoints.totals,
            cacheArg
        );
    });
});

describe('removeCart', () => {
    test('it returns a thunk', () => {
        expect(removeCart()).toBeInstanceOf(Function);
    });

    test('its thunk returns undefined', async () => {
        const result = await removeCart()(...thunkArgs);

        expect(result).toBeUndefined();
    });

    test('it clears the cartId from local storage', async () => {
        await removeCart()(...thunkArgs);

        expect(mockRemoveItem).toHaveBeenCalledWith('cartId');
    });

    test('it clears the cart from the redux store', async () => {
        await removeCart()(...thunkArgs);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(actions.reset());
    });
});

describe('writeImageToCache', () => {
    test('it does nothing when the item has no sku', async () => {
        const noSku = {
            media_gallery_entries: [
                {
                    position: 1,
                    url: 'http://example.com'
                }
            ]
        };

        await writeImageToCache(noSku);

        expect(mockGetItem).not.toHaveBeenCalled();
    });

    test('it does nothing when the item is missing entries', async () => {
        const noImages = {
            sku: 'INVISIBLE'
            /* media_gallery_entries is purposefully omitted */
        };

        await writeImageToCache(noImages);

        expect(mockGetItem).not.toHaveBeenCalled();
    });

    test('it does nothing when the item has zero entries', async () => {
        const emptyImages = {
            sku: 'INVISIBLE',
            media_gallery_entries: []
        };

        await writeImageToCache(emptyImages);

        expect(mockGetItem).not.toHaveBeenCalled();
    });

    test('it stores product images in local cache when they have positions', async () => {
        const item = {
            sku: 'HELLO',
            media_gallery_entries: [
                {
                    position: 2,
                    url: 'http://example.com/second'
                },
                {
                    position: 1,
                    url: 'http://example.com/first'
                }
            ]
        };

        await writeImageToCache(item);

        expect(mockGetItem).toHaveBeenCalledWith('imagesBySku');
        expect(mockSetItem).toHaveBeenCalledWith(
            'imagesBySku',
            expect.objectContaining({
                HELLO: { position: 1, url: 'http://example.com/first' }
            })
        );
    });

    test('it stores product images when they do not have positions', async () => {
        // With unpositioned images.
        const itemWithUnpositionedImages = {
            sku: 'GOODBYE',
            media_gallery_entries: [
                {
                    url: 'http://example.com'
                }
            ]
        };

        await writeImageToCache(itemWithUnpositionedImages);

        expect(mockGetItem).toHaveBeenCalledWith('imagesBySku');
        expect(mockSetItem).toHaveBeenCalledWith(
            'imagesBySku',
            expect.objectContaining({
                GOODBYE: { url: 'http://example.com' }
            })
        );
    });

    test('it reuses product images from cache', async () => {
        const sameItem = {
            sku: 'SAME_ITEM',
            media_gallery_entries: [{ url: 'http://example.com/same/item' }]
        };

        const fakeImageCache = {};
        mockGetItem
            .mockReturnValueOnce(fakeImageCache)
            .mockReturnValueOnce(fakeImageCache);

        await writeImageToCache(sameItem);
        expect(mockSetItem).toHaveBeenCalledTimes(1);

        await writeImageToCache(sameItem);
        // mockSetItem should still have only been called once.
        expect(mockSetItem).toHaveBeenCalledTimes(1);
    });
});
