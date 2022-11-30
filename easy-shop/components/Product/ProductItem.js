import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
  Platform,
} from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import { addToCart } from "../../store/redux/cartItem";

let { width } = Dimensions.get("window");

const ProductItem = ({ item }) => {
  const { name, price, image, countInStock } = item;
  const dispatch = useDispatch();
  const addProductHandler = () => {
    dispatch(
      addToCart({
        data: { id: item.id, quantity: 1, product: item },
      })
    );

    Toast.show({
      topOffset: 60,
      type: "success",
      text1: `${name} added to Cart`,
      text2: "Go to your cart to complete order",
    });
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>$ {price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <EasyButton
            primary
            medium
            onPress={() => {
              props.addItemToCart(props.id),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to Cart`,
                  text2: "Go to your cart to complete order",
                });
            }}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 30,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: Platform.select({
      ios: "#dddddd",
      android: "#F5F5F5",
    }),
  },
  image: {
    width: width / 3 - 30,
    height: width / 3 - 50,
    backgroundColor: "transparent",
    position: "absolute",
    marginTop: 10,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 110,
    backgroundColor: "transparent",
    width: width / 2 - 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginVertical: 5,
  },
});

export default ProductItem;
