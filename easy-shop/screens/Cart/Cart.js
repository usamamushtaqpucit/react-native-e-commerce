import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import CartItem from "./CartItem";
import { removeProductFromCart, clearCart } from "../../store/redux/cartItem";

let { height, width } = Dimensions.get("window");

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const items = useSelector((state) => state.cartItems.values);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    var total = 0;
    items.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setTotalPrice(total);
  };
  const removeItemFromCart = (id) => {
    dispatch(
      removeProductFromCart({
        data: { id: id },
      })
    );
  };

  const clearCartHandler = () => {
    dispatch(clearCart());
  };
  useEffect(() => {
    getTotalPrice();
  }, [items]);

  return items.length > 0 ? (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart</Text>
      <SwipeListView
        data={items}
        renderItem={({ item }) => (
          <CartItem
            key={(item + item.quantity + item.product.name).toString()}
            item={item.product}
            quantity={item.quantity}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id}
        renderHiddenItem={({ item }) => (
          <View style={styles.hiddenContainer}>
            <TouchableOpacity
              style={styles.hiddenButton}
              onPress={() => removeItemFromCart(item.id)}
            >
              <Icon name="trash" color={"white"} size={30} />
            </TouchableOpacity>
          </View>
        )}
        disableRightSwipe={true}
        previewOpenDelay={3000}
        friction={1000}
        tension={40}
        leftOpenValue={75}
        stopLeftSwipe={75}
        rightOpenValue={-75}
      />

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>
            $ {parseFloat(totalPrice).toFixed(2)}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Clear" color="red" onPress={clearCartHandler} />
          </View>
          <View style={styles.button}>
            <Button
              title="Checkout"
              color="green"
              onPress={() => {
                navigation.navigate("Checkout");
              }}
            />
          </View>
          {/* <EasyButton
            primary
            medium
            onPress={() => {
                props.addItemToCart(item.id),
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: `${item.name} added to Cart`,
                    text2: "Go to your cart to complete order",
                });
                }}
                >
                <Text style={{ color:
                    "white" }}>Add</Text>
                </EasyButton> */}
        </View>
      </View>
    </View>
  ) : (
    <View style={[styles.center, { height: height / 2 }]}>
      <Text>Looks like your cart is empty</Text>
      <Text>Add products to your cart to get started</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 25,
  },
  heading: {
    alignSelf: "center",
    fontSize: 24,
    paddingBottom: 25,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  buttons: {
    flexDirection: "row",
    fontSize: 24,
    margin: 20,
  },
  button: {
    fontSize: 24,
    marginHorizontal: 4,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});
export default Cart;
