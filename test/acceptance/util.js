import { ClientFunction } from 'testcafe'

export const getWindowAttribute = ClientFunction(
  (attribute) => window[attribute]
)
