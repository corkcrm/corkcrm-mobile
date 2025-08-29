const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add proxy configuration for development to avoid CORS issues
  if (config.devServer) {
    config.devServer.proxy = {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      },
    };
  }
  
  return config;
};