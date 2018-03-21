
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('./package.json')

const __DEV__ = process.env.NODE_ENV === 'development'

let commonPlugins = []
let entryFiles = []

if (__DEV__) {
  entryFiles = ['./example/test.js']
} else {
  entryFiles = ['./src/index.js']
}

function eachEntryFile(dir) {
  try {
    fs.readdirSync(dir).forEach(file => {
      const patt = new RegExp('.svg')
      if (patt.test(file)) {
        const filePath = `${dir}/${file}`
        entryFiles.unshift(filePath)
      }
    })
  } catch (e) {
    throw new Error(e)
  }
}

eachEntryFile('./svg')


module.exports = {
  entry: {
    main: entryFiles,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/dist/',
    library: pkg.name,
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: [path.join(__dirname, '/'), path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')],
    compress: true,
    inline: true,
    hot: true,
    port: 1234,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        },
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
        }),
        // exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
        }),
      },
      {
        test: /\/[A-Za-z0-9]+\.svg$/,
        use: [
          'svg-sprite-loader',
          {loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: true}},
                {convertPathData: true},
                {removeComments: true},
                {removeDesc: true},
                {removeUselessDefs: true},
                {removeEmptyAttrs: true},
                {removeHiddenElems: true},
                {removeEmptyText: true},
                {removeUselessStrokeAndFill: true},
                {moveElemsAttrsToGroup: true},
                {removeStyleElement: true},
                {cleanupEnableBackground: true},
                {removeAttrs: {attrs: '(stroke|fill)'}},
              ],
            }},
        ],
      },
      {
        test: /\/[A-Za-z0-9]+\.color\.svg$/,
        use: [
          'svg-sprite-loader',
          {loader: 'svgo-loader',
            options: {
              plugins: [
                {removeTitle: true},
                {convertColors: {shorthex: true}},
                {convertPathData: true},
                {removeComments: true},
                {removeDesc: true},
                {removeUselessDefs: true},
                {removeEmptyAttrs: true},
                {removeHiddenElems: true},
                {removeEmptyText: true},
                {removeUselessStrokeAndFill: true},
                {moveElemsAttrsToGroup: true},
                {removeStyleElement: true},
                {cleanupEnableBackground: true},
              ],
            }},
        ],
      },
    ],
  },
  plugins: [
   
  ],
  externals: {
    lodash: {
      root: '_',
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
    },
    react: {
      root: 'React',
      var: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },

  },
}

if (__DEV__) {
  commonPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
} else {
  commonPlugins = [
    new CleanWebpackPlugin('dist/*', {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
    }),
  ]
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins)
