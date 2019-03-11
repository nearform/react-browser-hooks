import { ClientFunction } from 'testcafe'

export const getWindowAttribute = ClientFunction(
  (attribute) => window[attribute]
)

export const scrollWindow = ClientFunction((x, y) => window.scrollTo(x, y))
