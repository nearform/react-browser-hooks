import { ClientFunction } from 'testcafe'

import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

const scroll = ClientFunction((x, y) => window.scrollBy(x, y))
const getWindowScrollX = ClientFunction(() => window.scrollX)
const getWindowScrollY = ClientFunction(() => window.scrollY)

fixture('Scroll Hook')
  .page(
    globals.url +
      '?selectedKind=Scroll&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel'
  )
  .beforeEach((t) => t.switchToIframe(storybook.iframe))
  .afterEach((t) => t.switchToMainWindow())

test('The scroll demo is rendered', async (t) => {
  const { title } = storybook.hooks.scroll
  await t.expect(title.textContent).contains('Scroll Demo')
})

test('The scroll demo defaults to window.scroll* values', async (t) => {
  const { description } = storybook.hooks.scroll
  const scrollX = await getWindowScrollX()
  const scrollY = await getWindowScrollY()
  await t
    .expect(description.textContent)
    .contains(`Top: ${scrollY}px, Left: ${scrollX}px`)
})

test('The scroll demo updates state on scroll', async (t) => {
  const { description } = storybook.hooks.scroll

  await t.expect(description.textContent).contains('Top: 0px, Left: 0px')
  await scroll(100, 100)
  await t.expect(description.textContent).contains('Top: 100px, Left: 100px')
})
