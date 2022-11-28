import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
  ActivityIndicator,
} from "react-native";
import { Center, Text } from "native-base";
import { useDispatch } from "react-redux";
import SearchedProduct from "../../../components/Product/SearchedProduct";
import { clearCart } from "../../../store/redux/cartItem";

var { width, height } = Dimensions.get("window");

const Confirm = ({ route, navigation }) => {
  const order = route.params?.order;
  const dispatch = useDispatch();

  const placeOrder = () => {
    dispatch(clearCart());
    navigation.navigate("Home");
  };

  if (route.params === undefined) {
    return (
      <Center mt="1/2">
        <Text fontSize="lg">Enter previous details first</Text>
      </Center>
    );
  }

  return (
    <>
      {loading == false ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Confirm Order
            </Text>

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
                  JSON.parse(order?.orderItems).map((item) => (
                    <View style={styles.listItem}>
                      <SearchedProduct item={item.product} />
                    </View>
                  ))}
              </>
            </View>
            <View style={{ alignItems: "center", margin: 20 }}>
              <Button title={"Place order"} onPress={placeOrder} />
            </View>
          </View>
        </ScrollView>
      ) : (
        // Loading
        <View style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
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
