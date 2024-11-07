const { createProxyMiddleware } = require('https-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://121.173.211.228:8080',
        changeOrigin: true,
        })
    );
};