import { useState, useEffect } from "react";

export default function useSearch(products, search) {

  const [results, setResults] = useState([]);

  useEffect(componentDidUpdate, [products, search]);
  
  return results;

  function toMatch(item) {
    if (!search) return true;
    if (search.maxPrice) {
      const isLowerPrice = Number(item.price) <= Number(search.maxPrice);
      if (!isLowerPrice) return false;
    }

    if (search.name) {
      const includesName = item.name.includes(search.name);
      if (!includesName) return false;
    }

    if (search.id) {
      const matchesId = item.id === search.id;
      if (!matchesId) return false;
    }

    return true;
  }

  function componentDidUpdate() {
    if (products) {
      const searchResults = products.filter(toMatch);
      setResults(searchResults);
    }
  }
}
