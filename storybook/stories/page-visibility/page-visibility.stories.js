import React, { useEffect } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { usePageVisibility } from '../../../src'
import readme from './README.md'

function PageVisibility() {
  const visibility = usePageVisibility()

  useEffect(() => {
    console.log('change title')
    window.parent.document.title = visibility
      ? 'react-browser-hooks'
      : 'Hey! Come back!'
  }, [visibility])
  return (
    <div>
      <h2>Page Visibility Demo</h2>
      <p>
        Navigate away from this tab in your browser to see the tab text change.
      </p>
    </div>
  )
}

storiesOf('PageVisibility', module).add(
  'Page Visibility',
  withReadme(readme, () => <PageVisibility />)
)
