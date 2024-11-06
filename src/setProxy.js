const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://pandasanda.shop:8080',
        changeOrigin: true,
        })
    );
};