import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { useFullScreen } from '../../src/hooks/fullscreen'

function FullScreen() {
  const fs = useFullScreen()

  return <pre>{JSON.stringify(fs)}</pre>
}

describe('FullScreen', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })
  it('it renders', () => {
    render(<FullScreen />, node, () => {
      expect(node.innerHTML).toContain(
        '<pre>{"fullScreen":false,"info":{"lastEvent":null,"lastRequest":null}}</pre>'
      )
    })
  })
})
