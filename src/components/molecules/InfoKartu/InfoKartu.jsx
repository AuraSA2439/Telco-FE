import { Badge } from "@/components/atoms/Badge/Badge";
import styles from "./InfoKartu.module.css";

export default function InfoKartu({ kartu }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <h2>{kartu.number}</h2>
        <Badge>{kartu.planType}</Badge>
      </div>

      <div className={styles.description}>
        <p className="text-gray-400">
          Berlaku sampai {kartu.expiryDate}
        </p>
      </div>
    </div>
  );
}