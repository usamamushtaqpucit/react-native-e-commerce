import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon, Input, VStack } from "native-base";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../utils/base-url";
import axios from "axios";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "600" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });

      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Orders")}
        >
          <FontAwesome name="shopping-bag" size={18} color="white" />
          <Text style={styles.buttonText}>Orders</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("ProductForm")}
        >
          <FontAwesome name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Products</Text>
        </EasyButton>
        <EasyButton
          secondary
          medium
          onPress={() => props.navigation.navigate("Categories")}
        >
          <FontAwesome name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Categories</Text>
        </EasyButton>
      </View>
      <View>
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
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                />
              }
              onChangeText={(text) => searchProduct(text)}
            />
          </VStack>
        </VStack>
      </View>

      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct.bind(this, item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Products;
