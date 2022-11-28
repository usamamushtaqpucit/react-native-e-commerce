import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://10.0.2.2:3000/api/v1/")
    : (baseURL = "http://127.0.0.1:3000/api/v1/");
}

export default baseURL;
