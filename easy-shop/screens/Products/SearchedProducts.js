import React from "react";
import { StyleSheet, Dimensions, View, Text } from "react-native";
import SearchedProduct from "../../components/Product/SearchedProduct";

let { width } = Dimensions.get("window");

const SearchedProducts = ({ productsFiltered }) => {
  return (
    <>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => (
          <SearchedProduct key={product.name} item={product} />
        ))
      ) : (
        <View style={styles.center}>
          <Text>No products match the selected criteria</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
});

export default SearchedProducts;
