import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";

const SingleProduct = ({ route }) => {
  const [item, setItem] = useState(route.params.item);
  const [availability, setAvailability] = useState(null);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
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
          <Button title="Add" color="green" />
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
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    paddingTop: 50,
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
