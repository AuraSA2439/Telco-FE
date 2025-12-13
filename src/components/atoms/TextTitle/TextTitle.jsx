import Icon from "@/components/atoms/Icon/Icon";

export default function TextTitle({ 
  title, 
  className = "",
  titleClass = "",
  style = {} 
}) {
  return (
    <div className="border-b-2 border-[var(--neutral-color)]">
      <div className={`${className}`} style={style}>
        <h3 className={titleClass}>{title}</h3>
      </div>
    </div>
  );
}