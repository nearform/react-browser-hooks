import { Selector } from 'testcafe';

fixture('Demo').page('http://localhost:3000/');

test('The demo is rendered', async (t) => {
  const demo = Selector('#demo');

  await t.expect(demo.exists).ok();
});
