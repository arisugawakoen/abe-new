var webpack = require("webpack")

module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
/*
      {
        test: /\.js(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            [ 'es2015' ] 
          ]
        }
      },
*/
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
  ]
/*
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
*/
};
