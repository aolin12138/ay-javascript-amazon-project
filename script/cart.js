export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
},
{
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}]

export function addedToCart(productId) {
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
}

export function removeFromCart(productId) {
  cart = cart.filter(item => item.productId !== productId)
  document.querySelector(`.js-cart-item-container-${productId}`).remove()
}
