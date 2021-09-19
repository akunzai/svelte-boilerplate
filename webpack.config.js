const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const sveltePreprocess = require('svelte-preprocess');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
  mode,
  entry: {
    'build/bundle': ['./src/main.ts'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, '/public'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
    assetModuleFilename: 'build/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            // hotReload: !prod,
            preprocess: sveltePreprocess({
              sourceMap: !prod,
              scss: {
                renderSync: true,
                implementation: require('sass'),
              },
            }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: !prod,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !prod,
            },
          },
        ],
      },
      {
        // https://webpack.js.org/guides/asset-modules/
        test: /\.(eot|otf|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset/resource',
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: mode,
      MOCK: false,
    }),
  ],
  devtool: prod ? false : 'eval-cheap-module-source-map',
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  performance: false,
};
