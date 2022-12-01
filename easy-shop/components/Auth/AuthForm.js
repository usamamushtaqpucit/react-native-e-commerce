import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormContainer from "../../shared/Form/FormContainer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { httpLoginUser, httpRegisterUser } from "../../utils/http";
import { loginUser, logoutUser } from "../../store/redux/auth";
import Toast from "react-native-toast-message";
import Input from "../../shared/Form/Input";
import EasyButton from "../../shared/StyledComponents/EasyButton";

const { height } = Dimensions.get("window");

const AuthForm = ({ isRegister }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState({
    value: "",
    isInvalid: false,
  });
  const [name, setName] = useState({
    value: "",
    isInvalid: false,
  });
  const [phone, setPhone] = useState({
    value: "",
    isInvalid: false,
  });
  const [password, setPassword] = useState({
    value: "",
    isInvalid: false,
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isInvalid: false,
  });
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const register = async () => {
    let emailValue = email.value;
    let nameValue = name.value;
    let phoneValue = phone.value;
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;

    emailValue = emailValue.trim();
    nameValue = nameValue.trim();
    phoneValue = phoneValue.trim();

    const emailIsValid =
      emailValue.includes("@") &&
      emailValue.length > 6 &&
      emailValue.length < 50;
    const nameIsValid = nameValue.length > 1 && nameValue.length < 30;
    const phoneIsValid = phoneValue.length > 1 && phoneValue.length < 30;
    const passwordIsValid =
      passwordValue.length > 5 && passwordValue.length < 30;
    const confirmpasswordIsValid =
      passwordValue === confirmPasswordValue && passwordValue.length > 0;

    if (
      !emailIsValid ||
      !nameIsValid ||
      !phoneIsValid ||
      !passwordIsValid ||
      !confirmpasswordIsValid
    ) {
      setEmail((prev) => ({
        value: prev.value,
        isInvalid: !emailIsValid,
      }));
      setName((prev) => ({
        value: prev.value,
        isInvalid: !nameIsValid,
      }));
      setPhone((prev) => ({
        value: prev.value,
        isInvalid: !phoneIsValid,
      }));
      setPassword({
        value: "",
        isInvalid: !passwordIsValid,
      });
      setConfirmPassword({
        value: "",
        isInvalid: !confirmpasswordIsValid,
      });

      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill the form values correctly",
      });

      return;
    }

    let user = {
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      isAdmin: false,
    };

    setIsFetching(true);

    try {
      const response = await httpRegisterUser(user);
      if (response.status == 200) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Registration Succeeded",
          text2: "Please Login into your account",
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 500);
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
    }

    setIsFetching(false);
  };

  const login = async () => {
    let emailValue = email.value;
    let passwordValue = password.value;

    emailValue = emailValue.trim();

    const emailIsValid =
      emailValue.includes("@") &&
      emailValue.length > 6 &&
      emailValue.length < 50;
    const passwordIsValid =
      passwordValue.length > 5 && passwordValue.length < 30;

    if (!emailIsValid || !passwordIsValid) {
      setEmail((prev) => ({
        value: prev.value,
        isInvalid: !emailIsValid,
      }));

      setPassword({
        value: "",
        isInvalid: !passwordIsValid,
      });

      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill the form values correctly",
      });

      return;
    }

    let user = {
      email: email.value,
      password: password.value,
    };

    setIsFetching(true);

    try {
      const response = await httpLoginUser(user);
      if (response.status == 200) {
        dispatch(
          loginUser({
            data: response.data,
          })
        );
      }
    } catch (error) {
      dispatch(logoutUser());
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
      });
    }
    setIsFetching(false);
  };

  if (isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
        <Text>{(isRegister && "Registering User...") || "Loging in..."}</Text>
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
      showsVerticalScrollIndicator={false}
    >
      <FormContainer title={(isRegister && "Register") || "Login"}>
        <Input
          placeholder="Email"
          name="email"
          id="email"
          value={email.value}
          isInvalid={email.isInvalid}
          errorMessage="Email invalid"
          onChangeText={(text) => setEmail({ value: text, isInvalid: false })}
        />
        {isRegister && (
          <Input
            placeholder="Name"
            name="name"
            id="name"
            value={name.value}
            isInvalid={name.isInvalid}
            errorMessage="Password is between 6 to 30 characters"
            onChangeText={(text) => setName({ value: text, isInvalid: false })}
          />
        )}
        {isRegister && (
          <Input
            placeholder="Phone Number"
            name="phone"
            id="phone"
            keyboardType="numeric"
            value={phone.value}
            isInvalid={phone.isInvalid}
            errorMessage="Phone Invalid"
            onChangeText={(text) => setPhone({ value: text, isInvalid: false })}
          />
        )}
        <Input
          placeholder="Password"
          name="password"
          id="password"
          secureTextEntry={true}
          value={password.value}
          isInvalid={password.isInvalid}
          errorMessage="Password is between 6 to 30 characters"
          onChangeText={(text) =>
            setPassword({ value: text, isInvalid: false })
          }
        />
        {isRegister && (
          <Input
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            secureTextEntry={true}
            value={confirmPassword.value}
            isInvalid={confirmPassword.isInvalid}
            errorMessage={
              password.isInvalid
                ? "Password is between 6 to 30 characters"
                : "Password doesn't match"
            }
            onChangeText={(text) =>
              setConfirmPassword({ value: text, isInvalid: false })
            }
          />
        )}

        <View style={{ marginTop: 10 }}>
          <EasyButton large primary onPress={(isRegister && register) || login}>
            <Text style={{ color: "white" }}>
              {(isRegister && "Register") || "Login"}
            </Text>
          </EasyButton>
        </View>
        <View style={!isRegister && [styles.buttonGroup]}>
          {!isRegister && (
            <Text style={styles.middleText}>Don't have an account yet?</Text>
          )}
          <EasyButton
            large
            secondary
            onPress={() =>
              isRegister
                ? navigation.replace("Login")
                : navigation.replace("Register")
            }
          >
            <Text style={{ color: "white" }}>
              {(isRegister && "Back to login") || "Register"}
            </Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginVertical: 10,
    alignSelf: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 1.5,
    backgroundColor: "#f2f2f2",
  },
});

export default AuthForm;
