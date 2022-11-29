import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import Header from "./shared/Header";
import Main from "./Navigators/Main";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Toast from "react-native-toast-message";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <StatusBar style="auto" />
          <Header />
          <Main />
          <Toast />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
