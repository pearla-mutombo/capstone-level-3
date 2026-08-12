export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  function handleButtonClick() {
    if (!disabled && onClick) {
      onClick();
    }
  }

  return (
    <button
      type={type}
      onClick={handleButtonClick}
      disabled={disabled}
      className="w-full rounded-lg bg-purple-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400">
      {children}
    </button>
  );
}
