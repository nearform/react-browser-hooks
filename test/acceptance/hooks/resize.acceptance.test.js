import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

fixture('Resize Hook')
  .page(
    globals.url +
      '/?selectedKind=Resize&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel'
  )
  .beforeEach((t) => t.switchToIframe(storybook.iframe))
  .afterEach((t) => t.switchToMainWindow())

test('The resize demo is rendered', async (t) => {
  const { title } = storybook.hooks.resize
  await t.expect(title.textContent).contains('Resize Demo')
})

test('The resize demo defaults to element.offset* values', async (t) => {
  const { description, border } = storybook.hooks.resize
  const { offsetHeight, offsetWidth } = await border()
  await t
    .expect(description.textContent)
    .contains(`Width: ${offsetWidth}px, Height: ${offsetHeight}px`)
})

test('The dimensions update when the browser is resized', async (t) => {
  const { description, border } = storybook.hooks.resize

  let { offsetHeight, offsetWidth } = await border()
  await t
    .expect(description.textContent)
    .contains(`Width: ${offsetWidth}px, Height: ${offsetHeight}px`)
    .resizeWindow(700, 700)

  offsetHeight = await border.offsetHeight
  offsetWidth = await border.offsetWidth

  await t
    .expect(offsetHeight)
    .lte(700)
    .expect(offsetWidth)
    .lte(700)
    .expect(description.textContent)
    .contains(`Width: ${offsetWidth}px, Height: ${offsetHeight}px`)
    .resizeWindow(1024, 768)
})
