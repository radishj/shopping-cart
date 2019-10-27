module.exports = {
  configureWebpack:{
    devServer: {
      host: process.env.VUE_APP_SERVER_HOST,
      port: '5005'
    }
  }
}