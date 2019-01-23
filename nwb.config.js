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
  },
  karma: {
    browsers: ['Chrome_without_security', 'Firefox', 'Safari'],
    plugins: [
      require('karma-firefox-launcher'),
      require('karma-safari-launcher')
    ],
    extra: {
      customLaunchers: {
        Chrome_without_security: {
          base: 'Chrome',
          flags: ['--disable-web-security']
        }
      }
    }
  }
}
