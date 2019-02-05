import { Selector } from 'testcafe'

fixture('Storybook').page('http://localhost:3000/')

test('Storybook is rendered', async (t) => {
  await t.switchToIframe('#storybook-preview-iframe')

  const fullScreen = Selector('#fullscreen')
  await t.expect(fullScreen.exists).ok()
})
