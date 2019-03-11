import globals from '../globals'
import Storybook from '../storybook'
import { getWindowAttribute, scrollWindow } from '../util'

const storybook = new Storybook()

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
  const pageXOffset = await getWindowAttribute('pageXOffset')
  const pageYOffset = await getWindowAttribute('pageYOffset')

  const { description } = storybook.hooks.scroll

  await t
    .expect(description.textContent)
    .contains(`Top: ${pageYOffset}px, Left: ${pageXOffset}px`)
})

test('The scroll demo updates state on scroll', async (t) => {
  const { description } = storybook.hooks.scroll

  await t.expect(description.textContent).contains('Top: 0px, Left: 0px')
  await scrollWindow(100, 100)
  await t.expect(description.textContent).contains('Top: 100px, Left: 100px')
})
