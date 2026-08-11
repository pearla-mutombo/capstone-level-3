export default function Button({ children, onClick, type, disabled }) {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={disabled}
      className="w-full rounded-lg bg-[var(--nova)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--nova-dark)] disabled:cursor-not-allowed disabled:bg-gray-400">
      {children}
    </button>
  );

  function handleButtonClick() {
    if (!disabled) {
      onClick();
    }
  }
}
