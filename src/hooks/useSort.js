import { useState, useEffect } from "react";

export default function useSort(products, sortBy) {
  const [results, setResults] = useState([]);

  useEffect(componentDidUpdate, [products, sortBy]);

  return results;

  function componentDidUpdate() {
    if (products) {
      const sortResults = products.toSorted(byMethod);
      setResults(sortResults);
    }
  }

  function byMethod(item1, item2) {
    switch (sortBy) {
      case "priceLow":
      case "sortByPrice": {
        return Number(item1.price) - Number(item2.price);
      }
      case "priceHigh": {
        return Number(item2.price) - Number(item1.price);
      }
      case "name":
      case "sortByName": {
        return item1.name.localeCompare(item2.name);
      }
      default:
        return 0;
    }
  }
}
