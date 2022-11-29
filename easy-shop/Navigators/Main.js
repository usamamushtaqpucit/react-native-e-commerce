import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import CartIcon from "../shared/CartIcon";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      // tabBarOptions={{
      //   keyboardHidesTabBar: true,
      //   showLabel: false,
      //   activeTintColor: "#e91e63",
      // }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View>
              <CartIcon color={color} />
              <Icon name="shopping-cart" color={color} size={30} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="cog" color={color} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
