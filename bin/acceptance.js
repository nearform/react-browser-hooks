#!/usr/bin/env node

const ChildProcess = require('child_process')

const app = ChildProcess.spawn('npm', ['start'], {
  detach: true,
  stdio: 'inherit'
})

const test = ChildProcess.spawn('npm', ['run', 'acceptance'], {
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
