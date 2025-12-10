// import styles from "./Button.module.css";

export default function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-lg bg-[var(--primary-color)] hover:bg-purple-700 transition ${className}`}
    >
      {children}
    </button>
  );
}