#!/usr/bin/env node

const Shell = require('shelljs')

const app = Shell.exec('npm start', { async: true })
const tests = Shell.exec('npm run acceptance', () => {
  app.kill('SIGINT')
})
