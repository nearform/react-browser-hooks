#!/usr/bin/env node

const Axios = require('axios')
const ChildProcess = require('child_process')

const { CI, CIRCLE_BRANCH, NETLIFY_ACCESS_TOKEN } = process.env

const netlify = Axios.create({
  baseURL: 'https://api.netlify.com/api/v1/',
  headers: {
    Authorization: 'Bearer ' + NETLIFY_ACCESS_TOKEN,
    'content-type': 'application/json'
  }
})

async function main() {
  if (CI === 'true') {
    console.log('ci detected. checking netlify status')

    console.log('getting site id')
    const sites = await netlify
      .get('sites?name=react-browser-hooks&filter=all')
      .then(({ data }) => data)

    if (!sites.length) {
      throw new Error('react-browser-hooks site not found')
    }

    const [site] = sites
    console.log(`site found: ${site.id}`)

    console.log('getting deploy id')
    const deploys = await netlify
      .get(`sites/${site.id}/deploys?branch=${CIRCLE_BRANCH}`)
      .then(({ data }) => data)

    if (!deploys.length) {
      throw new Error(`no deploys found for branch: ${CIRCLE_BRANCH}`)
    }

    const [deploy] = deploys // assumes most recent deploy is the right one
    console.log(`deploy found: ${deploy.id}`)

    async function waitForNetlifyDeploy(deployId, options = {}) {
      options.rate = options.rate || 30000 // 30s default
      options.timeout = options.timeout || 300000 // 5m default
      options.total = options.total || 0

      const { summary } = await netlify
        .get(`sites/${site.id}/deploys/${deployId}`)
        .then(({ data }) => data)

      console.log('waiting for deploy to complete...')
      console.log(`status: ${summary.status}`)

      if (options.total >= options.timeout) {
        throw new Error(
          `polling ended after ${options.total}ms (max wait reached)`
        )
      }

      if (summary.status === 'ready') {
        return
      }

      await wait(options.rate)
      options.total += options.rate

      await waitForNetlifyDeploy(deployId, options)
    }

    await waitForNetlifyDeploy(deploy.id)
    console.log(`netlify deployed: ${deploy.deploy_ssl_url}`)
    console.log('starting acceptance')

    const test = ChildProcess.spawn('npm', ['run', 'acceptance-ci'], {
      env: Object.assign({}, process.env, {
        ACCEPTANCE_URL: deploy.deploy_ssl_url
      }),
      stdio: 'inherit'
    })

    test.on('close', (code) => {
      if (code > 0) {
        console.log('the test closed with a non-zero exit code')
        process.exit(code)
      }
    })

    test.on('error', (error) => {
      console.error(error)
      process.exit(1)
    })
  } else {
    console.log('local development detected. starting with npm start')

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
  }
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
