import {cart, removeFromCart, saveToStorage} from '../script/cart.js'
import {products} from '../data/products.js'
import { deliveryOptions } from './deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

let html = '';

document.querySelector('.return-to-home-link').innerText = `${calculateQuantity()} items`

const orderSumElement = document.querySelector('.order-summary')

cart.forEach(item => {
  let machingItem;

  products.forEach(product => {
    if (product.id === item.productId) {
      machingItem = product
      return
    }
  })

  let deliveryOption;
  deliveryOptions.forEach(option => {
    if (option.id === item.deliveryOptionId) {
      deliveryOption = option
      return
    }
  }
  )



  html += `<div class="cart-item-container js-cart-item-container-${item.productId}">
                  <div class="delivery-date delivery-date-${item.productId}">
                    Delivery date: ${dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D')}
                  </div>

                  <div class="cart-item-details-grid">
                    <img class="product-image"
                      src="${machingItem.image}">

                    <div class="cart-item-details">
                      <div class="product-name">
                        ${machingItem.name}
                      </div>
                      <div class="product-price">
                        $${(machingItem.priceCents / 100).toFixed(2)}
                      </div>
                      <div class="product-quantity">
                        <span>
                          Quantity: <span class="quantity-label-${item.productId}">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link update-quantity-link-${item.productId} link-primary" data-product-id="${item.productId}">
                          Update
                        </span>
                        <div class="product-quantity-select-${item.productId} product-quantity-select">
                        </div>
                        <span class="delete-quantity-link link-primary" data-product-id = "${item.productId}">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div class="delivery-options">
                      <div class="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      ${deliveryOptionsHtml(item.productId, item)}
                    </div>
                  </div>
                </div>`
})

orderSumElement.innerHTML = html

document.querySelectorAll('.delivery-option').forEach(input => {
  input.addEventListener('click', () => {
    let deliveryId = input.dataset.deliveryOptionId
    let productId = input.dataset.productId
    changeDeliveryOption(productId, deliveryId)
  })
})

document.querySelectorAll('.delete-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId
    removeFromCart(productId)
    calculateTotalQuantity()
  })
})

document.querySelectorAll('.update-quantity-link').forEach(link => {
  link.addEventListener('click', () => {
    let productId = link.dataset.productId
    let quantitySelect = document.querySelector(`.product-quantity-select-${productId}`)
    quantitySelect.innerHTML = `
      <input class = "quantity-input quantity-input-${productId}">
      <span class = "save-quantity-link-${productId} link-primary">
        Save
      </span>
    `

    document.querySelector(`.quantity-label-${productId}`).innerHTML = ''
    document.querySelector(`.update-quantity-link-${productId}`).innerHTML = ''
    document.querySelector(`.save-quantity-link-${productId}`).addEventListener('click', () => {
      saveQuantity(productId)
    })
  })
})

function saveQuantity(productId) {
  let quantity = document.querySelector(`.quantity-input-${productId}`).value
  let quantitySelect = document.querySelector(`.product-quantity-select-${productId}`)
  if (quantity !== '') {
    cart.forEach(item => {
      if (item.productId === productId) {
        item.quantity = Number(quantity)
      }
    })
    document.querySelector(`.quantity-label-${productId}`).innerHTML = quantity
  }

  quantitySelect.innerHTML = ''
  saveToStorage()
  document.querySelector(`.update-quantity-link-${productId}`).innerHTML = 'Update'
  document.querySelector('.return-to-home-link').innerText = `${calculateQuantity()} items`
} 

function calculateQuantity() {
  let totalQuantity = 0
  cart.forEach(item => {
    totalQuantity += item.quantity
  })
  return totalQuantity
}

function deliveryOptionsHtml(productId, item) {
  let html = ''

  deliveryOptions.forEach(option => {
    html += `<div class="delivery-option"
      data-delivery-option-id="${option.id}"
      data-product-id="${productId}">
    <input type="radio" 
      ${item.deliveryOptionId === option.id ? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${productId}">
    <div>
      <div class="delivery-option-date">
        ${dayjs().add(option.deliveryDays, 'day').format('dddd, MMMM D')}
      </div>
      <div class="delivery-option-price">
        ${option.deliveryPrice === 0 ? 'FREE Shipping' : `$${(option.deliveryPrice / 100).toFixed(2)} - Shipping`}
      </div>
    </div>
  </div>`
  })

  return html

}

function changeDeliveryOption(productId, optionId) {
  cart.forEach(item => {
    if (item.productId === productId) {
      item.deliveryOptionId = Number(optionId)
    }
  })

  deliveryOptions.forEach(option => {
    if (option.id === Number(optionId)) {
      document.querySelector(`.delivery-date-${productId}`).innerHTML = `Delivery date: ${dayjs().add(option.deliveryDays, 'day').format('dddd, MMMM D')}`
      return
    }
  }
  )

  saveToStorage();
  
}