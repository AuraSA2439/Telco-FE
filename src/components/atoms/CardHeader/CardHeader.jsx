import Link from "next/link";
import styles from "./CardHeader.module.css";
import Icon from "@/components/atoms/Icon/Icon";

export default function CardHeader({ 
  title, 
  linkText, 
  href = "#", 
  className = "",
  titleClass = "",
  linkClass = "",
  style = {} 
}) {
  return (
    <div className="border-solid border-b-2 border-[var(--neutral-color)]">
      <div className={`${styles.container} ${className}`} style={style}>
        <h2 className={`${styles.title} ${titleClass}`}>{title}</h2>

        <Link href={href} className={`${styles.link} ${linkClass}`}>
          {linkText}
          <Icon name="arrow_forward_ios" className="inherit-color" size={14} />
        </Link>
      </div>
    </div>
  );
}