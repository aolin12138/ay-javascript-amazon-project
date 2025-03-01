import { moneyFormat } from '../../script/utils/money.js'

describe('test suite: moneyFormat', () => {
  it('converts cents to dollars', () => {
    expect(moneyFormat(2095)).toEqual('$20.95')
  }
  )

  it('works with 0 cents', () => {
    expect(moneyFormat(0)).toEqual('$0.00')
  }
  )

  it('rounds up to nearest cent', () => {
    expect(moneyFormat(2000.5)).toEqual('$20.01')
  }
  )
})