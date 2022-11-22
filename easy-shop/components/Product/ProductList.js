import { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import ProductItem from "./ProductItem";

const ProductList = ({ items }) => {
  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <ProductItem {...item} />
      </TouchableOpacity>
    );
  };

  if (items.length < 1) {
    return (
      <View>
        <Text>No Products Found</Text>
      </View>
    );
  }
  return (
    <View>
      <FlatList
        numColumns={2}
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductList;
