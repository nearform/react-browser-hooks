import { Selector } from 'testcafe'

fixture('Storybook').page('http://localhost:3000/')

test('Storybook is rendered', async (t) => {
  const r = Selector('#root')
  await t.expect(r.exists).ok()
})
