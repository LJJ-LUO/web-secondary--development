module.exports = {
  "/api": {
    target: "http://10.15.112.10:18094/",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  },
};
