module.exports = {
  devServer: {
    https: true
  },
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },

  configureWebpack: {
    module: {
      rules : [
        {
          test: /\.(gltf)$/,
          use: [
            {
              loader: "gltf-webpack-loader"
            }
          ]
        },
        {
          test: /\.(bin|glb|patt|png|dat)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: /\.svg$/,
          use: [
            'babel-loader',
            'vue-svg-loader',
          ],
		}
      ]
    },
    plugins: [ ]
  }
}