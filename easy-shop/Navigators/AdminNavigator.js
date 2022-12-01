import { createStackNavigator } from "@react-navigation/stack";
import Orders from "../screens/Admin/Order";
import Products from "../screens/Admin/Products";
import ProductForm from "../screens/Admin/ProductForm";
import Categories from "../screens/Admin/Categories";

const Stack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{
          headerShown: false,
          title: "Products",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen
        name="ProductForm"
        component={ProductForm}
        options={{
          title: null,
        }}
      />
    </Stack.Navigator>
  );
};
export default AdminNavigator;
