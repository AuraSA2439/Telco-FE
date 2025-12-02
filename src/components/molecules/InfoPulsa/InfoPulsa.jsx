import Link from "next/link";
import styles from "./InfoPulsa.module.css";

export default function InfoPulsa({ kartu }) {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.title}`}>
        <h2>Pulsa</h2>
      </div>
      <div className={`${styles.description}`}>
        <p>Rp. {kartu.pulsa}</p>
      </div>
      <Link href="/" className={`${styles.link}`}>Isi Pulsa</Link>
    </div>
  );
}