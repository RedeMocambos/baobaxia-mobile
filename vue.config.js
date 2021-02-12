module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => config.optimization.minimize(false),
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        return args
      })
  }
}
