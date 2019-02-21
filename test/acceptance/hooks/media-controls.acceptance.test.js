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

test('The audio should initialize in the correct state', async (t) => {
  const {
    audioPausedState,
    mutedState,
    volumeState
  } = storybook.hooks.mediaControls

  await t
    .expect(audioPausedState.textContent)
    .contains('The audio is paused: true')
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0')
    .expect(mutedState.textContent)
    .contains('The audio is muted: true')
})

test('The play button (play/pause) should play the audio', async (t) => {
  const { playPauseButton, audioPausedState } = storybook.hooks.mediaControls

  await t
    .expect(playPauseButton.textContent)
    .contains('Play')
    .click(playPauseButton)
    .expect(audioPausedState.textContent)
    .contains('The audio is paused: false')
})

test('The pause button (play/pause) should pause the audio', async (t) => {
  const {
    muteButton,
    playPauseButton,
    audioPausedState
  } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(playPauseButton)
    .click(playPauseButton)
    .expect(audioPausedState.textContent)
    .contains('The audio is paused: true')
})

test('The mute button should mute the audio if muted === false', async (t) => {
  const { muteButton, mutedState, volumeState } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(muteButton)
    .click(muteButton)
    .expect(mutedState.textContent)
    .contains('The audio is muted: true')
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0')
})

test('The mute button should unmute the audio if muted === true', async (t) => {
  const { muteButton, mutedState, volumeState } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(muteButton)
    .expect(mutedState.textContent)
    .contains('The audio is muted: false')
    .expect(volumeState.textContent)
    .contains('The audio is volume: 1')
})

test('The mute button should unmute the audio if muted === true (restoring previous volume)', async (t) => {
  const {
    muteButton,
    mutedState,
    volumeDownButton,
    volumeState
  } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(muteButton)
    .click(volumeDownButton)
    .click(muteButton)
    .click(muteButton)
    .expect(mutedState.textContent)
    .contains('The audio is muted: false')
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0.9')
})

test('The volume down button should decrease the volume by 0.1', async (t) => {
  const {
    muteButton,
    volumeDownButton,
    volumeState
  } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(muteButton)
    .click(volumeDownButton)
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0.9')
    .click(volumeDownButton)
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0.8')
})

test('The volume up button should increase the volume by 0.1', async (t) => {
  const {
    muteButton,
    volumeUpButton,
    volumeState
  } = storybook.hooks.mediaControls

  await t
    .expect(muteButton.textContent)
    .contains('Unmute')
    .click(volumeUpButton)
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0.1')
    .click(volumeUpButton)
    .expect(volumeState.textContent)
    .contains('The audio is volume: 0.2')
})
