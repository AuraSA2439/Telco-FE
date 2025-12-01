import styles from "./InfoDevice.module.css";

export default function InfoDevice({ kartu }) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.title}`}>
        <h2>Device:</h2>
      </div>
      <div className={`${styles.description}`}>
        <p>{kartu.device}</p>
      </div>
    </div>
  );
}