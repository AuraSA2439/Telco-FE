import styles from "./CardContainer.module.css";

export default function CardContainer({ children, size = "medium", className, style = {} }) {
  return (
    <div className={`${styles.container}  ${styles[size]}  ${className || ""}`}>
      {children}
    </div>
  );
}