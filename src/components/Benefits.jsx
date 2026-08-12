import { Fragment } from "react/jsx-runtime";
import { benefits } from "../data/benefitsData";
import Spark from "./Spark";

export default function Benefits() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="font-mono-label flex items-center justify-center gap-2 text-sm uppercase `text-[var(--nova)`]">
            <Spark className="h-3 w-3" /> NOVUS Difference
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Why Shop With Us?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We make online shopping simple, secure, and convenient.
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(toDetailsBen)}
        </dl>
      </div>
    </section>
  );

  function toDetailsBen(benefit) {
    return (
      <Fragment key={benefit.id}>
        <div className="rounded-xl bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md">
          <dt>
            <div className="mb-4 text-4xl">{benefit.icon}</div>
            <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
          </dt>
          <dd>
            <p className="mt-3 text-gray-600">{benefit.description}</p>
          </dd>
        </div>
      </Fragment>
    );
  }
}
