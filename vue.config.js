module.exports = {
  configureWebpack:{
    devtool: 'source-map',
    devServer: {
      host: process.env.VUE_APP_SERVER_HOST,
      port: '5005'
    }
  }
}