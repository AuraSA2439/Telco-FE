import { Image } from "../../atoms/Image/Image";
import CardContainer from "../../atoms/CardContainer/CardContainer";

export const ProductCard = ({ product, onAdd }) => (
  <CardContainer size="medium" onClick={() => onAdd(product)}>
    <Image src={product.image} alt={product.name} />
    <h2 className="mt-3">{product.name}</h2>
    <p className="text-neutral-600">{product.price}</p>
    {/* <Button onClick={() => onAdd(product)} className="mt-3">Add to Cart</Button> */}
  </CardContainer>
);