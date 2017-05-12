const helpers = require('./helpers')
const path = require('path')

const DefinePlugin = require('webpack/lib/DefinePlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const ENV = process.env.ENV = process.env.NODE_ENV = 'development'

module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.ts$/,
        //   loader: 'tslint-loader',
        //   exclude: [helpers.root('node_modules')]
        // },
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'source-map-loader',
          exclude: [
            // these packages have problems with their sourcemaps
          ]
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          query: {
            // use inline sourcemaps for "karma-remap-coverage" reporter
            sourceMap: false,
            inlineSourceMap: true,
            compilerOptions: {
              removeComments: true
            }
          },
          exclude: [/\.e2e\.ts$/]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.css$/,
          loaders: [ 'style-loader', 'css-loader' ]
        },
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          loader: 'url-loader?limit=100000'
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
        }
      }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
        { from: 'fonts', to: 'fonts' },
      ]),
      new HtmlWebpackPlugin({
        template: 'app/index.ejs',
        inject: 'body',
      }),
    ],
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  }
}
