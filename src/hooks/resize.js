import { useState, useEffect } from 'react';

export function useResize(callback) {
  const [state, setState] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });

  function handleResize(e) {
    const newDimensions = { height: e.target.innerHeight, width: e.target.innerWidth }
    setState(newDimensions);
    if (callback) callback(newDimensions)
  }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return function cleanup() {
      window.removeEventListener('resize', handleResize);
    };
  });

  return state;
}
