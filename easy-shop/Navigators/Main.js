import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { useSelector } from "react-redux";
import Icon from "@expo/vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import CartIcon from "../shared/CartIcon";
import CartNavigator from "./CartNavigator";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

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

      {currentUser?.user?.isAdmin == true ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}

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
