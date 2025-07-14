const httpProxy = require("http-proxy");

httpProxy
  .createProxyServer({
    target: process.env.HTTP_SERVER || "http://localhost:8002",
    ws: false,
  })
  .listen(process.env.PORT || 10000, () => {
    console.log(`HTTP proxy server started on port ${process.env.PORT || 10000}`);
    console.log(`Target server ::→ ${process.env.HTTP_SERVER || "http://localhost:8002"}`);
  });
