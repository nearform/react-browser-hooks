import { Selector } from 'testcafe'

fixture('Storybook').page('http://localhost:3000/')

test('The storybook demo is rendered', async (t) => {
  const demo = Selector('#root')

  await t.expect(demo.exists).ok()
})
