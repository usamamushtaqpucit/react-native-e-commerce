import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductContainer from "../screens/Products/ProductContainer";
import SingleProduct from "../screens/Products/SingleProduct";

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Product Detail"
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
