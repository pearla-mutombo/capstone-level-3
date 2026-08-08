import { Fragment } from "react/jsx-runtime";
import categories from "../data/categorySelectionData";

export default function () {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-700 font-semibold uppercase tracking-wide">
            Explore
          </p>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Shop by Category
          </h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find exactly what you're looking for by exploring our collection of
            popular categories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(toCategory)}
          <button></button>
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
            key={category.id}
            type="button"
            className="group text-left bg-gray-50 border border-gray-200 rounded-xl p-6 hover:bg-blue-50 hover:border-blue-300 transition-all">
            <div className="text-4xl mb-4">{category.icon}</div>

            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700">
              {category.name}
            </h3>

            <p className="text-gray-600 mt-2">{category.description}</p>
          </button>
        </dd>
      </Fragment>
    );
  }
}
