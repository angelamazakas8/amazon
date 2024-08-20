import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../data/cart.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';


describe('test suite: renderOrderSummary', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    // load products before all tests
    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });

    // beforeEach is a hook that runs before each of the tests
    beforeEach(()=> {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `<div class="order-summary"></div>
        <div class="payment-summary"></div>`;

        // Spy on localStorage's getItem method
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // Mock cart data
            return JSON.stringify([{productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            },
        {
            productId: productId2,
            quantity: 2,
            deliveryOptionID: '2'
        }]);
        });

        // Load the cart data
        loadFromStorage();
        renderOrderSummary();
    })

    it('displays the cart on the left side of page', () => {

        // check to make sure there's 2 cart elements
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        // for the first product, we expect a quantity of 1
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 1');
        
        // for second product, we expect a quantity of 2
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 2');

        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes an item', () => {

        // delete an item
        document.querySelector(`.js-delete-link-${productId1}`).click();
        // see if only 1 product
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);

        // first product should be null after deletion
        expect(document.querySelector(`.cart-item-${productId1}`)).toEqual(null);

        // the second product should not be null (not deleted)
        expect(document.querySelector(`.cart-item-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = '';
    })
});
