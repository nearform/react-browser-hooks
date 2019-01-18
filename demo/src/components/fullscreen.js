import React from 'react';

import { useFullScreen } from '../../../src'

export default function FullScreen () {
  const {fullScreen, toggle, open, close, info} = useFullScreen()
  return (
    <div>
      <h2>FullScreen Demo</h2>
      <button onClick={toggle}>{'Toggle'}</button>
      <button onClick={open} disabled={fullScreen}>{'Open'}</button>
      <button onClick={close} disabled={!fullScreen}>{'Close'}</button>
      <h3>Info</h3>
      <pre>{JSON.stringify(info, null, 2)}
      </pre>
    </div>
  );
}

