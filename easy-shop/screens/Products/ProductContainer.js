import { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import { Icon, Input, Text, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../../components/Product/ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../shared/Banner";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState();

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  // Product Methods
  const searchProduct = (text) => {
    setFocus(true);
    if (text === "") setFocus(false);
    setInputValue(text);
    setProductsFiltered(
      products.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const onBlur = () => {
    setInputValue("");
    setFocus(false);
  };

  return (
    <>
      <VStack my="2" space={5} w="100%" maxW="300px" alignSelf="center">
        <VStack w="100%" space={5}>
          <Input
            placeholder="Search"
            variant="filled"
            width="100%"
            borderRadius="10"
            py="1"
            px="2"
            value={inputValue}
            InputLeftElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={<Ionicons name="ios-search" />}
              />
            }
            InputRightElement={
              <Icon
                ml="2"
                size="4"
                color="gray.400"
                as={
                  focus == true ? (
                    <Ionicons
                      onPress={onBlur}
                      name="ios-close"
                      size={20}
                      style={{ marginRight: 2 }}
                    />
                  ) : null
                }
              />
            }
            onChangeText={searchProduct}
          />
        </VStack>
      </VStack>
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.productContainer}>
          <View>
            <Banner />
          </View>
          <ProductList items={products} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 450,
  },
});
export default ProductContainer;
