import Toast from "react-native-toast-message";

const EasyToast = ({ topOffset, type, text1, text2 }) => {
  return Toast.show({
    topOffset: topOffset,
    type: type,
    text1: text1,
    text2: text2,
  });
};

export default EasyToast;
