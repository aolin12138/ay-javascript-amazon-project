export function moneyFormat(value) {
  return `$${(Math.round(value) / 100).toFixed(2)}`
}

export default moneyFormat