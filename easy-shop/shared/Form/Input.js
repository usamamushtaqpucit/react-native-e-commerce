import { TextInput, StyleSheet, View } from "react-native";
import Error from "../Error";

const Input = ({
  placeholder,
  name,
  id,
  value,
  autoCorrect,
  onChangeText,
  onFocus,
  secureTextEntry,
  keyboardType,
  isInvalid,
  errorMessage,
}) => {
  return (
    <>
      <TextInput
        style={[styles.input, isInvalid ? { borderColor: "red" } : null]}
        placeholder={placeholder}
        name={name}
        id={id}
        value={value}
        autoCorrect={autoCorrect}
        onChangeText={onChangeText}
        onFocus={onFocus}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      ></TextInput>
      <View style={styles.error}>
        {isInvalid ? <Error message={errorMessage} /> : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "white",
    margin: 5,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5cb85c",
  },
  error: {
    alignSelf: "flex-start",
    marginLeft: "10%",
  },
});

export default Input;
