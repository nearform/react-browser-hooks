import expect from 'expect'

import { isFullScreenSize, isFullScreenElement, getSizeInfo } from '../../../src/hooks/fullscreen'

describe('fullscreem tests', () => {
    const sizeInfo = { 
        screenTop: 10,
        screenY: 10,
        screenWidth: 1440,
        screenHeight: 900,
        innerWidth: 800,
        innerHeight: 600
    }

    const mockDoc = { 
        fullscreenElement: undefined,
        mozFullScreenElement: undefined,
        webkitFullscreenElement: undefined,
        msFullscreenElement: undefined,
        fullScreen: undefined,
        mozFullScreen: undefined,
        webkitIsFullScreen: undefined,
        fullScreenMode: undefined
    }
    it('it is not full screen', () => {    
        expect(isFullScreenSize(sizeInfo)).toEqual({open: false})
    })
    it('it is full - borderless', () => {
        sizeInfo.innerWidth = sizeInfo.screenWidth   
        sizeInfo.innerHeight = sizeInfo.screenHeight  
        expect(isFullScreenSize(sizeInfo)).toEqual({open: true, reason: 'borderless fullscreen'})
    })
    it('it is full screen - screenTop, screenY falsy', () => {
        sizeInfo.screenTop = 0   
        sizeInfo.screenY = 0 
        sizeInfo.innerWidth = sizeInfo.screenWidth - 10   
        sizeInfo.innerHeight = sizeInfo.screenHeight - 10 
        expect(isFullScreenSize(sizeInfo)).toEqual({open: true, reason: 'screenTop and screenY are falsy'})

        sizeInfo.screenTop = null   
        sizeInfo.screenY = null
        expect(isFullScreenSize(sizeInfo)).toEqual({open: true, reason: 'screenTop and screenY are falsy'})
    })
    it('sizeInfo is populated', () => {
        const sizeInfo = getSizeInfo()
        expect(sizeInfo.innerHeight).toExist()
        expect(sizeInfo.innerWidth).toExist()
        expect(sizeInfo.screenHeight).toExist()
        expect(sizeInfo.screenWidth).toExist()
        expect(sizeInfo.screenTop).toNotEqual(null)
        expect(sizeInfo.screenY).toNotEqual(null)
    })
    it('it is not fullScreen (element.current) - isFullScreenElement', () => {
        const element = {}
        const mockEl = {
            current: element
        }
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: false})
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: false})
    })
    it('it is not fullScreen (no element.current) - isFullScreenElement', () => {
        const mockEl = {
        }
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: false})
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: false})
    })
    it('it is not fullScreen (no element) - isFullScreenElement', () => {
        expect(isFullScreenElement(mockDoc)).toEqual({open: false})
        expect(isFullScreenElement(mockDoc)).toEqual({open: false})
    })
    it('it is fullScreen (element) - isFullScreenElement', () => {
        const element = {}
        const mockEl = {
            current: element
        }
        mockDoc.fullscreenElement = element
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: true, reason: 'fullscreenElement set to element'})
        mockDoc.fullscreenElement = undefined
        mockDoc.mozFullScreenElement = element
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: true, reason: 'mozFullScreenElement set to element'})
        mockDoc.mozFullScreenElement = undefined
        mockDoc.webkitFullscreenElement = element
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: true, reason: 'webkitFullscreenElement set to element'})
        mockDoc.webkitFullscreenElement = undefined
        mockDoc.msFullscreenElement = element
        expect(isFullScreenElement(mockDoc, mockEl)).toEqual({open: true, reason: 'msFullscreenElement set to element'})
        mockDoc.msFullscreenElement = undefined
    })
    it('it is fullScreen (document, no element) - isFullScreenElement', () => {
        const element = {}
        mockDoc.fullscreenElement = element
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'fullscreenElement set'})
        mockDoc.fullscreenElement = undefined
        mockDoc.mozFullScreenElement = element
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'mozFullScreenElement set'})
        mockDoc.mozFullScreenElement = undefined
        mockDoc.webkitFullscreenElement = element
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'webkitFullscreenElement set'})
        mockDoc.webkitFullscreenElement = undefined
        mockDoc.msFullscreenElement = element
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'msFullscreenElement set'})
        mockDoc.msFullscreenElement = undefined
    })
    it('it is fullScreen (mode true) - isFullScreenElement', () => {
        mockDoc.fullscreen = true
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'fullscreen true'})
        mockDoc.fullscreen = undefined
        mockDoc.fullScreenMode = true
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'fullScreenMode true'})
        mockDoc.fullScreenMode = undefined
        mockDoc.mozFullScreen = true
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'mozFullScreen true'})
        mockDoc.mozFullScreen = undefined
        mockDoc.webkitIsFullScreen = true
        expect(isFullScreenElement(mockDoc)).toEqual({open: true, reason: 'webkitIsFullScreen true'})
        mockDoc.webkitIsFullScreen = undefined
    })
})
