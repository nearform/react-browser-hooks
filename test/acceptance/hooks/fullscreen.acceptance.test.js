import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

fixture('Fullscreen Hook')
  .page(globals.url + '/?path=/story/fullscreen--default')
  .beforeEach((t) => t.switchToIframe(storybook.iframe))
  .afterEach((t) => t.switchToMainWindow())

test('The fullscreen demo is rendered', async (t) => {
  const { title } = storybook.hooks.fullscreen
  await t.expect(title.textContent).contains('FullScreen Demo')
})

test('The fullscreen demo defaults to fullScreen === false', async (t) => {
  const { description, fullscreen } = storybook.hooks.fullscreen
  await t
    .expect(description.textContent)
    .contains('Browser not in fullscreen mode')
    .expect(fullscreen.textContent)
    .contains('"fullScreen": false')
})

// fullscreen not yet supported by testcafe: https://github.com/DevExpress/testcafe/issues/3514

// test('The toggle button enters fullscreen mode from non-fullscreen', async (t) => {
//   const { description, fullscreen, toggleButton } = storybook.hooks.fullscreen
//   await t
//     .expect(description.textContent)
//     .contains('Browser not in fullscreen mode')
//     .expect(fullscreen.textContent)
//     .contains('"fullScreen": false')
//     .click(toggleButton)
//     .expect(description.textContent)
//     .contains('Browser in fullscreen mode')
//     .expect(fullscreen.textContent)
//     .contains('"fullScreen": true')
// })

// test('The toggle button exits fullscreen mode from fullscreen', async (t) => {
//   const { description, fullscreen, toggleButton } = storybook.hooks.fullscreen
//   await t
//     .click(toggleButton)
//     .expect(description.textContent)
//     .contains('Browser in fullscreen mode')
//     .expect(fullscreen.textContent)
//     .contains('"fullScreen": true')
//     .click(toggleButton)
//     .expect(description.textContent)
//     .contains('Browser not in fullscreen mode')
//     .expect(fullscreen.textContent)
//     .contains('"fullScreen": false')
// })
