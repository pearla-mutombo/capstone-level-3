import Spark from "./Spark";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-center text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="flex items-center justify-center gap-2 text-lg font-bold">
          <Spark className="h-4 w-4" /> NOVUS Market
        </p>

        <p className="mt-3 text-sm text-gray-400">
          © 2026 NOVUS Market. All Rights Reserved.
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Created by Pearla Mutombo - Capstone Level 03
        </p>
      </div>
    </footer>
  );
}
