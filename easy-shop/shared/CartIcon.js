import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { useSelector } from "react-redux";

const CartIcon = ({ color }) => {
  const itemsLength = useSelector((state) => state.cartItems.values.length);

  return (
    <>
      {itemsLength > 0 ? (
        <Badge
          colorScheme="danger"
          rounded="full"
          mb={-4}
          mr={-4}
          zIndex={1}
          variant="solid"
          alignSelf="flex-end"
          _text={{
            fontSize: 8,
          }}
        >
          {itemsLength}
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
    color: "red",
  },
});

export default CartIcon;
