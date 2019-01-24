import expect from 'expect'

import { fpsToMs } from '../../../src/utils/fps'

describe('fps tests', () => {
  it('null returns default', () => {
    expect(fpsToMs(null)).toBe(66)
  })
  it('it converts to whole number expected', () => {
    expect(fpsToMs(1)).toBe(1000)
    expect(fpsToMs(10)).toBe(100)
    expect(fpsToMs(30)).toBe(33)
    expect(fpsToMs(60)).toBe(16)
    expect(fpsToMs(120)).toBe(8)
  })
  it('it sets min and max', () => {
    expect(fpsToMs(0)).toBe(1000)
    expect(fpsToMs(200000)).toBe(8)
  })
  it('invalid returns null', () => {
    expect(fpsToMs('blaa')).toBe(null)
    expect(fpsToMs(undefined)).toBe(null)
  })
  it('invalid min max', () => {
    expect(fpsToMs(9, 100, 10)).toBe(null)
    expect(fpsToMs(10, 'blaa', 'blaa', 'blaa')).toBe(100)
  })
  it('it uses custom min, max and default', () => {
    expect(fpsToMs(9, 10, 100)).toBe(100)
    expect(fpsToMs(101, 10, 100)).toBe(10)
    expect(fpsToMs(null, 10, 100, 20)).toBe(50)
    expect(fpsToMs('blaa', 10, 100, 20)).toBe(null)
    expect(fpsToMs(undefined, 10, 100, 20)).toBe(null)
  })
})
