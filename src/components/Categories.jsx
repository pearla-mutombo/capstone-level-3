import { Fragment } from "react/jsx-runtime";

export default function Categories() {
  const categories = [
    "Electronics",
    "Clothing",
    "Home",
    "Gaming",
    "Books",
    "Jewlery",
  ];

  return (
    <section className="bg-white py-16">
      <h2 className="text-4xl font-bold text-center mb-10">Shop by Category</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-6">
        <output className="bg-blue-100 rounded-xl p-8 text-center text-xl font-semibold hover:bg-blue-200 cursor-pointer">
          {categories.map(toDetailsCat)}
        </output>
      </div>
    </section>
  );

  function toDetailsCat() {
    const key = item + index;
    const details = (
      <Fragment key={key}>
        <dt className="bg-blue-100 rounded-xl p-8 text-center text-xl font-semibold hover:bg-blue-200 cursor-pointer">
          {category}
        </dt>
      </Fragment>
    );
  }
  return details;
}
