// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api/123', {
      target: 'http://localhost:3000',
      changeOrigin: false,
      pathRewrite: {
        '^/api': '/api/crud'
      }
    })
  );
  app.use(
    proxy('/api', {
      target: 'http://localhost:8888',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  );

  // app.use(
  //   proxy('/xxx', {
  //     target: 'http://bbb:2000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/xxx': ''
  //     }
  //   })
  // );
};
