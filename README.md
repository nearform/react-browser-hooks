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

## Documentation & Demo

You can find documentation and demo on https://react-browser-hooks.netlify.com/

## Example Usage

Eg. The FullScreen hook:

```javascript
import { FullScreen } from '@nearform/react-browser-hooks'
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

## License

Copyright 2018 nearForm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
