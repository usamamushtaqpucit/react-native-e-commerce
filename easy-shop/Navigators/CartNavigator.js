import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../screens/Cart/Cart";
import CheckoutNavigator from "./CheckoutNavigator";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const CartNavigator = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutNavigator}
        options={{
          title: "Checkout",
        }}
      />
    </Stack.Navigator>
  );
};

export default CartNavigator;
