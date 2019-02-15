import { Selector } from 'testcafe'
import globals from '../globals'

fixture('Mouse Position Hook').page(
  globals.url +
    '/?selectedKind=Mouse Position&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel'
)

test('The mouse position demo is rendered', async (t) => {
  const title = Selector('.mouse-position-demo').child('h2')

  await t
    .switchToIframe('iframe#storybook-preview-iframe')
    .expect(title.textContent)
    .contains('Mouse Position Demo')
    .switchToMainWindow()
})

test('The mouse position defaults to 0,0', async (t) => {
  const description = Selector('.mouse-position-demo').child('p')

  await t
    .switchToIframe('iframe#storybook-preview-iframe')
    .expect(description.textContent)
    .contains('X: 0px, Y: 0px')
    .switchToMainWindow()
})

test('The mouse position updates when the mouse moves', async (t) => {
  const html = Selector('html')
  const description = Selector('.mouse-position-demo').child('p')

  await t.switchToIframe('iframe#storybook-preview-iframe').hover(html)

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
    .switchToMainWindow()
})
