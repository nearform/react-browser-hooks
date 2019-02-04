import expect from 'expect'

import { fpsToMs, initRaf, nextRaf, cleanupRaf } from '../../../src/utils/fps'

describe('fps tests', () => {
  it('null returns default', () => {
    expect(fpsToMs(null)).toBe(null)
  })
  it('it converts to whole number expected', () => {
    expect(fpsToMs(1)).toBe(1000)
    expect(fpsToMs(10)).toBe(100)
    expect(fpsToMs(30)).toBe(33)
    expect(fpsToMs(60)).toBe(16)
    expect(fpsToMs(120)).toBe(8)
    expect(fpsToMs(1000)).toBe(1)
  })
  it('it ensures min and max', () => {
    expect(fpsToMs(0)).toBe(null)
    expect(fpsToMs(200000)).toBe(null)
  })
  it('invalid returns null', () => {
    expect(fpsToMs('blaa')).toBe(null)
    expect(fpsToMs(undefined)).toBe(null)
    expect(fpsToMs(null)).toBe(null)
  })
  it('raf initialisation', () => {
    let raf = initRaf(3)

    expect(raf).toEqual({
      skip: 3,
      ticking: false,
      tick: 0,
      rafId: null,
      lastFrameTimoutId: null,
      fallBackTimeoutId: null
    })

    raf = initRaf('5')

    expect(raf).toEqual({
      skip: 5,
      ticking: false,
      tick: 0,
      rafId: null,
      lastFrameTimoutId: null,
      fallBackTimeoutId: null
    })

    raf = initRaf(0)

    expect(raf).toEqual({
      skip: 0,
      ticking: false,
      tick: 0,
      rafId: null,
      lastFrameTimoutId: null,
      fallBackTimeoutId: null
    })
  })
  it('raf initialisation invalid param', () => {
    let raf = initRaf(null)
    expect(raf).toEqual(null)

    raf = initRaf()
    expect(raf).toEqual(null)

    raf = initRaf('blaa')
    expect(raf).toEqual(null)
  })
  it('next raf', (done) => {
    let raf = initRaf(2)

    expect(raf).toEqual({
      skip: 2,
      ticking: false,
      tick: 0,
      rafId: null,
      lastFrameTimoutId: null,
      fallBackTimeoutId: null
    })

    for (let i = 0; i < 3; i++) {
      nextRaf(raf, () => {
        expect(raf).toContain({
          ticking: true,
          tick: 0
        })
        done()
      })
      if (i === 3) {
        expect(raf).toContain({
          ticking: false,
          tick: i
        })
      }
    }
  })
  it('clear raf', (done) => {
    let raf = initRaf(0)
    expect(raf).toContain({
      rafId: null,
      ticking: false,
      tick: 0
    })
    nextRaf(raf, () => {
      expect(raf.rafId).toNotBe(null)
      cleanupRaf(raf)
      expect(raf.rafId).toBe(null)
      done()
    })
  })
})
