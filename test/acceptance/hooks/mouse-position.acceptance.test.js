import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

fixture('Mouse Position Hook')
  .page(globals.url + '/?path=/story/mouse-position--default')
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

  // move mouse to center of html element (fires mousemove event)
  await t.hover(html)

  // get reported mouse position from the hook
  const dimensions = await description.textContent
  const numbers = /\d+/g
  const [x, y] = dimensions.match(numbers)

  // get true mouse position (center of html element)
  const { offsetHeight, offsetWidth } = await html()
  const expectedX = Math.round(offsetWidth / 2)
  const expectedY = Math.round(offsetHeight / 2)

  // assert that the reported mouse position is the true mouse position
  await t
    .expect(parseInt(x))
    .eql(expectedX)
    .expect(parseInt(y))
    .eql(expectedY)
})
