import InfoKartu from "@/components/molecules/InfoKartu/InfoKartu";
import InfoDevice from "@/components/molecules/InfoDevice/InfoDevice";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import styles from "./CardInfo.module.css";

export default function CardInfo({ }) {
  const kartuData = {
    number: "082345678910",
    status: "Prepaid",
    timelimit: "31 Desember 2025",
    device: "Poco M4 Pro",
    pulsa: "Rp 100.000",
  };

  return (
    <>
    <CardContainer size="large" className={styles.wrapper}>
      <InfoKartu kartu={kartuData} />
      <InfoDevice kartu={kartuData} />
    </CardContainer>
    </>
  );
}  