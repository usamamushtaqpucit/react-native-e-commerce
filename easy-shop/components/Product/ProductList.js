import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProductItem from "./ProductItem";

const { width } = Dimensions.get("window");

const ProductList = ({ items }) => {
  const navigation = useNavigation();

  if (items.length < 1) {
    return (
      <View>
        <Text>No Products Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.listContainer}>
      {items.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate("Product Detail", { item: item })}
        >
          <ProductItem item={item} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginLeft: 12,
  },
});

export default ProductList;
