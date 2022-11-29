import { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Icon, Input, VStack } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import ProductList from "../../components/Product/ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../shared/Banner";
import CategoryFilter from "./CategoryFilter";
import baseURL from "../../utils/base-url";

let { height } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          console.log("Api call error");
        });

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log(error);
          console.log("Api call error");
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setInitialState();
      };
    }, [])
  );

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

  // Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((item) => {
                return item.category._id === ctg;
              }),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <>
      {loading == false ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack my="2" space={5} w="100%" maxW="300px" alignSelf="center">
            <VStack w="100%" space={5}>
              <Input
                placeholder="Search"
                variant="filled"
                width="100%"
                borderRadius="10"
                backgroundColor="#dddddd"
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
            <SearchedProducts productsFiltered={productsFiltered} />
          ) : (
            <View style={styles.productContainer}>
              <View>
                <Banner />
              </View>
              <View>
                <CategoryFilter
                  categories={[
                    {
                      name: "All",
                      id: Math.random(),
                    },
                    ...categories,
                  ]}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />
              </View>
              {productsCtg.length > 0 ? (
                <ProductList items={productsCtg} />
              ) : (
                <View style={styles.center}>
                  <Text>No product found</Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      ) : (
        // Loading
        <View style={styles.center}>
          <ActivityIndicator size="large" color="red" />
          <Text>Fetching Products...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 50,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 1.5,
    backgroundColor: "#f2f2f2",
  },
});
export default ProductContainer;
