module.exports = {
    build: {
      //magic stuff
    },
    dev: {
      env: require('./dev.env'),
      port: 3000,
      autoOpenBrowser: true,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      proxyTable: {},
      cssSourceMap: false
    }
  }