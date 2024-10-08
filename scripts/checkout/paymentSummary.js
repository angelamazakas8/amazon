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

    // for placing an order, send the cart details to the backend, then go to orders page
    document.querySelector('.place-order-button').addEventListener('click', async () => {

      // 2 second timeout
      const timeout = 2000; 
    
      // if it times out due to not having a good URL or other issue
      const timeoutPromise = new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      );
    
      // send data to the backend
      // use your own website/hosting here! 
      const fetchPromise = fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart: cart })
      });
    
      try {
        const response = await Promise.race([fetchPromise, timeoutPromise]);
    
        if (!response.ok) {
          console.log('Bad response');
          throw new Error('Error occured: Bad network response');
        }
    
        const order = await response.json();
        console.log('Order received:', order);
        addOrder(order);
        window.location.href = 'orders.html';
    
      } catch (error) {
        console.log('Unexpected error, saving order to localStorage instead:', error);
        localStorage.setItem('pendingOrder', JSON.stringify(cart));
        window.location.href = 'orders.html';
      }
    });
    
}