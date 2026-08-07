export default function Header() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">NOVUS Market</h1>
      </nav>
      <ul className="flex gap-6 font-medium">
        <il>
          <a href="/">Home</a>
        </il>
        <il>
          <a href="/products">Products</a>
        </il>
        <il>
          <a href="/cart">Cart</a>
        </il>
        <il>
          <a href="/login">Login</a>
        </il>
      </ul>
    </header>
  );
}
