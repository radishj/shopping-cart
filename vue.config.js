process.env.VUE_APP_URL = 'http://localhost:3000'
module.exports = {
  configureWebpack:{
    devServer: {
      host: process.env.SERVER_HOST,
      port: '5005'
    }
  }
}