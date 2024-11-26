const { createProxyMiddleware } = require('https-proxy-middleware');

module.exports = function(app) {

    const API_URL = process.env.REACT_API_URL;

    app.use(
        '/api',
        createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        })
    );
};