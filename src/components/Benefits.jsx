import { Fragment } from "react/jsx-runtime";
import { benefits } from "../data/benefitsData";


export default function Benefits() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-700 font-semibold uppercase tracking-wide">
            NOVUS Difference
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Why Shop With Us?
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We make online shopping simple, secure, and convenient.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <article>{benefits.map(toDetailsBen)}</article>
        </div>
      </div>
    </section>
  );

  function toDetailsBen() {
    const key = benefits.id;
    const details = (
      <Fragment key={key}>
        <dt>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            {benefits.id}
          </div>

          <div className="text-4xl mb-4">{benefits.icon}</div>

          <h3 className="text-xl font-bold text-gray-900">{benefits.title}</h3>
        </dt>
        <dd>
          <p className="text-gray-600 mt-3">{benefits.description}</p>
        </dd>
      </Fragment>
    );
    return details;
  }
}
