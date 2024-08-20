import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";

// async makes a function return a promise
async function loadPage() {

    try {
    // await allows us to write asynchronous code as normal code
    // waits for code to finish before going to next line
    await loadProductsFetch();

    await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    
    } catch (error) {
        console.log('unexpected error');
    }

    renderOrderSummary();
    renderPaymentSummary();  
}

loadPage();
