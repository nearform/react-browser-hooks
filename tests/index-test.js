import expect from 'expect'
import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import {unmountComponentAtNode} from 'react-dom'

import FullScreen from '../demo/src/components/fullscreen'

class Wrapper extends React.Component {
  render() { 
    return this.props.children
  }
}

describe('FullScreen', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })
  
  it('it renders', (done) => {
    var fullScreen = ReactTestUtils.renderIntoDocument(<Wrapper><FullScreen /></Wrapper>)

    var buttons = ReactTestUtils.scryRenderedDOMComponentsWithTag(fullScreen, 'button')
    expect(buttons.length).toEqual(4)
    var paragraphs = ReactTestUtils.scryRenderedDOMComponentsWithTag(fullScreen, 'p')
    console.log(paragraphs[0])
    var paragraphs = ReactTestUtils.scryRenderedDOMComponentsWithTag(fullScreen, 'p')
    var pres = ReactTestUtils.scryRenderedDOMComponentsWithTag(fullScreen, 'pre')
    console.log('pre', pres[0])
    ReactTestUtils.Simulate.click(buttons[0])
    setTimeout(function () {
      console.log(paragraphs[0])
      console.log('pre', pres[0])
      done()
      }, 8000)
    }).timeout(10000)
})
