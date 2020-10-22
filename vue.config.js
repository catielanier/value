module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        secure: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
