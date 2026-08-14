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
    // Get the email and password from the login form.
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    // Make sure the user entered both fields.
    if (!email || !password) {
      return res.status(400).json({
        error: "Please enter your email and password.",
      });
    }

    // Find the user by email in the database.
    const user = await prisma.users.findFirst({
      where: {
        email,
      },
    });

    // Boolean variable: tells us whether the user was found.
    const userWasFound = user !== null;

    // If the user was not found, stop the login.
    if (!userWasFound) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Check whether the password matches the database password.
    const passwordIsCorrect = user.password === password;

    // If the password is incorrect, stop the login.
    if (!passwordIsCorrect) {
      return res.status(401).json({
        error: "Invalid email or password.",
      });
    }

    // Boolean variable: identifies the NOVUS Market administrator.
    const isAdmin = user.email === "admin@novusmarket.com";

    // Login was successful.
    // Send the user's information back to React.
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
    // Get the email and password from the registration form.
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

    // Boolean condition: stop registration if the account already exists.
    if (existingUser) {
      return res.status(409).json({
        error: "An account with that email already exists.",
      });
    }

    // Create the new user in the database.
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
    // Ask Prisma to read all products from the database.
    const products = await prisma.products.findMany({
      include: {
        reviews: true,
      },
    });

    // Send the products back to React as JSON.
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
    // Get the product information from the request.
    const { name, src, price, category } = req.body;

    // Create the product in the database.
    const product = await prisma.products.create({
      data: {
        name,
        src,
        price: price === "" || price == null ? null : Number(price),
        category,
      },
    });

    // Send the new product back to React.
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
    // Get the product ID from the URL.
    const id = BigInt(req.params.id);

    // Get the updated product information.
    const { name, src, price, category } = req.body;

    // Update the product in the database.
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

    // Send the updated product back to React.
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
    // Get the product ID from the URL.
    const id = BigInt(req.params.id);

    // Delete the product from the database.
    await prisma.products.delete({
      where: {
        id,
      },
    });

    // 204 means the request was successful
    // and there is no information to send back.
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

// ========================================
// PROJECT PRESENTATION NOTES
// ========================================
//
// "I created an Express server that provides REST API
// endpoints for my NOVUS Market application.
//
// Express receives requests from my React application,
// Prisma communicates with my PostgreSQL database,
// and my server sends the database results back to React
// as JSON.
//
// My product API demonstrates the four CRUD operations:
//
// GET    → READ products
// POST   → CREATE a product
// PUT    → UPDATE a product
// DELETE → DELETE a product
//
// I also created a login endpoint that checks the user's
// email and password against my users table.
//
// I use boolean variables such as userWasFound,
// passwordIsCorrect, and isAdmin to make decisions
// with conditionals.
//
// The isAdmin boolean lets the React application know
// whether the logged-in user should be sent to the
// administrator product management dashboard."
