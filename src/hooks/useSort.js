import { useMemo } from "react";

export default function useSort(products = [], sortBy = "") {
  const results = useMemo(() => {
    // Make a copy so we never change the original products array.
    const sortedProducts = [...products];

    sortedProducts.sort(byMethod);

    return sortedProducts;
  }, [products, sortBy]);

  return results;

  function byMethod(item1, item2) {
    switch (sortBy) {
      case "priceLow":
      case "sortByPrice":
        return Number(item1.price) - Number(item2.price);

      case "priceHigh":
        return Number(item2.price) - Number(item1.price);

      case "name":
      case "sortByName":
        return String(item1.name || "").localeCompare(String(item2.name || ""));

      default:
        return 0;
    }
  }
}
