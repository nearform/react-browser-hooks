global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
  clearWatch: jest.fn()
}

Date.now = jest.fn(() => 1549358005991) // 05/02/2019
