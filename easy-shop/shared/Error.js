import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Error = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  text: {
    color: "red",
    fontSize: 12,
  },
});

export default Error;
