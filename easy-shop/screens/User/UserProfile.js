import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  Button,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpGetUserProfile } from "../../utils/http";
import { logoutUser } from "../../store/redux/auth";
import Toast from "react-native-toast-message";

const { height } = Dimensions.get("window");

const UserProfile = ({ navigation }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [isFetching, setIsFetching] = useState(false);

  const getUserData = async () => {
    if (
      currentUser.isAuthenticated === false ||
      currentUser.isAuthenticated === null
    ) {
      navigation.navigate("Login");
    } else
      try {
        setIsFetching(true);
        const token = await AsyncStorage.getItem("jwt");
        const response = await httpGetUserProfile(
          currentUser.user.userId,
          token
        );
        if (response.status == 200) {
          setUser(response.data);
        } else {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        }
      } catch (error) {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: `Error: ${error}`,
        });
      }
    setIsFetching(false);
  };

  useFocusEffect(
    useCallback(() => {
      getUserData();
      return () => {
        setUser();
      };
    }, [currentUser.isAuthenticated])
  );

  if (isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="red" />
        <Text>Fetching data...</Text>
      </View>
    );
  }
  return (
    <View style={styles.View}>
      <ScrollView contentContainerStyle={styles.subContainer}>
        <Text style={{ fontSize: 30 }}>{user ? user.name : ""}</Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>Email: {user ? user.email : ""}</Text>
          <Text style={{ margin: 10 }}>Phone: {user ? user.phone : ""}</Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => {
              dispatch(logoutUser());
              navigation.navigate("Login");
            }}
          />
        </View>
        {/* <View style={styles.order}>
          <Text style={{ fontSize: 20 }}>My Orders</Text>
          <View>
            {orders ? (
              orders.map((x) => {
                return <OrderCard key={x.id} {...x} />;
              })
            ) : (
              <View style={styles.order}>
                <Text>You have no orders</Text>
              </View>
            )}
          </View>
        </View> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    height: height / 1.5,
    backgroundColor: "#f2f2f2",
  },
});

export default UserProfile;
