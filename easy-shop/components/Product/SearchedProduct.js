import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { HStack, VStack, Text, Box, Spacer, Avatar } from "native-base";

const SearchedProduct = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Product Detail", { item: item })}
    >
      <Box
        borderBottomWidth="1"
        _dark={{
          borderColor: "coolGray.200",
        }}
        borderColor="coolGray.200"
        pl={["2", "4"]}
        pr={["0", "5"]}
        py="4"
        maxW="220"
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
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {item.name}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {item.description.length > 50
                ? item.description.substring(0, 50 - 3) + "..."
                : item.description}
            </Text>
          </VStack>
          <Spacer />
        </HStack>
      </Box>
    </TouchableOpacity>
  );
};

export default SearchedProduct;
