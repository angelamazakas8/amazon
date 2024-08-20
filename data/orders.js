// get orders from localStorage, or use empty array as default
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    // adds order to front of array
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}