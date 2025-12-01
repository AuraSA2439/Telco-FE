import styles from "./Button.module.css";

export const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-white rounded-lg bg-[var(--primary-color)] hover:bg-purple-700 transition`}
  >
    {children}
  </button>
);