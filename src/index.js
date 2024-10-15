const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT;
dotenv.config();

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World 2024!");
});

app.get("/product", async (req, res) => {
  const products = await prisma.product.findMany();
  res.send(products);
});

app.post("/product", async (req, res) => {
  const request = req.body;
  const product = await prisma.product.create({
    data: {
      name: request.name,
      price: request.price,
      description: request.description,
      image: request.image,
    },
  });
  res.send({
    data: product,
    message: "product created",
  });
});

app.patch("/product/:id", async (req, res) => {
  const id = req.params.id;
  const request = req.body;
  const product = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data: {
      name: request.name,
      price: request.price,
      description: request.description,
      image: request.image,
    },
  });
  res.send({
    data: product,
    message: "product updated",
  });
});

app.delete("/product/:id", async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
    res.send({
    data: [],
    message: "product deleted",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
