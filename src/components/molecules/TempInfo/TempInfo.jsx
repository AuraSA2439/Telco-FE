import styles from "./TempInfo.module.css";
import Icon from "@/components/atoms/Icon/Icon";

export default function TempInfo({ title = "Paket", description = "Isi Paket" }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>{title}</h2>
      </div>

      <Icon className="w-12 h-12 rounded-full bg-gradient-to-t from-[var(--primary-color)] to-[var(--secondary-color)]" />

      <div className={styles.description}>
        <p>{description}</p>
      </div>
    </div>
  );
}