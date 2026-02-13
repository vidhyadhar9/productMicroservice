require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

const Product = mongoose.model("Product", {
  name: String,
  price: Number,
  description: String
});

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 */
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create product
 */
app.post("/products", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Product API", version: "1.0.0" }
  },
  apis: ["./server.js"]
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(5002, () => console.log("Product running on 5002"));
