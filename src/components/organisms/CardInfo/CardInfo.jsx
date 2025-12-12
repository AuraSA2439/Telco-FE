"use client";

import { useEffect, useState } from "react";
import { getProfile } from "@/services/auth";
import InfoKartu from "@/components/molecules/InfoKartu/InfoKartu";
import InfoDevice from "@/components/molecules/InfoDevice/InfoDevice";
import CardContainer from "@/components/atoms/CardContainer/CardContainer";
import styles from "./CardInfo.module.css";

export default function CardInfo() {
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
    number: user.phoneNumber,
    status: user.status,
    timelimit: user.timelimit,
    device: user.device,
    pulsa: user.pulsa,
  };

  return (
    <CardContainer size="large" className={styles.wrapper}>
      <InfoKartu kartu={kartuData} />
      <InfoDevice kartu={kartuData} />
    </CardContainer>
  );
}