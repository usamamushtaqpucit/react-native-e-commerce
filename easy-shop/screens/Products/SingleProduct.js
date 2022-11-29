import React, { useState } from "react";
import { Image, View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import { addToCart } from "../../store/redux/cartItem";
import Toast from "react-native-toast-message";

const SingleProduct = ({ route }) => {
  const [item, setItem] = useState(route.params.item);
  const [availability, setAvailability] = useState("");
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
      text1: `${item.name} added to Cart`,
      text2: "Go to your cart to complete order",
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.innerContainer}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.contentHeader}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>Availability: 1233</Text>
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.price}>$ {item.price}</Text>
        </View>
        <View style={styles.button}>
          <EasyButton primary medium onPress={addProductHandler}>
            <Text style={{ color: "white" }}>Add</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 50,
    maxWidth: "90%",
    alignSelf: "center",
  },
  innerContainer: {
    marginBottom: 5,
    padding: 5,
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 30,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
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
  button: {
    fontSize: 24,
    margin: 20,
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});

export default SingleProduct;
