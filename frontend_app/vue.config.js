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
          test: /\.(bin|glb)$/,
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
		},
		{
			test: /\.scss$/,
			use: [
			  'vue-style-loader',
			  'css-loader',
			  'sass-loader'
			]
		  }
      ]
    },
    plugins: []
  }
}