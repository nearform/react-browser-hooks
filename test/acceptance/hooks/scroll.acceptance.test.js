import globals from '../globals'
import Storybook from '../storybook'
import { getWindowAttribute } from '../util'

const storybook = new Storybook()

fixture('Scroll Hook').page(
  globals.url + '/iframe.html?selectedKind=Scroll&selectedStory=Default'
)

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

  await t
    .expect(description.textContent)
    .contains('Top: 0px, Left: 0px')
    .navigateTo(
      globals.url +
        '/iframe.html?selectedKind=Scroll&selectedStory=Default#scroll-to-me'
    )
    .expect(description.textContent)
    .contains('Top: 1035px')
})
