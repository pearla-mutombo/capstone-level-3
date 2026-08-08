export default function Button({ children, onClick, type, disabled }) {
  return (
    <button
      type="button"
      onClick={handleButtonClick}
      disabled={disabled}
      className="w-full bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg hover:bg-blue-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
      {children}
    </button>
  );

  function handleButtonClick() {
    if (!disabled) {
      onClick();
    }
  }
}
