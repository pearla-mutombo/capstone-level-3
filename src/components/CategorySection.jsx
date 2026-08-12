import { Fragment } from "react/jsx-runtime";
import categories from "../data/categorySelectionData";
import Spark from "./Spark.jsx";

export default function () {
  return (
    <section id="categories" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono-label flex items-center justify-center gap-2 text-sm uppercase `text-(--nova)`">
            <Spark className="h-3 w-3" /> Explore
          </p>
          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Shop by Category
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Find exactly what you're looking for by exploring our collection of
            popular categories.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map(toCategory)}
        </div>
      </div>
    </section>
  );

  function toCategory(category) {
    const key = category.id;
    const details = (
      <Fragment key={key}>
        <dd>
          <button
            key={key}
            type="button"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-6 text-left transition-all `hover:border-(--nova)` hover:bg-blue-50">
            <div className="mb-4 text-4xl">{category.icon}</div>

            <h3 className="text-xl font-bold text-gray-900 `group-hover:text-(--nova)`">
              {category.name}
            </h3>

            <p className="mt-2 text-gray-600">{category.description}</p>
          </button>
        </dd>
      </Fragment>
    );
    return details;
  }
}
