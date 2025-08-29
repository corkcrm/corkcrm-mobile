const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add proxy configuration for development
if (process.env.NODE_ENV === 'development') {
  // This helps with CORS issues when running on web
  config.server = {
    ...config.server,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Proxy API requests to Rails backend
        if (req.url.startsWith('/api/')) {
          const apiUrl = `http://localhost:3000${req.url}`;
          console.log(`Proxying ${req.url} to ${apiUrl}`);
          
          const http = require('http');
          const options = {
            hostname: 'localhost',
            port: 3000,
            path: req.url,
            method: req.method,
            headers: req.headers,
          };
          
          const proxy = http.request(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res, { end: true });
          });
          
          req.pipe(proxy, { end: true });
        } else {
          return middleware(req, res, next);
        }
      };
    },
  };
}

module.exports = config;