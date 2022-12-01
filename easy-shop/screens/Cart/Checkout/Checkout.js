import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Select, CheckIcon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import FormContainer from "../../../shared/Form/FormContainer";
import Input from "../../../shared/Form/Input";
import EasyButton from "../../../shared/StyledComponents/EasyButton";
import Error from "../../../shared/Error";

const countries = require("../../../assets/data/countries.json");

const Checkout = () => {
  const currentUserID = useSelector(
    (state) => state.auth.currentUser?.user?.userId
  );
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cartItems.values);
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState({
    value: "",
    isInvalid: false,
  });
  const [address2, setAddress2] = useState({
    value: "",
    isInvalid: false,
  });
  const [city, setCity] = useState({
    value: "",
    isInvalid: false,
  });
  const [zip, setZip] = useState({
    value: "",
    isInvalid: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    isInvalid: false,
  });
  const [country, setCountry] = useState("");
  const [countryIsVaild, setCountryIsVaild] = useState(false);

  useEffect(() => {
    setOrderItems(cartItems);

    return () => {
      setOrderItems();
    };
  }, []);

  if (!currentUserID) {
    navigation.replace("MyCart");
  }

  const checkOut = () => {
    let addressValue = address.value;
    let address2Value = address2.value;
    let cityValue = city.value;
    let zipValue = zip.value;
    let phoneValue = phone.value;

    addressValue = addressValue.trim();
    address2Value = address2Value.trim();
    cityValue = cityValue.trim();
    zipValue = zipValue.trim();
    phoneValue = phoneValue.trim();

    const addressIsValid = addressValue.length > 5 && addressValue.length < 50;
    const address2IsValid =
      address2Value.length > 5 && address2Value.length < 50;
    const phoneIsValid = phoneValue.length > 5 && phoneValue.length < 30;
    const cityValueIsValid = cityValue.length > 5 && cityValue.length < 30;
    const zipValueIsValid = zipValue.length > 1 && zipValue.length < 30;
    const countryValueIsValid = country.length > 0;

    if (
      !addressIsValid ||
      !address2IsValid ||
      !phoneIsValid ||
      !cityValueIsValid ||
      !zipValueIsValid ||
      !countryValueIsValid
    ) {
      setAddress((prev) => ({
        value: prev.value,
        isInvalid: !addressIsValid,
      }));
      setAddress2((prev) => ({
        value: prev.value,
        isInvalid: !address2IsValid,
      }));
      setPhone((prev) => ({
        value: prev.value,
        isInvalid: !phoneIsValid,
      }));
      setCity((prev) => ({
        value: prev.value,
        isInvalid: !cityValueIsValid,
      }));
      setZip((prev) => ({
        value: prev.value,
        isInvalid: !zipValueIsValid,
      }));
      setCountryIsVaild(!countryValueIsValid);

      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill the form values correctly",
      });

      return;
    }

    let order = {
      city: cityValue,
      country,
      dateOrdered: new Date().toString(),
      orderItems,
      phone: phoneValue,
      shippingAddress1: addressValue,
      shippingAddress2: address2Value,
      status: "3",
      zip: zipValue,
      user: currentUserID,
    };

    navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder={"Phone"}
          name={"phone"}
          keyboardType={"numeric"}
          value={phone.value}
          isInvalid={phone.isInvalid}
          errorMessage="Phone invalid"
          onChangeText={(text) => setPhone({ value: text, isInvalid: false })}
        />
        <Input
          placeholder={"Shipping Address 1"}
          name={"ShippingAddress1"}
          value={address.value}
          isInvalid={address.isInvalid}
          errorMessage="Address invalid"
          onChangeText={(text) => setAddress({ value: text, isInvalid: false })}
        />
        <Input
          placeholder={"Shipping Address 2"}
          name={"ShippingAddress2"}
          value={address2.value}
          isInvalid={address2.isInvalid}
          errorMessage="Address2 invalid"
          onChangeText={(text) =>
            setAddress2({ value: text, isInvalid: false })
          }
        />
        <Input
          placeholder={"City"}
          name={"city"}
          value={city.value}
          isInvalid={city.isInvalid}
          errorMessage="City invalid"
          onChangeText={(text) => setCity({ value: text, isInvalid: false })}
        />
        <Input
          placeholder={"Zip Code"}
          name={"zip"}
          value={zip.value}
          isInvalid={zip.isInvalid}
          errorMessage="Zip invalid"
          onChangeText={(text) => setZip({ value: text, isInvalid: false })}
        />
        <View style={styles.countryDropdownContainer}>
          <Select
            style={[
              styles.countryDropdown,
              countryIsVaild && { borderColor: "red" },
            ]}
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
            onValueChange={(e) => [setCountry(e), setCountryIsVaild(false)]}
          >
            {countries.map((c) => (
              <Select.Item key={c.code} label={c.name} value={c.name} />
            ))}
          </Select>
          {countryIsVaild && (
            <View style={{ marginTop: 2 }}>
              <Error message="Country Invalid" />
            </View>
          )}
        </View>
        <View style={styles.button}>
          <EasyButton primary medium onPress={checkOut}>
            <Text style={{ color: "white" }}>Next</Text>
          </EasyButton>
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
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5cb85c",
    fontSize: 16,
  },
  button: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default Checkout;
