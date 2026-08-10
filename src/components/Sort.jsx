import { useState, useEffect } from "react";
import useControlledInput from "../hooks/useControlledInput.js";

export default function Sort({ setSortBy }) {
  const [sortBy, handleSort] = useControlledInput();

  useEffect(componentDidUpdate, [sortBy, setSortBy]);

  return (
    <form className="w-full max-w-sm mx-auto my-4 p-4 border rounded-lg bg-white dark:bg-neutral-800">
      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-gray-700 dark:text-neutral-300 mb-2">
          Sort products by:
        </legend>
        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <input
            onChange={handleSort}
            className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
            type="radio"
            name="sort"
            id="sortByName"
            value="sortByName"
          />
          <label
            className=" mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
            htmlFor="sortByName">
            Product Name
          </label>
        </div>
        <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
          <input
            onChange={handleSort}
            className="relative float-left -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-secondary-500 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] rtl:float-right dark:border-neutral-400 dark:checked:border-primary"
            type="radio"
            name="sort"
            id="sortByPrice"
            value="sortByPrice"
          />
          <label
            className="mt-px inline-block ps-[0.15rem] hover:cursor-pointer"
            htmlFor="sortByPrice">
            Product Price
          </label>
        </div>
      </fieldset>
    </form>
  );

  function componentDidUpdate() {
    if (sortBy) {
      setSortBy(sortBy);
    }
  }
}
