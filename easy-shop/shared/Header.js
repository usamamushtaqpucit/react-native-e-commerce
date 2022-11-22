import { SafeAreaView, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={require("../assets/Logo.png")}
        resizeMode="contain"
        style={styles.image}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    paddingTop: 30,
    backgroundColor: "white",
  },
  image: {
    height: 50,
  },
});
export default Header;
