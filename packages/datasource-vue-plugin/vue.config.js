module.exports = {
  chainWebpack: (config) => {
    config.when(process.env.NODE_ENV === "production", (config) => {
      config.optimization.splitChunks(false);
      config.plugins.delete("extract-css");

      ["postcss", "scss", "css", "sass", "less", "stylus"].forEach(
        (element) => {
          ["vue-modules", "vue", "normal-modules", "normal"].forEach((m) => {
            config.module
              .rule(element)
              .oneOf(m)
              .uses.delete("extract-css-loader")
              .end()
              .use("vue-style-loader")
              .loader("vue-style-loader")
              .options({
                sourceMap: false,
                shadowMode: false,
              })
              .before("css-loader");
          });
        }
      );
    });
    // config.module
    //   .rule("images")
    //   .use("url-loader")
    //   .loader("url-loader")
    //   .tap(options => Object.assign(options, { limit: 1 * 100 * 1024 * 1024 }));
  },
  devServer: {
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://10.15.111.15:43227",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/storage_area/ext_plugins/web/3519b44f-8f66-47ca-bdba-75d655206b88/"
      : "/",
};
