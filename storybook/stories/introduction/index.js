import React from 'react'
import marksy from 'marksy/components'
import { storiesOf } from '@storybook/react'
import introText from './intro.md'

const compile = marksy({
  createElement: React.createElement
})

storiesOf('React Browser Hooks', module).add('Introduction', () => (
  <article
    style={{
      width: '100%',
      height: '100%'
    }}>
    {compile(introText).tree}
  </article>
))
