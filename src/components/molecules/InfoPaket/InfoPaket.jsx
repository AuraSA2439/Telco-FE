import styles from "./InfoPaket.module.css";
import Icon from "@/components/atoms/Icon/Icon";
import TempInfo from "@/components/molecules/TempInfo/TempInfo";

export default function InfoPaket({ kartu }) {
  return (
    <div className="w-full h-full flex items-center justify-evenly">
      <TempInfo 
        title="Internet" 
        description="2.5 GB" 
      />
      <TempInfo 
        title="Video" 
        description="4 GB" 
      />
      <TempInfo 
        title="Telepon" 
        description="60 Menit" 
      />
      <TempInfo 
        title="SMS" 
        description="500 Pesan" 
      />
    </ div>
  );
}