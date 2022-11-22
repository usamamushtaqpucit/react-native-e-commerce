import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button,
} from "react-native";

let { width } = Dimensions.get("window");
const ProductItem = ({ name, price, image, countInStock }) => {
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
      <Text style={styles.price}>{price}</Text>
      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button title="Add" color="green" />
        </View>
      ) : (
        <Text style={{ marginTop: 60 }}>Out of stock</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 2,
    backgroundColor: "#F5F5F5",
  },
  image: {
    width: width / 2 - 30,
    height: width / 2 - 50,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
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
    marginTop: 10,
  },
});

export default ProductItem;
