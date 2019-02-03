import expect from 'expect'

import { fpsToMs } from '../../../src/utils/fps'

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
})
