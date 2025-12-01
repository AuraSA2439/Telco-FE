export default function Icon({
  name,
  size = 24,
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize, // optional: defaults to size
  className = "",
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `
          "FILL" ${fill ? 1 : 0},
          "wght" ${weight},
          "GRAD" ${grade},
          "opsz" ${opticalSize || size}
        `,
      }}
    >
      {name}
    </span>
  );
}