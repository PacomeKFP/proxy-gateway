const http = require("http");
const httpProxy = require("http-proxy");

const _socketProxy= httpProxy.createProxyServer({
    target: process.env.SOCKET_SERVER || "http://localhost:3308",
    ws: true,
});

const _httpProxy = httpProxy.createProxyServer({
    target: process.env.HTTP_SERVER || "http://localhost:8002",
    ws: false,
});

const server = http.createServer((req, res) => {
    const url = req.url || "";
    if (url.startsWith("/http")) {
        req.url = url.replace("/http", ""); // enlever le prefix
        _socketProxy.web(req, res);
    } else if (url.startsWith("/socket")) {
        req.url = url.replace("/socket", "");
        _httpProxy.web(req, res);
    } else {
        res.writeHead(404);
        res.end("Not found");
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Proxy server started on port ${PORT}`);
    console.log(`- /http    → http://localhost:3308`);
    console.log(`- /socket  → http://localhost:8002`);
    console.log("Ready to proxy HTTP and WebSocket requests.");
});
