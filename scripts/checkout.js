import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const productID = cartItem.productId;

        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productID) {
                matchingProduct = product;
            }
        });

        const deliveryOptionID = cartItem.deliveryOptionID;

        let deliveryOption;

        deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionID) {
                deliveryOption = option;
                console.log(deliveryOption);
            } else {
                console.log('error');
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');



        cartSummaryHTML += `
            <div class="cart-item-container cart-item-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>
                <div class="cart-item-details-grid">
                    <img class="product-image" src=${matchingProduct.image}>
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            ${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary">
                                Update
                            </span>
                            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let HTML = '';

        deliveryOptions.forEach((deliveryOption) => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = deliveryOption.priceCents === 0
                ? 'FREE Shipping'
                : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`;
            const isChecked = deliveryOption.id === cartItem.deliveryOptionID;
            console.log(isChecked);

            HTML += `    
                <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                        ${isChecked ? 'checked' : ''}
                        class="delivery-option-input"
                        name="${deliveryOption.id}-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString}
                        </div>
                    </div>
                </div>`;
        });

        return HTML;
    }

    document.querySelector('.order-summary').innerHTML = cartSummaryHTML;

    document.querySelectorAll('.delete-quantity-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            console.log(productId);
            removeFromCart(productId);
            console.log(cart);
            const container = document.querySelector(`.cart-item-${productId}`);
            container.remove();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
            const {productId, deliveryOptionId} = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);

            // refresh page
            renderOrderSummary();
        });
    })
}

renderOrderSummary();