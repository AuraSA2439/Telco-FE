import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";

export const ProductCard = ({ product, onAdd }) => (
  <div className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition">
    <Image src={product.image} alt={product.name} />
    <Text className="font-semibold text-lg mt-3">{product.name}</Text>
    <Text className="text-neutral-600">{product.price}</Text>
    <Button onClick={() => onAdd(product)} className="mt-3">Add to Cart</Button>
  </div>
);