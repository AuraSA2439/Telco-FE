export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition"
  >
    {children}
  </button>
);