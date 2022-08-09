module.exports = {
  '/api': {
    // 'target': 'http://10.15.111.9:7251/',
    target: "http://10.15.70.123:12203",
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },
  },
}
