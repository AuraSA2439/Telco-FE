import { Badge } from "@/components/atoms/Badge/Badge";
import styles from "./InfoKartu.module.css";

export default function InfoKartu({ kartu }) {
  return (
    <div className="wrapper">
      <div className={`${styles.title}`}>
        <h2>{kartu.number}</h2>
        <Badge>{kartu.status}</Badge>
      </div>
      <div className="description">
        <p>Berlaku sampai {kartu.timelimit}</p>
      </div>
    </div>
  );
}