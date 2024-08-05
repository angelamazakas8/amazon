import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { removeFromCart } from '../data/cart.js';
import {deliveryOptions} from '../data/deliveryOptions.js'
// using esm library
// doesn't need {} as it uses default export
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productID = cartItem.productId;

    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productID){
            matchingProduct = product;
        }
    })

    const deliveryOptionID = cartItem.deliveryOptionID;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionID){
        deliveryOption = option; 
        console.log(deliveryOption);
      }
      else
        console.log('error')
    })

    // get today's date using external library
    const today = dayjs();

    // add 7 days to today's date
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');


    // create html for checkout.html
    cartSummaryHTML +=
    `
             <div class="cart-item-container cart-item-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

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
              ${deliveryOptionsHTML(matchingProduct)}
              </div>
            </div>
          </div>
    `;

    // console.log(cartSummaryHTML);
})

function deliveryOptionsHTML(matchingProduct) {
  let HTML = '';

  deliveryOptions.forEach((deliveryOption) => {

  //console.log(dayjs());
  const today = dayjs();

  // add 7 days to today's date
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM D');

    // if 0, it's free. Else, display price
  const priceString = deliveryOption.priceCents === 0
  ? 'FREE Shipping'
  : `$${formatCurrency(deliveryOption.priceCents)} - Shipping`

  HTML += `    
                <div class="delivery-option">
                  <input type="radio"
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
  })

  return HTML;
}


// get the class order-summary from checkout.html and fill it with HTML
document.querySelector('.order-summary').innerHTML = cartSummaryHTML

// delete item
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    // get the product id by using the data attribute on the delete link
    const productId = link.dataset.productId;
    console.log(productId);
    removeFromCart(productId);
    console.log(cart);

    const container = document.querySelector(`.cart-item-${productId}`);
    container.remove();
  });
});