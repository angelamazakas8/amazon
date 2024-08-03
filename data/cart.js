export let cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

export function addToCart(productId) {
    let matchingItem;



    cart.forEach((item) => {
      if(item.productId === productId){
        matchingItem = item;
      }
    });
    
    // matching item found
    if(matchingItem){
      matchingItem.quantity += 1;
    }

    // not a matching item
    else {
      cart.push({productId, quantity: 1});

    }
}

export function updateCartQuantity(){
    document.querySelector('.products-grid').innerHTML = productsHTML;
    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
    
            const productId = button.dataset.productId;
    
            addToCart(productId);
            let cartQuantity = 0;
            cart.forEach((item) => {
              cartQuantity += item.quantity;
            });
    
            document.querySelector('.cart-quantity').innerHTML = cartQuantity;
            console.log(cartQuantity);
            console.log(cart);
    
        })
    })
  }

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
}