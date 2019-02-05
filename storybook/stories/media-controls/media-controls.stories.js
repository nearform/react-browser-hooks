import React, { useRef, useState } from 'react'
import { storiesOf } from '@storybook/react'
import { withReadme } from 'storybook-readme'
import { useMediaControls } from '../../../src'
import readme from './README.md'
import MediaControls from '../../../demo/src/components/media-controls'

storiesOf('MediaControls', module).add(
  'Default',
  withReadme(readme, () => <MediaControls />)
)
