import express from "express";
import cors from "cors";
import { PrismaClient } from "./prisma-template/generated/prisma/client.js";

const app = express();
const prisma = new PrismaClient();

// Allow the React application to communicate with this server.
app.use(cors());

// Allow the server to receive JSON data.
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

// ========================================
// LOGIN
// ========================================

// POST login
app.post("/api/login", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Make sure the user entered both fields.
    if (!email || !password) {
      return res.status(400).json({
        error: "Please enter your email and password.",
      });
    }

    // Find the user by email.
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    // Check if we found a user with this email.
    const userWasFound = user !== null;

    if (!userWasFound) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Check if the password is correct.
    const passwordIsCorrect = user.password === password;

    if (!passwordIsCorrect) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Check whether this user is the NOVUS Market administrator.
    const isAdmin = user.email === "admin@novusmarket.com";

    // Login was successful.

    // Check whether this user is the NOVUS Market administrator.
    const isAdmin = user.email === "admin@novusmarket.com";

    res.json({
      id: user.id.toString(),
      email: user.email,
      isAdmin,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      error: "There was a problem logging in.",
    });
  }
});

// ========================================
// REGISTER
// ========================================

// POST register a new user
app.post("/api/register", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Make sure both fields were entered.
    if (!email || !password) {
      return res.status(400).json({
        error: "Please enter an email and password.",
      });
    }

    // Make sure the password is long enough.
    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters.",
      });
    }

    // Check whether the email already exists.
    const existingUser = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        error: "An account with that email already exists.",
      });
    }

    // Create the new user.
    const user = await prisma.users.create({
      data: {
        email,
        password,
      },
    });

    // Send the new user's information back to React.
    res.status(201).json({
      id: user.id.toString(),
      email: user.email,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      error: "There was a problem creating your account.",
    });
  }
});

// ========================================
// PRODUCT CRUD
// ========================================

// GET all products
// READ
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
// CREATE
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
// UPDATE
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
// DELETE
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
    console.error("DELETE products error:", error);

    res.status(500).json({
      error: "There was a problem deleting the product.",
    });
  }
});

// ========================================
// START SERVER
// ========================================

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

// Explanation for my project presentation:
//
// "I created an Express server that provides REST API
// endpoints for my NOVUS Market products. Express receives
// requests from my React application, Prisma communicates
// with my PostgreSQL database, and the server sends the
// database results back to React as JSON.
//
// My four CRUD routes are:
//
// GET    → Read products
// POST   → Create a product
// PUT    → Update a product
// DELETE → Delete a product
//
// I also created a login endpoint that checks the user's
// email and password against my users table."
