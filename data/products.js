import { formatCurrency } from "../scripts/utils/money.js";

export function getProducts(productID) {
  let matchingProduct;
  products.forEach((product) => {
      if (product.id === productID) {
          matchingProduct = product;
      }
  });
  return matchingProduct;
}

class Product {
  id;
  image;
  name; 
  rating;
  priceCents;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;

  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;

  }

  extraInfoHTML() {
    return '';
  }
}

class Clothing extends Product {
 sizeChartLink;

 constructor(productDetails) {
  // super calls Product classes constructor (Product is the parent class)
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
 }

 // in new tab, size chart for clothing items
 extraInfoHTML() {
  return `
    <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
  `;
 }
}

export let products = [];

export function loadProductsFetch() {
  const promise = fetch(
    'https://angelamazakas8.github.io/simple-backend/products.json'
  ).then((response) => {
    return response.json();
  }).then((productsData) => {
    products = productsData.map((productDetails) => {

      if (productDetails.type === 'clothing'){
        // convert to clothing class
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log(products);
  }).catch(() => {
    console.log('unexpected error')  
  });

  return promise;
}

export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {

      if (productDetails.type === 'clothing'){
        // convert to clothing class
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    console.log(products);

    // run the function
    // this function is renderProductsGrid() in the amazon.js file
    // the function must be ran after the call, in order to get the products first
    fun();

    xhr.addEventListener('error', (error) => {
      console.log('unexpected error')
    })
  })
  xhr.open('GET', 'https://angelamazakas8.github.io/simple-backend/products.json');
  xhr.send();
}