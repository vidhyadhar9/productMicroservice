const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

app.use("/auth", createProxyMiddleware({
  target: "http://auth-service:5001",
  changeOrigin: true,
  pathRewrite: { "^/auth": "" }
}));

app.use("/products", createProxyMiddleware({
  target: "http://product-service:5002",
  changeOrigin: true
}));

app.listen(8080, () => console.log("Gateway running on 8080"));
