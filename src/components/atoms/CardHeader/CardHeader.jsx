import Link from "next/link";
import styles from "./CardHeader.module.css";
import Icon from "@/components/atoms/Icon/Icon";

export default function CardHeader({ 
  title, 
  linkText, 
  href = "#", 
  className = "", 
  style = {} 
}) {
  return (
    <div className={`${styles.container} ${className}`} style={style}>
      <h2>{title}</h2>
      <Link href={href} className={`${styles.link}`}>
        {linkText}
        <Icon name="arrow_forward_ios" className="text-[var(--primary-color)]" size={16} />
      </Link>
    </div>
  );
}