import Link from "next/link";
import styles from "./ProductCard.module.css";
import { Image } from "../../atoms/Image/Image";
import CardContainer from "../../atoms/CardContainer/CardContainer";

export default function ProductCard({ product, onAdd }) {
  return (
    <>
    <Link href={`/product/${product.id}`} className={styles.link}>
      <CardContainer size="medium" className={styles.wrapper}
      onClick={() => onAdd(product)}>
        <Image src={product.image} alt={product.price} />
        {/* <h2 className="mt-3">{product.name}</h2> */}
        <p className="text-neutral-600">{product.price}</p>
        {/* <Button onClick={() => onAdd(product)} className="mt-3">Add to Cart</Button> */}
      </CardContainer>
    </Link>
    </>
  );
}