# react-browser-hooks
React Browser Hooks

[![CircleCI](https://circleci.com/gh/nearform/react-browser-hooks.svg?style=svg&circle-token=6519ab8ff84d4bf291788588738f2b2000c8fc3a)](https://circleci.com/gh/nearform/react-browser-hooks)
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]
[![Netlify Status](https://api.netlify.com/api/v1/badges/8855d56c-7b73-4070-92e8-e7c1b2e80d7e/deploy-status)](https://app.netlify.com/sites/react-browser-hooks/deploys)

A simple utility library that provides custom hooks for some common browser events.

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
