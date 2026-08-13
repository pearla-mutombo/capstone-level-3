import express from "express";
import cors from "cors";
import { PrismaClient } from "./prisma-template/generated/prisma/client.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Convert Prisma BigInt values into strings
// so they can safely be sent as JSON.
function prepareForJson(data) {
  return JSON.parse(
    JSON.stringify(data, function convertBigInt(key, value) {
      return typeof value === "bigint" ? value.toString() : value;
    }),
  );
}

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await prisma.products.findMany({
      include: {
        reviews: true,
      },
    });

    res.json(prepareForJson(products));
  } catch (error) {
    console.error("GET products error:", error);
    res.status(500).json({
      error: "There was a problem fetching products.",
    });
  }
});

// POST create a product
app.post("/api/products", async (req, res) => {
  try {
    const { name, src, price, category } = req.body;

    const product = await prisma.products.create({
      data: {
        name,
        src,
        price: price === "" || price == null ? null : Number(price),
        category,
      },
    });

    res.status(201).json(prepareForJson(product));
  } catch (error) {
    console.error("POST product error:", error);
    res.status(500).json({
      error: "There was a problem creating the product.",
    });
  }
});

// PUT update a product
app.put("/api/products/:id", async (req, res) => {
  try {
    const id = BigInt(req.params.id);
    const { name, src, price, category } = req.body;

    const product = await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        src,
        price: price === "" || price == null ? null : Number(price),
        category,
      },
    });

    res.json(prepareForJson(product));
  } catch (error) {
    console.error("PUT product error:", error);
    res.status(500).json({
      error: "There was a problem updating the product.",
    });
  }
});

// DELETE a product
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = BigInt(req.params.id);

    await prisma.products.delete({
      where: {
        id,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error("DELETE product error:", error);
    res.status(500).json({
      error: "There was a problem deleting the product.",
    });
  }
});

// Start the API server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});