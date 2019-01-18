import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import FullScreen from '../demo/src/components/fullscreen'

describe('FullScreen', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })
  it('displays a welcome message', () => {
    render(<FullScreen />, node, () => {
      expect(node.innerHTML).toContain('FullScreen Demo')
    })
  })
})
