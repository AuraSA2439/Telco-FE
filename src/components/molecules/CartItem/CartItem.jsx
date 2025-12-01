import { Text } from "../../atoms/Text/Text";
import CardContainer from "../../atoms/CardContainer/CardContainer";

export const CartItem = ({ item }) => (
  <CardContainer>
    <Text>{item.name}</Text>
    <Text>{item.price}</Text>
  </CardContainer>
);