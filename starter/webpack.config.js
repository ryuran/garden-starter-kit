const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
const docs = require('@cleverage/gsk/lib/docs');
const kssConfig = require('./kss.json');

const srcDir = './src/';

const genericDataFile = path.resolve(path.join(srcDir, 'data', 'data.json'));

// extends for twig
// const twigExtends = [];
// const folderPath = path.resolve(__dirname, './twig-extends');
// fs.readdirSync(folderPath).forEach((file) => {
//   twigExtends.push(require(path.join(folderPath, file)));
// });

// html
const templates = glob.sync(path.join(__dirname, 'src', '**', '!(_)*.twig'));
const pagesList = [];

const plugins = [];
const rules = [];

templates.forEach((template) => {
  const filename = path.join(path.relative(path.join(__dirname, 'src', 'html'), path.dirname(template)), `${path.basename(template, '.twig')}.html`);
  pagesList.push(filename);
  plugins.push(new HtmlWebpackPlugin({
    template,
    filename,
    inject: /ajax/.test(template) ? false : 'head',
  }));
});

// docs
const docsConfig = docs({
  basePath: __dirname,
  pagesList,
  kssConfig,
});

rules.push(...docsConfig.rules);
plugins.push(...docsConfig.plugins);

// plugin to manage script insert
plugins.push(new ScriptExtHtmlWebpackPlugin({
  defaultAttribute: 'defer',
}));

// svg symbols plugin
plugins.push(new SvgSpriteHtmlWebpackPlugin({
  includeFiles: [
    './src/svg/**/*.svg',
  ],
  generateSymbolId: (svgFilePath) => {
    const svgDir = path.resolve('./src/svg');
    const pathToSubDir = path.relative(svgDir, path.dirname(svgFilePath));
    const composed = pathToSubDir.split(path.sep);
    composed.push(path.basename(svgFilePath));

    return composed.join('-');
  },
}));

const config = {
  entry: {
    app: './src/js/index.js',
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    ...plugins,
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader',
        ],
      },
      {
        test: /src\/.*\.twig$/,
        use: [
          'html-loader',
          {
            loader: 'twig-html-loader',
            options: {
              data: (context) => {
                const templatePath = context.resourcePath;

                const dataDir = path.resolve(path.join(srcDir, 'data'));
                const htmlDir = path.resolve(path.join(srcDir, 'html'));
                const htmlRelativePath = path.relative(htmlDir, templatePath);
                const specificDataFile = path.resolve(dataDir, htmlRelativePath.replace('.twig', '.json'));
                let gData = {};
                let sData = {};

                context.addDependency(genericDataFile);
                context.addDependency(specificDataFile);

                try {
                  gData = context.fs.readJsonSync(genericDataFile);
                } catch (e) {
                  console.log(`WARN: Unable to find data from ${path.relative(path.resolve('.'), genericDataFile)}`);
                }

                try {
                  sData = context.fs.readJsonSync(specificDataFile);
                } catch (e) {
                  console.log(`WARN: Unable to find data from ${path.relative(path.resolve('.'), specificDataFile)}`);
                }

                return Object.assign({}, gData, sData);
              },
            },
          },
        ],
      },
      {
        test: /src\/svg\/.*\.svg$/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /src\/svg/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src',
          },
        }],
      },
      {
        test: /\.(eot|ttf|woff2?)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src',
          },
        }],
      },
      ...rules,
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};

module.exports = config;
