// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const nodeExternals = require("webpack-node-externals");

// eslint-disable-next-line no-undef
module.exports = {
  mode: "development",
  entry: {
    index: "./index.ts",
  },
  output: {
    // eslint-disable-next-line no-undef
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  externals: [nodeExternals()],
};
