import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

fixture('Mouse Position Hook')
  .page(
    globals.url +
      '/?selectedKind=Mouse Position&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel'
  )
  .beforeEach((t) => t.switchToIframe(storybook.iframe))
  .afterEach((t) => t.switchToMainWindow())

test('The mouse position demo is rendered', async (t) => {
  const { title } = storybook.hooks.mousePosition
  await t.expect(title.textContent).contains('Mouse Position Demo')
})

test('The mouse position defaults to 0,0', async (t) => {
  const { description } = storybook.hooks.mousePosition
  await t.expect(description.textContent).contains('X: 0px, Y: 0px')
})

test('The mouse position updates when the mouse moves', async (t) => {
  const { description, html } = storybook.hooks.mousePosition

  await t.hover(html)

  const dimensions = await description.textContent
  const numbers = /\d+/g
  const [x, y] = dimensions.match(numbers)

  const { offsetHeight, offsetWidth } = await html()
  const expectedX = Math.round(offsetWidth / 2)
  const expectedY = Math.round(offsetHeight / 2)

  await t
    .expect(parseInt(x))
    .eql(expectedX)
    .expect(parseInt(y))
    .eql(expectedY)
})
