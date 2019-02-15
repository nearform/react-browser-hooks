#!/usr/bin/env node

const ChildProcess = require('child_process')

const app = ChildProcess.spawn('npm', ['start'], {
  detach: true,
  stdio: 'inherit'
})

const acceptanceScript =
  process.env.CI === 'true' ? 'acceptance-ci' : 'acceptance'

const test = ChildProcess.spawn('npm', ['run', acceptanceScript], {
  detach: true,
  stdio: 'inherit'
})

app.on('error', (err) => {
  console.log('Failed to start subprocess:', err)
  test.kill()
})

test.on('close', () => {
  app.kill()
})
