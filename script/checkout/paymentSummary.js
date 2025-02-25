import { cart } from '../cart.js'
import { products } from '../../data/products.js'
import { calculateQuantity } from './orderSummary.js';
import { deliveryOptions } from '../deliveryOptions.js';
import moneyFormat from '../utils/money.js';

export function renderPaymentSummary(){
  let html = '';
  /*html*/
  html += ` <div class="payment-summary-title">
              Order Summary
            </div>

            <div class="payment-summary-row">
              <div>Items (${calculateQuantity()}):</div>
              <div class="payment-summary-money">${moneyFormat(calculateSumMoney())}</div>
            </div>

            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">${moneyFormat(calculateShipping())}</div>
            </div>

            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">${moneyFormat(calculateSumMoney() + calculateShipping())}</div>
            </div>

            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">${moneyFormat((calculateSumMoney() + calculateShipping()) * 0.1)}</div>
            </div>

            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">${moneyFormat((calculateSumMoney() + calculateShipping()) + (calculateSumMoney() + calculateShipping()) * 0.1)}</div>
            </div>

            <button class="place-order-button button-primary">
              Place your order
            </button>`
  
  document.querySelector('.payment-summary').innerHTML = html;
}

function calculateSumMoney(){
  let sum = 0;
  cart.forEach(item => {
    products.forEach(product => {
      if(product.id === item.productId){
        sum += product.priceCents * item.quantity;
      }
    })
  })
  return sum;
}

function calculateShipping(){
  let sum = 0;
  cart.forEach(item => {
    deliveryOptions.forEach(option => {
      if(option.id === item.deliveryOptionId){
        sum += option.deliveryPrice
      }
    }
    )
  })
  return sum;
}
