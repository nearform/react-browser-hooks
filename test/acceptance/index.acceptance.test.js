import { Selector } from 'testcafe'

fixture('Storybook').page('http://localhost:3000/')

test('Storybook is rendered', async (t) => {
  const storybook = Selector('#storybook-preview-iframe')

  await t.expect(storybook.exists).ok()
})
