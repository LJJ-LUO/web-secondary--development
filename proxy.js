module.exports = {
  '/api': {
    'target': 'http://10.15.110.29:18089',
    'changeOrigin': true,
    'pathRewrite': { '^/api' : '' },

  },
}