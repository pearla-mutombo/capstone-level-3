import { useEffect } from "react";
import useControlledInput from "../hooks/useControlledInput.js";

export default function Sort({ setSortBy }) {
  const [sortBy, handleSort] = useControlledInput();

  useEffect(componentDidUpdate, [sortBy, setSortBy]);

  return (
    <form className="mx-auto my-4 w-full max-w-sm rounded-lg border bg-white p-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="font-mono-label mb-2 text-sm uppercase text-gray-700">
          Sort products by:
        </legend>

        <label className="flex items-center gap-2 hover:cursor-pointer">
          <input
            onChange={handleSort}
            className="h-4 w-4 accent-(--nova)"
            type="radio"
            name="sort"
            id="sortByName"
            value="sortByName"
          />
          Product Name
        </label>

        <label className="flex items-center gap-2 hover:cursor-pointer">
          <input
            onChange={handleSort}
            className="h-4 w-4 accent-(--nova)"
            type="radio"
            name="sort"
            id="sortByPrice"
            value="sortByPrice"
          />
          Product Price
        </label>
      </fieldset>
    </form>
  );

  function componentDidUpdate() {
    if (sortBy) {
      setSortBy(sortBy);
    }
  }
}
