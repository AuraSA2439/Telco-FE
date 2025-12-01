export const Badge = ({ children }) => (
  <div
    className={`p-0.5 rounded-md font-semibold text-[10px] text-white flex items-center bg-[var(--secondary-color)]`}
  >
    {children}
  </div>
);