import { Selector } from 'testcafe'

class Hook {
  constructor(className) {
    this.html = Selector('html')
    this.demo = Selector(className)
    this.title = this.demo.child('h2')
  }
}

class MediaControlsHook extends Hook {
  constructor(className) {
    super(className)

    const buttons = this.demo.find('button')
    this.playStopButton = buttons.nth(0)
    this.restartButton = buttons.nth(1)
    this.seekBackButton = buttons.nth(2)
    this.seekForwardButton = buttons.nth(3)
    this.playPauseButton = buttons.nth(4)
    this.muteButton = buttons.nth(5)
    this.volumeDownButton = buttons.nth(6)
    this.volumeUpButton = buttons.nth(7)

    const descriptions = this.demo.find('p')
    this.videoPausedState = descriptions.nth(2)
    this.currentTimeState = descriptions.nth(3)
    this.audioPausedState = descriptions.nth(6)
    this.volumeState = descriptions.nth(7)
    this.mutedState = descriptions.nth(8)
  }
}

class MousePositionHook extends Hook {
  constructor(className) {
    super(className)
    this.description = this.demo.child('p')
  }
}
export default class Storybook {
  constructor() {
    this.iframe = Selector('iframe#storybook-preview-iframe')
    this.hooks = {
      mediaControls: new MediaControlsHook('.media-controls-demo'),
      mousePosition: new MousePositionHook('.mouse-position-demo')
    }
  }
}