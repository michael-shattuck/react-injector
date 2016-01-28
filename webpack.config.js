module.exports = {
  entry: [
    'babel-polyfill',
    './examples/basic/index.js'
  ],
  output: {
    path: __dirname + '/examples/dist/basic',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          "plugins": [
            "add-module-exports",
            "transform-decorators-legacy"
          ],
          "presets": ["es2015", "stage-0", "react"]
        }
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
