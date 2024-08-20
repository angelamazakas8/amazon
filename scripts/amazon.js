import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
    let productsHTML = '';

    // Generate HTML for each product
    products.forEach((product) => {
        productsHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}">
                </div>
                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>
                <div class="product-rating-container">
                    <img class="product-rating-stars" src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>
                <div class="product-price">
                    ${product.getPrice()}
                </div>
                <div class="product-quantity-container">
                    <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>
                <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                    Add to Cart
                </button>
            </div>`;
    });

    // Update the products grid with generated HTML
    document.querySelector('.products-grid').innerHTML = productsHTML;

    // Add click event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            addToCart(productId); // Call addToCart when the button is clicked
            updateCartQuantity(); // Update the cart quantity in the header
        });
    });
}

function updateCartQuantity() {
    const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-quantity').textContent = cartQuantity;
}

// Initial cart quantity display
updateCartQuantity();
