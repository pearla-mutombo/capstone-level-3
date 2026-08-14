import { NavLink } from "react-router-dom";
import { useStateContext } from "../hooks/useStateContext";

export default function Dashboard() {
  const [login] = useStateContext("login");

  const isLoggedIn = login.email !== "";

  return (
    <main className="min-h-screen bg-(--surface) py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {isLoggedIn ? (
          <CustomerDashboard email={login.email} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </main>
  );
}

/* ========================================
   CUSTOMER DASHBOARD
======================================== */

function CustomerDashboard({ email }) {
  return (
    <div>
      {/* Welcome Section */}
      <section className="mb-10 rounded-2xl bg-white p-8 shadow-md sm:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-(--nova)">
          NOVUS Market
        </p>

        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Welcome back!
        </h1>

        <p className="mt-3 text-gray-600">
          You're signed in as{" "}
          <span className="font-semibold text-gray-900">{email}</span>.
        </p>
      </section>

      {/* Customer Options */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Your NOVUS Dashboard
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DashboardCard
            title="Shop Products"
            description="Browse our collection and discover products you'll love."
            buttonText="Shop Now"
            to="/products"
            icon="🛍️"
          />

          <DashboardCard
            title="Your Cart"
            description="View the products you've added and manage your shopping cart."
            buttonText="View Cart"
            to="/cart"
            icon="🛒"
          />

          <DashboardCard
            title="Your Profile"
            description="View and manage your NOVUS Market account information."
            buttonText="View Profile"
            to="/profile"
            icon="👤"
          />
        </div>
      </section>

      {/* Customer Information */}
      <section className="mt-10 rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Shopping at NOVUS Market
        </h2>

        <p className="leading-7 text-gray-600">
          Your dashboard gives you quick access to your shopping experience.
          Browse products, manage your cart, and keep your account information
          up to date.
        </p>

        <p className="mt-4 leading-7 text-gray-600">
          Product catalog management is reserved for NOVUS Market
          administrators.
        </p>
      </section>
    </div>
  );
}

/* ========================================
   REUSABLE DASHBOARD CARD
======================================== */

function DashboardCard({ title, description, buttonText, to, icon }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-5 text-4xl" aria-hidden="true">
        {icon}
      </div>

      <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>

      <p className="mb-6 flex-1 leading-6 text-gray-600">{description}</p>

      <NavLink
        to={to}
        className="inline-block rounded-lg bg-(--nova) px-5 py-3 text-center font-semibold text-white transition hover:bg-(--nova-dark)">
        {buttonText}
      </NavLink>
    </article>
  );
}

/* ========================================
   LOGGED-OUT MESSAGE
======================================== */

function LoginMessage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl bg-white p-10 text-center shadow-md">
      <div className="mb-5 text-5xl" aria-hidden="true">
        🔐
      </div>

      <h1 className="mb-4 text-3xl font-bold text-gray-900">
        Welcome to NOVUS Market
      </h1>

      <p className="mb-7 text-gray-600">
        Please log in to access your customer dashboard, shopping cart, and
        profile.
      </p>

      <NavLink
        to="/login"
        className="inline-block rounded-lg bg-(--nova) px-7 py-3 font-semibold text-white transition hover:bg-(--nova-dark)">
        Go to Login
      </NavLink>
    </section>
  );
}

// Note: My Dashboard provides product management functionality for NOVUS
// Market. I use my custom useProducts hook to communicate with my
// Express REST API. The dashboard can create, read, update, and delete
// products. Prisma handles the database operations on the backend,
// while React state updates the interface without requiring a page refresh.

// I use controlled inputs because React state is the source of truth for the
// form. Each input has a state value and a named onChange handler, so the
// form updates in real time as the user types.

// * Only administrators can manage the product catalog. Regular customers
// can browse, filter, sort, add products to their cart, and manage their
// account.*
