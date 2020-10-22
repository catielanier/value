module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
