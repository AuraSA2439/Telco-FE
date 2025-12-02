export const Badge = ({ children }) => (
  <div
    className={`px-1 h-4.5 rounded-sm font-semibold text-[10px] text-white flex items-center bg-[var(--secondary-color)]`}
  >
    {children}
  </div>
);