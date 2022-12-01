import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/User/Login";
import Register from "../screens/User/Register";
import UserProfile from "../screens/User/UserProfile";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

const UserNavigator = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  return (
    <Stack.Navigator>
      {!currentUser.isAuthenticated && (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      )}
      {!currentUser.isAuthenticated && (
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
      )}
      {currentUser.isAuthenticated && (
        <Stack.Screen
          name="User Profile"
          component={UserProfile}
          options={{
            headerShown: false,
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export default UserNavigator;
