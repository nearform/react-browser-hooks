import { act, cleanup, renderHook } from '@testing-library/react-hooks'
import { fireEvent } from '@testing-library/react'

import { usePageVisibility } from '../../../src'
import * as constants from '../../../src/constants'

afterEach(cleanup)

describe('usePageVisibility', () => {
  describe('when rendered on the server', () => {
    beforeAll(() => {
      constants.IS_SERVER = true
    })

    afterAll(() => {
      constants.IS_SERVER = false
    })

    it('defaults to visible', () => {
      let visible
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(true)
    })
  })

  describe('document.hidden', () => {
    beforeEach(() => {
      let hidden = false
      Object.defineProperty(document, 'hidden', {
        configurable: true,
        get() {
          return hidden
        },
        set(bool) {
          hidden = Boolean(bool)
        }
      })
    })

    afterEach(() => {
      Object.defineProperty(document, 'hidden', {
        get() {
          return undefined
        }
      })
    })

    it('is true if document is not initially hidden', () => {
      let visible
      document.hidden = false
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(true)
    })

    it('is false if document is initially hidden', () => {
      let visible
      document.hidden = true
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(false)
    })

    it('updates state on the "visibilitychange" event', () => {
      let visible
      document.hidden = false

      act(() => {
        renderHook(() => (visible = usePageVisibility()))
      })

      document.hidden = true

      act(() => {
        fireEvent(
          document,
          new Event('visibilitychange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(visible).toBe(false)
    })
  })

  describe('document.msHidden', () => {
    beforeEach(() => {
      let hidden = false
      Object.defineProperty(document, 'msHidden', {
        configurable: true,
        get() {
          return hidden
        },
        set(bool) {
          hidden = Boolean(bool)
        }
      })
    })

    afterEach(() => {
      Object.defineProperty(document, 'msHidden', {
        get() {
          return undefined
        }
      })
    })

    it('is true if document is not initially hidden', () => {
      let visible
      document.msHidden = false
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(true)
    })

    it('is false if document is initially hidden', () => {
      let visible
      document.msHidden = true
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(false)
    })

    it('updates state on the "msvisibilitychange" event', () => {
      let visible
      document.msHidden = false

      act(() => {
        renderHook(() => (visible = usePageVisibility()))
      })

      document.msHidden = true
      act(() => {
        fireEvent(
          document,
          new Event('msvisibilitychange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(visible).toBe(false)
    })
  })

  describe('document.webkitHidden', () => {
    beforeEach(() => {
      let hidden = false
      Object.defineProperty(document, 'webkitHidden', {
        configurable: true,
        get() {
          return hidden
        },
        set(bool) {
          hidden = Boolean(bool)
        }
      })
    })

    afterEach(() => {
      Object.defineProperty(document, 'webkitHidden', {
        get() {
          return undefined
        }
      })
    })

    it('is true if document is not initially hidden', () => {
      let visible
      document.webkitHidden = false
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(true)
    })

    it('is false if document is initially hidden', () => {
      let visible
      document.webkitHidden = true
      renderHook(() => (visible = usePageVisibility()))

      expect(visible).toBe(false)
    })

    it('updates state on the "webkitvisibilitychange" event', () => {
      let visible
      document.webkitHidden = false

      act(() => {
        renderHook(() => (visible = usePageVisibility()))
      })

      document.webkitHidden = true
      act(() => {
        fireEvent(
          document,
          new Event('webkitvisibilitychange', {
            bubbles: false,
            cancelable: false
          })
        )
      })

      expect(visible).toBe(false)
    })
  })
})
