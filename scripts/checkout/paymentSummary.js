import { getProducts } from "../../data/products.js"
import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
    let productCostCents = 0;
    let shippingCostPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProducts(cartItem.productId);
        productCostCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionID);
        shippingCostPriceCents += deliveryOption.priceCents;
    });

    const totalBeforeTax = productCostCents + shippingCostPriceCents;
    const taxCents = totalBeforeTax * 0.1;
    const totalCents = totalBeforeTax + taxCents;


    const paymentSummaryHTML = 
    `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(productCostCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCostPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>   
    `;

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

    // for placing an order, send the cart details to the backend
    document.querySelector('.place-order-button').addEventListener('click', async () => {

      try {
        // send json data to the backend
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });

      const order = await response.json();
      console.log(order);
      addOrder(order);

      } catch (error) {
        console.log('unexpected error')
      }

      window.location.href = 'orders.html';
    });
}