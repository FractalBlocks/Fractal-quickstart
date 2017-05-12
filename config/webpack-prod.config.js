/**
 * @author: @AngularClass (modified)
 */

const helpers = require('./helpers')
const path = require('path')

/**
 * Webpack Plugins
 */
const webpack = require('webpack')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'production'

/* TODOs:
  - Option for run a single test
  - Configure for watch mode
*/

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function (options) {
  return {
    devtool: 'inline-source-map',
    resolve: {
      extensions: ['.ts', '.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
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
          ]
        },
        {
          test: /\.ts$/,
          loader: 'awesome-typescript-loader',
          query: {
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
      new webpack.optimize.UglifyJsPlugin(),
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
