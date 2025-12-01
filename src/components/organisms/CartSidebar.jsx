import { Text } from "../atoms/Text";
import { CartItem } from "../molecules/CartItem";

export const CartSidebar = ({ cart }) => (
  <div className="p-4 border rounded-2xl mt-6">
    <Text className="font-bold text-xl mb-3">Cart</Text>
    {cart.length === 0 ? <Text>No items yet.</Text> : cart.map((item, i) => <CartItem key={i} item={item} />)}
  </div>
);