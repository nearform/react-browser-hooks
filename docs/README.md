# react-browser-hooks
React Browser Hooks

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

A utility library that provides custom React hooks for some common browser events.

## Installation

[npm][]:

```bash
npm install @nearform/react-browser-hooks
```

## Example Usage

Eg. The FullScreen hook:

```javascript
import { useFullScreen } from '@nearform/react-browser-hooks' 
```

```javascript
const fs = useFullScreen()
<button onClick={fs.toggle}>{fs.fullScreen ? 'Close' : 'Open'}</button>
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
