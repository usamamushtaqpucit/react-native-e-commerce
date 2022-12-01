import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/FontAwesome";
import CartItem from "./CartItem";
import { removeProductFromCart, clearCart } from "../../store/redux/cartItem";
import EasyButton from "../../shared/StyledComponents/EasyButton";

let { height, width } = Dimensions.get("window");

const Cart = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
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
            <EasyButton danger medium onPress={clearCartHandler}>
              <Text style={{ color: "white" }}>Clear</Text>
            </EasyButton>
          </View>
          <View style={styles.button}>
            {currentUser.isAuthenticated ? (
              <EasyButton
                primary
                medium
                onPress={() => navigation.navigate("Checkout")}
              >
                <Text style={{ color: "white" }}>Checkout</Text>
              </EasyButton>
            ) : (
              <EasyButton
                secondary
                medium
                onPress={() => navigation.navigate("User")}
              >
                <Text style={{ color: "white" }}>Login</Text>
              </EasyButton>
            )}
          </View>
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
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 24,
    marginTop: "15%",
    marginLeft: "20%",
    color: "red",
  },
  buttons: {
    flexDirection: "row",
    margin: "5%",
  },
  button: {
    marginRight: "3%",
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
