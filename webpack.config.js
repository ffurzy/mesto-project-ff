const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 

module.exports = {
  entry: './src/index.js', 

  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js',
    publicPath: '',
  },

  mode: 'development', 
  devServer: {
    static: { directory: path.resolve(__dirname, 'dist') },
    open: true,
    compress: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/, // находим все JS-файлы
        exclude: /node_modules/, // пропускаем папку с зависимостями
        use: {
          loader: 'babel-loader', 
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.css$/i, // находим все CSS-файлы
        use: [
          MiniCssExtractPlugin.loader, // вынимает CSS из JS
          'css-loader', // обрабатывает @import и url() в CSS
          {
            loader: 'postcss-loader', // добавляет префиксы для разных браузеров
            options: { postcssOptions: { plugins: [ require('autoprefixer') ] } } // автопрефиксер
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i, // шрифты
        type: 'asset/resource', // тоже копируем в assets
        generator: {
            filename: "fonts/[name].[hash][ext]",
          },
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(), // чистим dist перед сборкой
    new HtmlWebpackPlugin({ template: './src/index.html', }), // генерим index.html без минификации в деве
    new MiniCssExtractPlugin(), // имя для CSS-файла
  ],
  devtool: 'source-map',
};