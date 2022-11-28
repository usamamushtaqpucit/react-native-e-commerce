import { useEffect, useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Select, Box, CheckIcon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FormContainer from "../../../shared/Form/FormContainer";
import Input from "../../../shared/Form/Input";

const countries = require("../../../assets/data/countries.json");

const Checkout = () => {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems.values);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: new Date().toString(),
      orderItems: JSON.stringify(orderItems),
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      zip,
    };

    navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />
        <Box style={styles.countryDropdownContainer}>
          <Select
            style={styles.countryDropdown}
            selectedValue={country}
            minWidth="200"
            _selectedItem={{
              bg: "coolGray.200",
              endIcon: <CheckIcon size={4} />,
            }}
            accessibilityLabel="Select your country"
            placeholder="Select your country"
            placeholderTextColor="coolGray.600"
            mt={1}
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => (
              <Select.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Select>
        </Box>
        <View style={styles.button}>
          <Button title="Next" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  countryDropdownContainer: {
    width: "80%",
  },
  countryDropdown: {
    height: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    borderWidth: 2,
    borderColor: "orange",
    fontSize: 16,
  },
  button: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Checkout;
