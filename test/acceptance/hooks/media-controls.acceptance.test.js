import globals from '../globals'
import Storybook from '../storybook'

const storybook = new Storybook()

fixture('Media Controls Hook')
  .page(
    globals.url +
      '/?selectedKind=MediaControls&selectedStory=Default&full=0&addons=1&stories=1&panelRight=1&addonPanel=REACT_STORYBOOK%2Freadme%2Fpanel'
  )
  .beforeEach((t) => t.switchToIframe(storybook.iframe))
  .afterEach((t) => t.switchToMainWindow())

test('The media controls demo is rendered', async (t) => {
  const { title } = storybook.hooks.mediaControls
  await t.expect(title.textContent).contains('Media Controls Demo')
})

test('The video should initialize in a paused state', async (t) => {
  const { currentTimeState, videoPausedState } = storybook.hooks.mediaControls

  await t
    .expect(videoPausedState.textContent)
    .contains('The video is paused: true')
    .expect(currentTimeState.textContent)
    .contains('The video currentTime: 0')
})

test('The play button (play/stop) should play the video', async (t) => {
  const { playStopButton, videoPausedState } = storybook.hooks.mediaControls

  await t
    .click(playStopButton)
    .expect(videoPausedState.textContent)
    .contains('The video is paused: false')
})

test('The stop button (play/stop) should stop the video', async (t) => {
  const {
    currentTimeState,
    playStopButton,
    videoPausedState
  } = storybook.hooks.mediaControls

  await t
    .click(playStopButton)
    .click(playStopButton)
    .expect(videoPausedState.textContent)
    .contains('The video is paused: true')
    .expect(currentTimeState.textContent)
    .contains('The video currentTime: 0')
})

test('The seek forward button should seek forward by 2 seconds', async (t) => {
  const { currentTimeState, seekForwardButton } = storybook.hooks.mediaControls

  await t
    .click(seekForwardButton)
    .expect(currentTimeState.textContent)
    .contains('The video currentTime: 2')
})

test('The seek backward button should seek backward by 2 seconds', async (t) => {
  const {
    currentTimeState,
    seekBackButton,
    seekForwardButton
  } = storybook.hooks.mediaControls

  await t
    .click(seekForwardButton)
    .click(seekForwardButton)
    .click(seekBackButton)
    .expect(currentTimeState.textContent)
    .contains('The video currentTime: 2')
})

test('The restart button should play the video from the beginning', async (t) => {
  const {
    currentTimeState,
    restartButton,
    seekForwardButton,
    videoPausedState
  } = storybook.hooks.mediaControls

  await t
    .click(seekForwardButton)
    .click(restartButton)
    .expect(currentTimeState.textContent)
    .contains('The video currentTime: 0')
    .expect(videoPausedState.textContent)
    .contains('The video is paused: false')
})
