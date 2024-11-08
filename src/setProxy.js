const { createProxyMiddleware } = require('https-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'https://pandasanda.shop',
        changeOrigin: true,
        })
    );
};