import { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import {
  Select,
  Box,
  Center,
  CheckIcon,
  Text,
  ScrollView,
  View,
} from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import LottieView from "lottie-react-native";
import CreditCardForm, { Button } from "rn-credit-card";
import EasyButton from "../../../shared/StyledComponents/EasyButton";
import { useSelector } from "react-redux";

const Payment = ({ route, navigation }) => {
  const currentUserID = useSelector(
    (state) => state.auth.currentUser?.user?.userId
  );
  const [paymentInfo, setPaymentInfo] = useState({
    type: null,
    values: {},
  });
  const [cardType, setCardType] = useState();
  const methods = [
    { name: "Cash on Delivery", value: 1 },
    { name: "Card Payment", value: 2 },
  ];

  const formMethods = useForm({
    // to trigger the validation on the blur event
    mode: "onBlur",
    defaultValues: {
      holderName: "",
      cardNumber: "",
      expiration: "",
      cvv: "",
    },
  });

  const { handleSubmit, formState } = formMethods;

  const confirmOrder = () => {
    navigation.navigate("Confirm", {
      order: route.params?.order,
      payment: { paymentInfo: paymentInfo, cardType: cardType },
    });
  };

  const onSubmit = (model) => {
    navigation.navigate("Confirm", {
      order: route.params?.order,
      payment: {
        paymentInfo: setPaymentInfo({ type: "2", values: model }),
        cardType: cardType,
      },
    });
  };

  if (!currentUserID) {
    navigation.replace("MyCart");
  }

  if (route.params === undefined) {
    return (
      <Center mt="1/2">
        <Text fontSize="lg">Enter order details first</Text>
      </Center>
    );
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text fontSize="sm" ml="18%" mt="10">
        Choose your payment method
      </Text>
      <View>
        <Center>
          <Select
            style={styles.dropdown}
            selectedValue={paymentInfo.type}
            minWidth="85%"
            accessibilityLabel="Select payment method"
            placeholder="Select payment method"
            placeholderTextColor="coolGray.600"
            _selectedItem={{
              bg: "coolGray.200",
              endIcon: <CheckIcon size={3} />,
            }}
            mt={1}
            onValueChange={(e) => setPaymentInfo({ type: e, values: {} })}
          >
            {methods.map((m) => (
              <Select.Item key={m.name} label={m.name} value={m.value} />
            ))}
          </Select>
        </Center>
      </View>

      {paymentInfo.type && paymentInfo.type === 2 && (
        <FormProvider {...formMethods}>
          <KeyboardAvoidingView
            style={styles.avoider}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <CreditCardForm
              LottieView={LottieView}
              horizontalStart
              overrides={{
                labelText: {
                  marginTop: 16,
                },
                inputLabel: {
                  color: "black",
                },
              }}
            />
          </KeyboardAvoidingView>
        </FormProvider>
      )}
      {((paymentInfo.type && paymentInfo.type === 1) ||
        (paymentInfo.type && formState.isValid)) && (
        <Center mb="10">
          <EasyButton
            primary
            medium
            onPress={formState.isValid ? handleSubmit(onSubmit) : confirmOrder}
          >
            <Text style={{ color: "white" }}>
              {(formState.isValid && "Confirm") || "Next"}
            </Text>
          </EasyButton>
        </Center>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "white",
    fontSize: 16,
  },
  button: {
    alignItems: "center",
    marginTop: 20,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
});

export default Payment;
