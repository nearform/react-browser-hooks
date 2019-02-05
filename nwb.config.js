module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactBrowserHooks',
      externals: {
        react: 'React'
      }
    }
  }
}
