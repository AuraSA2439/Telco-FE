import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth";
import InfoPulsa from "@/components/molecules/InfoPulsa/InfoPulsa";
import InfoPaket from "@/components/molecules/InfoPaket/InfoPaket";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import styles from "./CardPaket.module.css";

export default function CardPaket() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading user info...</p>;
  if (!user) return <p>No user info found</p>;

  const kartuData = {
    pulsa: `${user.balance.toLocaleString("id-ID")}`,
    dataQuota: user.dataQuota,
    videoQuota: user.videoQuota,
    voiceQuota: user.voiceQuota,
    smsQuota: user.smsQuota,
  };

  return (
    <>
    <CardContainer size="large" className={`${styles.wrapper} md:flex-row`}>
      <InfoPulsa kartu={kartuData} />
      <InfoPaket kartu={kartuData} />
    </CardContainer>
    </>
  );
}