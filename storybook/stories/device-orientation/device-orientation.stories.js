import React from 'react'
import { storiesOf } from '@storybook/react'
import { useDeviceOrientation } from '../../../src'
import readme from './README.md'
import { withReadme } from 'storybook-readme'

function DeviceOrientation() {
  const deviceOrientation = useDeviceOrientation()

  return (
    <div>
      <h2>Device Orientation Demo</h2>
      <p>
        {deviceOrientation ? (
          <pre>
            <code>{`{
  alpha: ${deviceOrientation.alpha},
  beta: ${deviceOrientation.beta},
  gamma: ${deviceOrientation.gamma},
  absolute: ${deviceOrientation.absolute},
  webkitCompassHeading: ${deviceOrientation.webkitCompassHeading}
}`}</code>
          </pre>
        ) : (
          'Detecting if device orientation available...'
        )}
      </p>
      <p>The returned object should contain:</p>
      <pre>
        <code>{`{
  alpha: [number/deg], // z-axis
  beta: [number/deg],  // x-axis
  gamma: [number/deg]  // y-axis
}`}</code>
      </pre>
      <p>
        If available, it may also include <code>absolute</code> as a boolean,
        and <code>webkitCompassHeading</code> value as a number (degrees). More
        info{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation">
          is available here
        </a>
        .
      </p>
    </div>
  )
}

storiesOf('Device Orientation', module).add(
  'Default',
  withReadme(readme, () => <DeviceOrientation />)
)
