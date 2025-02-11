export const cart = []

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
