class Cart{
    cartItems;
    localStorageKey;

    // constructor for creating objects
    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    loadFromStorage() {
        // cart.cartItems is the same as this.cartItems in this context
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
      
        if (!this.cartItems) {
            this.cartItems = [{
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

    // save cart to local storage, so it doesn't change when page is refreshed
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }
    
    addToCart(productId) {

    let matchingItem;

    this.cartItems.forEach((item) => {
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
        this.cartItems.push({productId, quantity: 1, deliveryOptionID: '1'});

    }
    // once item is added to cart, save cart to local storage
    this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
            newCart.push(cartItem);
            }
        });
        
        this.cartItems = newCart;
        // save updated cart to local storage
        this.saveToStorage();
    }

                
    updateCartQuantity(){
        document.querySelector('.products-grid').innerHTML = productsHTML;
        document.querySelectorAll('.js-add-to-cart').forEach((button) => {
            button.addEventListener('click', () => {
        
                const productId = button.dataset.productId;
        
                addToCart(productId);
                let cartQuantity = 0;
                this.cartItems.forEach((item) => {
                  cartQuantity += item.quantity;
                });
        
                document.querySelector('.cart-quantity').innerHTML = cartQuantity;
                console.log(cartQuantity);
                console.log(this.cartItems);
        
            })
        })
    }

      updateDeliveryOption(productId, deliveryOptionID) {
        let matchingItem;
    
        this.cartItems.forEach((item) => {
          if(item.productId === productId){
            matchingItem = item;
          }
        });
    
        matchingItem.deliveryOptionID = deliveryOptionID;
    
        this.saveToStorage();
    
    }
}
  
  const cart = new Cart('cart-oop');
  const buisnessCart = new Cart('cart-business');


  

  //cart.addToCart('8c9c52b5-5a19-4bcb-a5d1-158a74287c53');
  console.log(cart);
  console.log(buisnessCart);