const isLocalhost = process.env.NODE_ENV === "development"; //本地开发环境
const config = {
  server: {
    port: process.env.PORT || 9000,
    host: "localhost"
  },

  dist: "../app/dist",
  publicPath: isLocalhost ? "/" : "../"
};

module.exports = config;
