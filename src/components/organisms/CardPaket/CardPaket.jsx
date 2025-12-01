// import InfoPulsa from "@/components/molecules/InfoPulsa/InfoPulsa";
// import InfoPaket from "@/components/molecules/InfoPaket/InfoPaket";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import styles from "./CardPaket.module.css";

export default function CardPaket({ }) {
  const kartuData = {
    number: "082345678910",
    status: "Prepaid",
    timelimit: "31 Desember 2025",
    device: "Poco M4 Pro",
    pulsa: 100000,
    paket: 10,
  };

  return (
    <>
    <CardContainer size="large" className={styles.wrapper}>
      {/* <InfoPulsa kartu={kartuData} />
      <InfoPaket kartu={kartuData} /> */}
    </CardContainer>
    </>
  );
}