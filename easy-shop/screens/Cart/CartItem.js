import { Pressable, View, Text, TouchableOpacity } from "react-native";
import { Box, HStack, VStack, Spacer, Avatar } from "native-base";
import Icon from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  removeOneProductFromCart,
  addToCart,
} from "../../store/redux/cartItem";

const CartItem = ({ item, quantity, id, key }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const addProductHandler = () => {
    dispatch(
      addToCart({
        data: { id: item.id, quantity: 1, product: item },
      })
    );
  };

  const removeOneItemtFromCart = (id) => {
    dispatch(
      removeOneProductFromCart({
        data: { id: id },
      })
    );
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product Detail", { item: item })}
    >
      <View key={key} style={{ backgroundColor: "white" }}>
        <Box
          borderBottomWidth="1"
          borderColor="muted.800"
          pl={["2", "4"]}
          pr={["10", "5"]}
          py="2"
        >
          <HStack space={[2, 3]} justifyContent="space-between">
            <Avatar
              size="48px"
              source={{
                uri: item.image
                  ? item.image
                  : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
              }}
            />
            <VStack>
              <Text color="coolGray.800" bold>
                {item.name}
              </Text>
              <HStack>
                <Pressable
                  style={{ paddingTop: 5, paddingHorizontal: 5 }}
                  onPress={() => addProductHandler(id)}
                >
                  <Icon name="plus" color={"red"} size={18} />
                </Pressable>

                <View>
                  <Text style={{ fontSize: 20 }}> {quantity} </Text>
                </View>
                <Pressable
                  style={{ paddingTop: 5, paddingHorizontal: 5 }}
                  onPress={() => removeOneItemtFromCart(id)}
                >
                  <Icon name="minus" color={"green"} size={18} />
                </Pressable>
              </HStack>
            </VStack>
            <Spacer />
            <Text
              style={{
                fontSize: 20,
                color: "coolGray.800",
                alignSelf: "center",
              }}
            >
              $ {item.price}
            </Text>
          </HStack>
        </Box>
      </View>
    </TouchableOpacity>
  );
};

export default CartItem;
