import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { LogBox, View } from "react-native";
import ProductContainer from "./screens/Products/ProductContainer";
import Header from "./shared/Header";
LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NativeBaseProvider>
      <View>
        <StatusBar style="auto" />
        <Header />
        <ProductContainer />
      </View>
    </NativeBaseProvider>
  );
}
