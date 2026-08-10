import { useState, useEffect } from "react";
import { createWebClient } from "../../../prisma-template/web-client.js";
import schema from "../../../prisma-template/json-schema.json";

export default function usePrisma(password) {
//   debugger;
  const [prisma, setPrisma] = useState();
  const [data, setData] = useState([]);

  useEffect(componentDidUpadte, [password]);
  return [prisma, data];

  function componentDidUpadte() {
    handlePrisma();
  }

  async function handlePrisma() {
    if (password) {
      const connectionString = `postgresql://postgres.vyaeweixpmstshejlmzs:${password}@aws-1-us-east-2.pooler.supabase.com:5432/postgres`;
      const prisma = await createWebClient({
        datasourceUrl: connectionString,
        jsonSchema: schema,
      });
      setPrisma(prisma);
      const allProducts = await prisma.novusProducts.findMany();
      setData(allProducts);
    }
  }
}
