module.exports = {
  '/api': {
    // 'target': 'http://10.15.111.9:7251/',
    target: "http://14.21.43.38:18080",
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
  },
}
