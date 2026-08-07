export default function Hero() {
  return (
    <section className="text-center py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <h2 className="text-5xl font-bold mb-4">Welcome to NOVUS Market</h2>
      <p className="text-xl mb-8">
        Shop smarter with quality products at unbeatable prices
      </p>

      <div className="space-x-4">
        <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
          Shop Now
        </button>

        <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700">
          Learn More
        </button>
      </div>
    </section>
  );
}
