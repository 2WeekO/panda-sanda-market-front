const { createProxyMiddleware } = require('https-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://172.30.1.66:8080',
        changeOrigin: true,
        })
    );
};