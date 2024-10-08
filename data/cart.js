export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  // if no cart, fill with a couple of items
  if (!cart) {
      cart = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionID: '1'
  }, {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionID: '2'
  }];
  
  }
}

// save cart to local storage
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

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
      cart.push({productId, quantity: 1, deliveryOptionID: '1'});

    }
    // once item is added to cart, save cart to local storage
    saveToStorage();
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
  // save updated cart to local storage
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionID) {
    let matchingItem;

    cart.forEach((item) => {
      if(item.productId === productId){
        matchingItem = item;
      }
    });

    matchingItem.deliveryOptionID = deliveryOptionID;

    saveToStorage();
}

// just trying as an example (remove later)
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {

    console.log(xhr.response);
    fun();
  })
  xhr.open('GET', 'https://angelamazakas8.github.io/simple-backend/cart.txt');
  xhr.send();
}
