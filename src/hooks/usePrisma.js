import { useState, useEffect } from "react";
import { createWebClient } from "../../prisma-template/web-client.js";
import schema from "../../json-schema.json";

export default function usePrisma({ password }) {
  const [prisma, setPrisma] = useState();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(componentDidUpdate, [password]);

  return [
    prisma,
    data,
    isLoading,
    errorMessage,
    createProduct,
    updateProduct,
    deleteProduct,
  ];

  function componentDidUpdate() {
    connectAndLoad();
  }

  async function connectAndLoad() {
    if (!password) return;

    try {
      setIsLoading(true);
      setErrorMessage("");

      const connectionString = `postgresql://postgres.vyaeweixpmstshejlmzs:${password}@aws-1-us-east-2.pooler.supabase.com:5432/postgres`;
      const prisma = await createWebClient({
        datasourceUrl: connectionString,
        jsonSchema: schema,
      });
      setPrisma(prisma);
      const allProducts = await prisma.products.findMany({
        include: { reviews: true },
      });
      setData(allProducts);
    } catch (error) {
      setErrorMessage("There was a problem connecting to the database.");
    } finally {
      setIsLoading(false);
    }
  }

  // Create a new product record.
  async function createProduct(newProduct) {
    if (!prisma) return;
    try {
      setErrorMessage("");
      const created = await prisma.products.create({ data: newProduct });
      setData(function addProduct(previousData) {
        return [...previousData, created];
      });
    } catch (error) {
      setErrorMessage("There was a problem creating the product.");
    }
  }

  // Update an existing product record.
  async function updateProduct(id, updates) {
    if (!prisma) return;
    try {
      setErrorMessage("");
      const updated = await prisma.products.update({
        where: { id },
        data: updates,
      });
      setData(function replaceProduct(previousData) {
        return previousData.map(function toUpdated(item) {
          return item.id === id ? updated : item;
        });
      });
    } catch (error) {
      setErrorMessage("There was a problem updating the product.");
    }
  }

  // Delete a product record.
  async function deleteProduct(id) {
    if (!prisma) return;
    try {
      setErrorMessage("");
      await prisma.products.delete({ where: { id } });
      setData(function removeProduct(previousData) {
        return previousData.filter(function isNotDeleted(item) {
          return item.id !== id;
        });
      });
    } catch (error) {
      setErrorMessage("There was a problem deleting the product.");
    }
  }
}
