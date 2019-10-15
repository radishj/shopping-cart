module.exports = {
  configureWebpack:{
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      '/fresh': {
        target: 'http://localhost:3000' //对应自己的接口
      }
    }
  }
}