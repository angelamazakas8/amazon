import {addToCart, loadFromStorage, cart} from '../../data/cart.js';



describe('test suite: addToCart', () => {
    it('adds an existing item to the cart', () => {
        spyOn(localStorage, 'setItem');

        // spyOn create a mock localStorage getItem object
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // function we want the mock object to do (in place of localStorage)
            // return a cart with 1 item
            return JSON.stringify([{productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        // check to make sure the mock item is an empty array
        // console.log(localStorage.getItem(('cart')));

        // load empty cart
        // this works because there is a cart object (even if null)
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(2);

    });

    it('adds a new item to the cart', () => {

        spyOn(localStorage, 'setItem');

        // spyOn create a mock localStorage getItem object
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // function we want the mock object to do (in place of localStorage)
            return JSON.stringify([]);
        });
        // check to make sure the mock item is an empty array
        // console.log(localStorage.getItem(('cart')));

        // load empty cart
        // this works because there is a cart object (even if null)
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    })
})