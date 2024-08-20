import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
//import '../data/backend-practice.js'

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

// using promises to avoid too much nesting
// Promise.all waits for all of the promises before going to next step
// load products and cart, then render page
/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then( () => {
    renderOrderSummary();
    renderPaymentSummary();   
});
*/
/*
new Promise((resolve) => {
    loadProducts(() => {
        // once products are done loading, this code runs
        resolve();
    })
}).then(() => {

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
