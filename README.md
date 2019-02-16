# react-browser-hooks

React Browser Hooks

[![CircleCI](https://circleci.com/gh/nearform/react-browser-hooks.svg?style=svg&circle-token=6519ab8ff84d4bf291788588738f2b2000c8fc3a)](https://circleci.com/gh/nearform/react-browser-hooks)
[![NPM version](https://img.shields.io/npm/v/@nearform/react-browser-hooks.svg)](https://www.npmjs.com/package/@nearform/react-browser-hooks)
[![Coverage Status](https://coveralls.io/repos/github/nearform/react-browser-hooks/badge.svg?branch=master)](https://coveralls.io/github/nearform/react-browser-hooks?branch=master)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8855d56c-7b73-4070-92e8-e7c1b2e80d7e/deploy-status)](https://app.netlify.com/sites/react-browser-hooks/deploys)
[![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=U1lJa0NDeis1VFRXYXpvMHdGMHdpd2RXVXBIRlQ2eDNQZmJNdlkrN3F2Zz0tLXlmRDdXcTl5YVFMOG1sUXZSeDRCMFE9PQ==--32bc4ac80987fe0aa1d5fdaa3c08607be6f3f2a8)](https://www.browserstack.com/automate/public-build/U1lJa0NDeis1VFRXYXpvMHdGMHdpd2RXVXBIRlQ2eDNQZmJNdlkrN3F2Zz0tLXlmRDdXcTl5YVFMOG1sUXZSeDRCMFE9PQ==--32bc4ac80987fe0aa1d5fdaa3c08607be6f3f2a8)

A simple utility library that provides custom hooks for some common browser events.

## Installation

[npm][]:

```bash
npm install @nearform/react-browser-hooks
```

## Documentation & Demo

You can find documentation and demo on https://react-browser-hooks.netlify.com/

## Example Usage

E.g. The FullScreen hook:

```javascript
import { useFullScreen } from '@nearform/react-browser-hooks'

const fs = useFullScreen()
<button onClick={fs.toggle}>{fs.fullScreen ? 'Close' : 'Open'}</button>
```

### Server-side rendering

Sensible defaults are provided to allow each hook to be safely used when rendering on the server.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

## License

Copyright 2019 NearForm

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

[![BrowserStack](https://p14.zdusercontent.com/attachment/1015988/mg687dwxHqXtriITEf8kxZV3W?token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..tPLabhhdTeWxyc3TTt-RCg.bmk4nO95zIaYIcNaaDEVtxph9ap6d9X__07O0wPpvgsx5RBYvue1gMxCGhnYcgtQA51YjC5BFCxev9bBGZ0f6wHGr83j_nBID68oZCdgurHQhuZjsBZTotXtVdGDJoGg8KHMvl2qK9_FFlxohxGkPatEyccPXfLxZGGrGhvGnZVs6sFcy5bSevRHwe84yH3y0-PhbwE9HPAqzYsJyjBsSnez3gllgrIqX_7UucPPyAxtESSOaevl3zs6n5EfJ6teaJ3_KhWTmux9Nlk5csiWwvcRcCXp7p14Xln9tBYR64k.-1SqygSW1Ke0iJ-t3ED3SQ)](http://browserstack.com/)

We use BrowserStack to support as many browsers and devices as possible
