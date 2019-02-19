import { Selector } from 'testcafe'

class Hook {
  constructor(className) {
    this.html = Selector('html')
    this.demo = Selector(className)
    this.title = this.demo.child('h2')
    this.description = this.demo.child('p')
  }
}

export default class Storybook {
  constructor() {
    this.iframe = Selector('iframe#storybook-preview-iframe')
    this.hooks = { mousePosition: new Hook('.mouse-position-demo') }
  }
}
