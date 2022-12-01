import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Center, Text } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import SearchedProduct from "../../../components/Product/SearchedProduct";
import { clearCart } from "../../../store/redux/cartItem";
import EasyButton from "../../../shared/StyledComponents/EasyButton";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../utils/base-url";

var { width, height } = Dimensions.get("window");

const Confirm = ({ route, navigation }) => {
  const currentUserID = useSelector(
    (state) => state.auth.currentUser?.user?.userId
  );
  const order = route.params?.order;
  const dispatch = useDispatch();

  const placeOrder = () => {
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Placed",
          });
          dispatch(clearCart());
          navigation.navigate("MyCart");
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  if (!currentUserID) {
    navigation.replace("MyCart");
  }

  if (route.params === undefined) {
    return (
      <Center mt="1/2">
        <Text fontSize="lg">Enter previous details first</Text>
      </Center>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>

        <View style={styles.innerContainer}>
          <Text style={styles.title}>Shipping to:</Text>
          <View style={{ padding: 8 }}>
            <Text>Address: {order.shippingAddress1}</Text>
            <Text>Address2: {order.shippingAddress2}</Text>
            <Text>City: {order.city}</Text>
            <Text>Zip Code: {order.zip}</Text>
            <Text>Country: {order.country}</Text>
          </View>
          <Text style={styles.title}>Items:</Text>
          <>
            {order &&
              order.orderItems.map((item) => (
                <View key={item.id} style={styles.listItem}>
                  <SearchedProduct item={item.product} />
                </View>
              ))}
          </>
        </View>
        <EasyButton primary medium onPress={placeOrder}>
          <Text style={{ color: "white" }}>Place order</Text>
        </EasyButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: "orange",
    marginTop: 15,
    paddingLeft: width / 18,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "flex-start",
    width: width / 1.2,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Confirm;
