import React from "react";
import { StyleSheet, Dimensions, View, TouchableOpacity } from "react-native";
import {
  HStack,
  VStack,
  FlatList,
  Text,
  Box,
  Spacer,
  Avatar,
} from "native-base";
let { width } = Dimensions.get("window");

const SearchedProduct = ({ productsFiltered }) => {
  return (
    <>
      {productsFiltered.length > 0 ? (
        <FlatList
          data={productsFiltered}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => console.log("I'm Pressed")}>
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: "coolGray.200",
                }}
                borderColor="coolGray.200"
                pl={["2", "4"]}
                pr={["0", "5"]}
                py="4"
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
                      {item.description}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          mb="40%"
          width={width}
        />
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

export default SearchedProduct;
