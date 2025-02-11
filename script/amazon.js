import { products } from "../data/products.js"
import { cart } from "../script/cart.js"

let html = ''

products.forEach(product => { 
  html += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src = ${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
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

          <div class="added-to-cart added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
        `
})

document.querySelector('.products-grid').innerHTML = html

document.querySelectorAll('.add-to-cart-button').forEach(button => {
  button.addEventListener('click', () => {
    let productId = button.dataset.productId

    let machingItem;

    cart.forEach(item => {
      if (item.productId === productId) {
        machingItem = item
        return
      }
    })

    if (machingItem) {
      machingItem.quantity++
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      })
    }

    addedItem(productId)

    calculateTotalQuantity()
  })
})

function calculateTotalQuantity() {
  let totalQuantity = 0

  cart.forEach(item => {
    totalQuantity += item.quantity
  })

  document.querySelector('.cart-quantity').innerText = totalQuantity
}

let messageTimeOutId;
const messageTimeoutIdList = []

function addedItem(productId) {
  messageTimeoutIdList.forEach(item => {
    if (item.productId === productId) {
      clearTimeout(item.timeoutId)
    }
  })

  const addedMessage = document.querySelector(`.added-to-cart-${productId}`)
  addedMessage.classList.add('added-to-cart-show')
  console.log(addedMessage)

  messageTimeOutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-show')
  }, 2000)

  messageTimeoutIdList.push({
    productId,
    timeoutId: messageTimeOutId
  }
  )
}