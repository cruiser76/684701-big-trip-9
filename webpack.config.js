const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);

module.exports = {
  mode: `development`, //режим сборки
  entry: `./src/main.js`, //Точка входа приложения
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
    ],
  },
  plugins: [
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ],
  output: { //Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`),
  },
  devtool: `source-map`,  //подключаем sourcemap
  devServer: { //создание сервера
    contentBase: path.join(__dirname, `public`), //где искать сборку
    publicPath: 'http://localhost:8080/', //веб адрес сборки
    compress: true, //Сжатие
    //Автоматическая перезагрузка страницы
    //Если не работает по стандартному URL в браузере,
    //то нужно добавить 'webpack-dev-server': 'http://localhost:8080/webpack-dev-server/'
    watchContentBase: true,
  }
};
