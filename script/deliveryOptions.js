import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

export const deliveryOptions = [{
    id: 1,
    deliveryDays: 7,
    deliveryPrice: 0
  },
  {
    id: 2,
    deliveryDays: 3,
    deliveryPrice: 499
  },
  {
    id: 3,
    deliveryDays: 1,
    deliveryPrice: 999
  }]

  export function calculateDeliveryDate(deliveryOption) {
    let deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'day')
    while (deliveryDate.day() === 6 || deliveryDate.day() === 0) {
      deliveryDate = deliveryDate.add(1, 'day')
    }

    return deliveryDate
  }