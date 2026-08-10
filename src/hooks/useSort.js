import { useState, useEffect } from "react";

export default function Sort(products, sortBy) {
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
      case "sortByPrice": {
        const result = Number(item1.price) - Number(item2.price);
        return result;
      }
      case "sortByName": {
        const result = item1.name.localeCompare(item2.name);
        return result;
      }
      default:
        return 0;
    }
  }
}
