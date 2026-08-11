import { PrismaClient } from "./generated/prisma/client.js";

// This creates our connection to the database.
const prisma = new PrismaClient();

// This is a list of all the products we want to add to the database.
// Each product is one object inside the list.

const products = [
  {
    name: "Signature Round Deep Oven Pot",
    src: "https://www.lecreuset.com/dw/image/v2/BDRT_PRD/on/demandware.static/-/Sites-le-creuset-master/default/dw07110491/images/cat_dutch_ovens/deep_round_dutch_oven/round_deep_oven_gallery_olive.jpg?sw=650&sh=650&sm=fit",
    price: 289.99,
    category: "Home",
  },
  {
    name: "Cutting Board Set",
    src: "https://images.ctfassets.net/vitsw3itv0qj/1vbAxF9CsMUs6p6P7eIrvj/0a32d7b0b0df05bf15337bb50acd57ea/Cutting_Board_Set_-_Hero.jpg",
    price: 85.99,
    category: "Home",
  },
  {
    name: "Utensil Set",
    src: "https://images.ctfassets.net/vitsw3itv0qj/3bp2ESfZ4BgljnZiQJWduC/2fb58d9538e2e0964d5c05e404090ccf/Utensil_Set_-_FSC_Birch_Wood_-_Hero.jpg",
    price: 125.99,
    category: "Home",
  },
  {
    name: "Knife Set",
    src: "https://images.ctfassets.net/vitsw3itv0qj/6IQ9VenKXtCdDdar0vLWtH/64bcd11c98ba30ffc1f0762be968441a/Knife_Set_-_Charcoal_-_Hero.jpg?fm=webp&w=1920&q=95",
    price: 224.99,
    category: "Home",
  },
  {
    name: "Dot & Dash Container Set of 6",
    src: "https://images.ctfassets.net/vitsw3itv0qj/3snKJb88yZcXOZYOAvQ6tz/07195cea5684935a5a67cd0490d57936/Dot___Dash_Set_-_Hero_v2.jpg",
    price: 64.99,
    category: "Home",
  },
  {
    name: "EveryDay Cotton-Blend Classic T-Shirt",
    src: "https://images.lululemon.com/is/image/lululemon/LM3GTOS_0002_1?wid=1280&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    price: 19.99,
    category: "Clothing",
  },
  {
    name: "Rulu Fleece Half-Zip Long-Sleeve Shirt",
    src: "https://images.lululemon.com/is/image/lululemon/LM3FTWS_0001_1?wid=1280&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    price: 99.99,
    category: "Clothing",
  },
  {
    name: "Black Cap",
    src: "https://images.ctfassets.net/hnk2vsx53n6l/4rJk8W8xAam0L51dqFbcQc/3a042cb5d82ba55c73e57cf621298c91/377b030e3303a646734bd09130bee620485ff25b.jpg",
    price: 25.99,
    category: "Clothing",
  },
  {
    name: "Salutations Yoga Tank Top",
    src: "https://pdimg-prod-fmv3.findmine.com/v3/8d6d9f73-a230-42b1-be05-b440951058ab/e966ec69-aacf-439d-aaa5-0adba05b6ec9.0700.lg.png?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    price: 35.99,
    category: "Clothing",
  },
  {
    name: "Salutations High-Rise Yoga Tight",
    src: "https://pdimg-prod-fmv3.findmine.com/v3/6aaefe3f-e6ff-4910-abd3-b8145b9dc578/8471439a-eeb1-4bc7-8255-4471b3fbfd35.lg.png?wid=2420&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    price: 65.99,
    category: "Clothing",
  },
  {
    name: "Champagne Signature Candle - ginger, grapefruit, raspberry",
    src: "https://www.lafco.com/mm5/graphics/00000001/1/signature-champagne-candle.webp",
    price: 45.25,
    category: "Home",
  },
  {
    name: "Marine Signature Candle - bergamot, marine, jasmine",
    src: "https://www.lafco.com/mm5/graphics/00000001/1/signature-marine-candle.webp",
    price: 55.25,
    category: "Home",
  },
  {
    name: "Structured Classic Ball Cap",
    src: "https://images.lululemon.com/is/image/lululemon/LU9DBCS_075700_1?wid=1280&op_usm=0.5,2,10,0&fmt=webp&qlt=80,1&fit=constrain,0&op_sharpen=0&resMode=sharp2&iccEmbed=0&printRes=72",
    price: 25.99,
    category: "Clothing",
  },
  {
    name: "The Age of Surveillance Capitalism by Shoshana Zuboff",
    src: "https://static01.nyt.com/images/2019/01/17/books/17bookzuboff1/17bookzuboff1-articleLarge.jpg",
    price: 17.0,
    category: "Books",
  },
  {
    name: "Tuesdays with Morrie by Mitch Albom",
    src: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*Qu6mX-3RyKdmCfGEV_wyNw.png",
    price: 9.43,
    category: "Books",
  },
  {
    name: "Sapiens: A Brief History of Humankind by Yuval Noah Harari",
    src: "https://5.imimg.com/data5/SELLER/Default/2021/9/UM/SB/PD/133456484/sapiens-a-brief-history-of-humankind-paperback-1000x1000.jpg",
    price: 25.63,
    category: "Books",
  },
  {
    name: "Marbella Pendant Necklace",
    src: "https://media.davidyurman.com/productsv2/D18261/D18261-88/D18261-88APA.jpg",
    price: 155.5,
    category: "Jewelry",
  },
  {
    name: "Aquamarine Glace Diamond Ring",
    src: "https://image.brilliantearth.com/media/gemstone_ring_vto/M5/BE1D8800_AQBZ9X7EC3_white_top.png",
    price: 458.9,
    category: "Jewelry",
  },
  {
    name: "Apple AirPods Pro 3 Wireless Earbuds",
    src: "https://m.media-amazon.com/images/I/61solmQSSlL._AC_SL1500_.jpg",
    price: 189.99,
    category: "Electronics",
  },
  {
    name: "Digital Camera",
    src: "https://m.media-amazon.com/images/I/71OnD2sjxlL._AC_SL1500_.jpg",
    price: 46.99,
    category: "Electronics",
  },
  {
    name: "Desktop",
    src: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/8eb1353d-9c12-441b-93c7-25d5124b4ae7.jpg",
    price: 2099.0,
    category: "Electronics",
  },
  {
    name: "Meta Quest 3S",
    src: "https://pyxis.nymag.com/v1/imgs/6d2/621/805c9761f36f1a61d5a8b8765a7a462f37-meta-gift-box-final.2x.rsquare.w400.jpg",
    price: 449.99,
    category: "Gaming",
  },
  {
    name: "8BitDo SN30 Pro Bluetooth Controller",
    src: "https://pyxis.nymag.com/v1/imgs/e4b/c83/f4d863b141b174b688302eb9303e239c3b.2x.rsquare.w600.jpg",
    price: 39.0,
    category: "Gaming",
  },
  {
    name: "3D-Printed Pokemon Controller Stand",
    src: "https://pyxis.nymag.com/v1/imgs/0e5/ae5/3a987e7ef084f2bce3a22f27103f26ac01.2x.rsquare.w600.jpg",
    price: 25.0,
    category: "Gaming",
  },
  {
    name: "Samsung microSD Express Card 256 GB",
    src: "https://pyxis.nymag.com/v1/imgs/efc/e89/8a7d2a555b55762e241d8eebe52c2606c8.2x.rdeep-vertical.w245.jpg",
    price: 60.0,
    category: "Electronics",
  },
];

// Run everything by calling our main function at the bottom of the file.
runSeedScript();

// This is our main function. It runs each database step one at a time,
// in order: Create, Read, Update, Delete.
async function runSeedScript() {
  await createAllProducts();
  await readAllProducts();
  await readOneProduct();
  await updateOneProduct();
  // await deleteOneProduct(); // uncomment this line if you want to test delete

  // Always close the database connection when we are done.
  await closeDatabaseConnection();
}

// CREATE: adds every product in our list to the database, one at a time.
// Before creating each one, we check if a product with that same name
// already exists, so running this script more than once does not
// keep adding duplicate rows.
async function createAllProducts() {
  console.log("Creating products...");

  // A for loop that goes through every product in our list.
  for (let index = 0; index < products.length; index++) {
    const product = products[index];

    try {
      // Look for a product that already has this name.
      const existingProduct = await prisma.products.findFirst({
        where: { name: product.name },
      });

      // If we already found one, skip it instead of creating a duplicate.
      if (existingProduct) {
        console.log("Already exists, skipping:", product.name);
        continue;
      }

      const createdProduct = await prisma.products.create({
        data: product,
      });
      console.log("Created:", createdProduct.name);
    } catch (error) {
      // If one product fails for some other reason, we print the
      // error but keep going instead of stopping the whole script.
      console.log("Could not create " + product.name + ":", error.message);
    }
  }
}

// READ: gets every product from the database and prints how many we found.
async function readAllProducts() {
  console.log("Reading all products...");

  try {
    const allProducts = await prisma.products.findMany();
    console.log("Found " + allProducts.length + " products.");
  } catch (error) {
    console.log("Could not read products:", error.message);
  }
}

// READ ONE: gets a single product, along with its reviews using `include`.
// Change "reviews" to match whatever relation my schema actually has.
async function readOneProduct() {
  console.log("Reading one product with its reviews...");

  try {
    const oneProduct = await prisma.products.findFirst({
      include: {
        reviews: true,
      },
    });
    console.log("Sample product:", oneProduct);
  } catch (error) {
    console.log("Could not read a single product:", error.message);
  }
}

// UPDATE: changes one field on one product.
// This finds the first product in the database so it always has a
// real id to update, instead of guessing a number that might not exist.
async function updateOneProduct() {
  console.log("Updating one product...");

  try {
    const productToUpdate = await prisma.products.findFirst();

    if (productToUpdate) {
      const updatedProduct = await prisma.products.update({
        where: { id: productToUpdate.id },
        data: { price: productToUpdate.price },
      });
      console.log("Updated:", updatedProduct.name);
    }
  } catch (error) {
    console.log("Could not update the product:", error.message);
  }
}

// DELETE: removes one product from the database.
// This is not called automatically (see runSeedScript above) so that
// running this file over and over does not keep deleting my data.
async function deleteOneProduct() {
  console.log("Deleting one product...");

  try {
    const deletedProduct = await prisma.products.delete({
      where: { id: 63 },
    });
    console.log("Deleted:", deletedProduct.name);
  } catch (error) {
    console.log("Could not delete the product:", error.message);
  }
}

async function closeDatabaseConnection() {
  await prisma.$disconnect();
  console.log("Disconnected from the database.");
}
