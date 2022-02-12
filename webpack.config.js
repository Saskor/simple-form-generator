const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isDev = process.env.NODE_ENV === "development";

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: []
  };

  if (!isDev) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserPlugin()
    ];
  }

  return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra = "") => {
  const loaders = [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: isDev ? "[path]-[local]" : "[sha1:hash:hex:4]"
        }
      }
    }
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

const babelOptions = (preset = "") => {
  const opts = {
    presets: [ "@babel/preset-env" ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-export-default-from"
    ]
  };

  if (preset) {
    opts.presets.push(preset);
  }

  return opts;
};


const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: babelOptions()
    }
  ];

  if (isDev) {
    loaders.push({ loader: "eslint-loader" });
  }

  return loaders;
};

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.html"),
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "src"),
          to: path.resolve(__dirname, "dist") }
      ],
      options: {
        concurrency: 100
      }
    })
  ];

  if (!isDev) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: path.resolve(__dirname, "./src/index.tsx") },
  output: {
    publicPath: "/",
    filename: filename("js"),
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx", ".css", ".scss" ],
    modules: [ "src", "node_modules" ]
  },
  optimization: optimization(),
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    port: 35782,
    hot: isDev
  },
  devtool: isDev ? "inline-source-map" : "",
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders("sass-loader")
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: [ "file-loader" ]
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: [ "file-loader" ]
      },
      {
        test: /\.csv$/,
        use: [ "csv-loader" ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "awesome-typescript-loader",
        options: {
          useTranspileModule: true,
          forceIsolatedModules: true,
          transpileOnly: !isDev
        }

      }
    ]
  }
};
