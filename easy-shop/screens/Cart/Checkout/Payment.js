import { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Select, Box, Center, CheckIcon, Text } from "native-base";

const Payment = ({ route, navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState();
  const [cardType, setCardType] = useState();
  const methods = [
    { name: "Cash on Delivery", value: 1 },
    { name: "Card Payment", value: 2 },
  ];
  const cardTypes = [
    { name: "Visa", value: 1 },
    { name: "MasterCard", value: 2 },
  ];

  const confirmOrder = () => {
    navigation.navigate("Confirm", {
      order: route.params?.order,
      payment: { paymentMethod: paymentMethod, cardType: cardType },
    });
  };
  if (route.params === undefined) {
    return (
      <Center mt="1/2">
        <Text fontSize="lg">Enter order details first</Text>
      </Center>
    );
  }
  return (
    <Box>
      <Box mt={10}>
        <Center>
          <Text fontSize="sm">Choose your payment method</Text>
          <Select
            style={styles.dropdown}
            selectedValue={paymentMethod}
            minWidth="300"
            accessibilityLabel="Select payment method"
            placeholder="Select payment method"
            placeholderTextColor="coolGray.600"
            _selectedItem={{
              bg: "coolGray.200",
              endIcon: <CheckIcon size={3} />,
            }}
            mt={1}
            onValueChange={(e) => setPaymentMethod(e)}
          >
            {methods.map((m) => (
              <Select.Item key={m.name} label={m.name} value={m.value} />
            ))}
          </Select>
        </Center>
      </Box>

      {paymentMethod && paymentMethod === 2 && (
        <Box mt={5}>
          <Center>
            <Text fontSize="sm">Choose your card type</Text>
            <Select
              style={styles.dropdown}
              minWidth="300"
              selectedValue={cardType}
              accessibilityLabel="Choose card type"
              placeholder="Choose card type"
              _selectedItem={{
                bg: "coolGray.200",
                endIcon: <CheckIcon size={3} />,
              }}
              onValueChange={(e) => setCardType(e)}
              mt="1"
            >
              {cardTypes.map((ct) => (
                <Select.Item key={ct.name} label={ct.name} value={ct.value} />
              ))}
            </Select>
          </Center>
        </Box>
      )}
      {((paymentMethod && paymentMethod === 1) ||
        (paymentMethod && paymentMethod === 2 && cardType)) && (
        <View style={styles.button}>
          <Button title="Next" onPress={() => confirmOrder()} />
        </View>
      )}
    </Box>
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
});

export default Payment;
