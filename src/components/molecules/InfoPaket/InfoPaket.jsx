import styles from "./InfoPaket.module.css";
import TempInfo from "@/components/molecules/TempInfo/TempInfo";
import { formatQuota } from "@/utils/formatQuota";

export default function InfoPaket({ kartu }) {
  return (
    <div className="w-full h-full flex items-center justify-evenly">
      <TempInfo 
        title="Internet" 
        description={formatQuota(kartu.dataQuota)} 
      />
      <TempInfo 
        title="Video" 
        description={formatQuota(kartu.videoQuota)} 
      />
      <TempInfo 
        title="Telepon" 
        description={
          kartu.voiceQuota === 999999
            ? "Unlimited"
            : `${kartu.voiceQuota} Menit`
        }
      />
      <TempInfo 
        title="SMS" 
        description={
          kartu.smsQuota === 999999
            ? "Unlimited"
            : `${kartu.smsQuota} SMS`
        }
      />
    </div>
  );
}