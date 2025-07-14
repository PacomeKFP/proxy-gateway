const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    target: process.env.SOCKET_SERVER || "http://localhost:3308",
    ws: true,
  })
  .listen(process.env.PORT || 10000, () => {
    console.log(`Socket proxy server started on port ${process.env.PORT || 10000}`);
    console.log(`Target server :: → ${process.env.SOCKET_SERVER || "http://localhost:3308"}`);
  });
