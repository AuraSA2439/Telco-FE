import { Text } from "../atoms/Text";

export const CartItem = ({ item }) => (
  <div className="flex justify-between py-2 border-b">
    <Text>{item.name}</Text>
    <Text>{item.price}</Text>
  </div>
);