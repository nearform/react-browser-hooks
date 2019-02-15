import { Selector } from 'testcafe'
import globals from './globals'

fixture('Storybook').page(globals.url)

test('The storybook demo is rendered', async (t) => {
  const demo = Selector('#root')

  await t.expect(demo.exists).ok()
})
