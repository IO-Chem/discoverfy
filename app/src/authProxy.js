const { createProxyMiddleware } = require("http-proxy-middleware");

// Redirects all calls to /auth endpoints to
// development express server on port 5000
module.exports = function (app) {
    app.use("/auth/**", createProxyMiddleware({
        target: "http://localhost:5000",
    }));
};