import expect from 'expect'
import React, { useRef } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { useFullScreen, useFullScreenBrowser } from '../../src/hooks/fullscreen'

function FullScreen() {
  const fs = useFullScreen()
  return <pre>{JSON.stringify(fs, null)}</pre>
}

function FullScreenBrowser() {
  const fs = useFullScreenBrowser()
  return <pre>{JSON.stringify(fs, null)}</pre>
}

function ElementFullScreen() {
  const el = useRef(null)
  const fsEl = useFullScreen({ element: el })
  return <pre>{JSON.stringify(fsEl, null)}</pre>
}

describe('FullScreen', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })
  it('useFullScreen initialized correctly', () => {
    render(<FullScreen />, node, () => {
      expect(node.innerHTML).toContain(
        '<pre>{"fullScreen":false,"info":{"lastEvent":null,"lastRequest":null}}</pre>'
      )
    })
  })
  it('useFullScreenBrowser with element initialized correctly', () => {
    render(<ElementFullScreen />, node, () => {
      expect(node.innerHTML).toContain(
        '<pre>{"fullScreen":false,"info":{"lastEvent":null,"lastRequest":null}}</pre>'
      )
    })
  })
  it('useFullScreenBrowser initialized correctly', () => {
    render(<FullScreenBrowser />, node, () => {
      expect(node.innerHTML).toContain(
        '<pre>{"fullScreen":true,"info":{"reason":"screenTop and screenY are falsy","sizeInfo":{"screenTop":0,"screenY":0,"screenWidth":1024,"screenHeight":768,"innerWidth":400,"innerHeight":300}}}</pre>'
      )
    })
  })
})
