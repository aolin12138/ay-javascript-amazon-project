const products = [{
  image: 'athletic-cotton-socks-6-pairs',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  stars: {
    rating: 4.5,
    count: 87
  },
  priceCents: 1090
},
{
  image: 'intermediate-composite-basketball',
  name: 'Intermediate Size Basketball',
  stars: {
    rating: 4.0,
    count: 127
  },
  priceCents: 2095
},
{
  image: 'adults-plain-cotton-tshirt-2-pack-teal',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  stars: {
    rating: 4.5,
    count: 56
  },
  priceCents: 799
}
]

let html = ''

products.forEach(product => { 
  html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="images/products/${product.image}.jpg">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.stars.rating * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.stars.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
        `
})

document.querySelector('.products-grid').innerHTML = html