module.exports = {
  publicPath: '.',
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}