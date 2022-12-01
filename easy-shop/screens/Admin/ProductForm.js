import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Select, CheckIcon } from "native-base";
import Icon from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import baseURL from "../../utils/base-url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Error from "../../shared/Error";
import EasyButton from "../../shared/StyledComponents/EasyButton";
import FormContainer from "../../shared/Form/FormContainer";
import Input from "../../shared/Form/Input";
import { uploadImage } from "../../utils/helpers";

var { height } = Dimensions.get("window");

const ProductForm = ({ route, navigation }) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState({
    value: "",
    isInvalid: false,
  });
  const [name, setName] = useState({
    value: "",
    isInvalid: false,
  });
  const [price, setPrice] = useState({
    value: "",
    isInvalid: false,
  });
  const [description, setDescription] = useState({
    value: "",
    isInvalid: false,
  });
  const [category, setCategory] = useState({
    value: "",
    isInvalid: false,
  });
  const [countInStock, setCountInStock] = useState({
    value: "",
    isInvalid: false,
  });
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!route.params) {
      setItem(null);
    } else {
      setItem(route.params.item);
      setBrand({ value: route.params.item.brand, isInvalid: false });
      setName({ value: route.params.item.name, isInvalid: false });
      setPrice({ value: route.params.item.price.toString(), isInvalid: false });
      setDescription({
        value: route.params.item.description,
        isInvalid: false,
      });
      setMainImage(route.params.item.image);
      setImage(route.params.item.image);
      setCategory({ value: route.params.item.category._id, isInvalid: false });
      setPickerValue(route.params.item.category._id);
      setCountInStock({
        value: route.params.item.countInStock.toString(),
        isInvalid: false,
      });
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => {
        console.log(error);
        alert("Error to load categories");
      });

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result) {
      setIsImageChanged(true);
      setImage(result.assets[0].uri);
      setMainImage(result.assets[0].uri);
    }
  };

  const addProduct = async () => {
    const nameIsValid = name.value !== "";
    const brandIsValid = brand.value !== "";
    const priceIsValid = price.value !== "";
    const descriptionIsValid = description.value !== "";
    const categoryIsValid = category.value !== "";
    const countInStockIsValid =
      +countInStock.value > -1 &&
      +countInStock.value <= 255 &&
      countInStock.value !== "";
    if (
      !nameIsValid ||
      !brandIsValid ||
      !priceIsValid ||
      !descriptionIsValid ||
      !categoryIsValid ||
      !countInStockIsValid
    ) {
      setName((prev) => ({
        value: prev.value,
        isInvalid: !nameIsValid,
      }));
      setBrand((prev) => ({
        value: prev.value,
        isInvalid: !brandIsValid,
      }));
      setPrice((prev) => ({
        value: prev.value,
        isInvalid: !priceIsValid,
      }));
      setDescription((prev) => ({
        value: prev.value,
        isInvalid: !descriptionIsValid,
      }));
      setCategory((prev) => ({
        value: prev.value,
        isInvalid: !categoryIsValid,
      }));
      setCountInStock((prev) => ({
        value: prev.value,
        isInvalid: !countInStockIsValid,
      }));
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill the form values correctly",
      });
      return;
    }

    let imageURI = mainImage;
    setIsUploading(true);
    if (isImageChanged) {
      imageURI = await uploadImage(image);
      if (imageURI === false) {
        setIsUploading(false);
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Failed to upload image",
        });
        return;
      }
    }

    const formData = {
      image: imageURI,
      name: name.value,
      brand: brand.value,
      price: price.value,
      description: description.value,
      category: category.value,
      countInStock: countInStock.value,
      richDescription: richDescription,
      rating: rating,
      numReviews: numReviews,
      isFeatured: isFeatured,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item !== null) {
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product successfuly updated",
              text2: "",
            });

            navigation.navigate("Products");
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "",
            });
            navigation.navigate("Products");
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
    setIsUploading(false);
  };
  if (isUploading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color="red" />
        <Text>Uploading...</Text>
      </View>
    );
  }

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
      </View>
      <Input
        placeholder="Brand"
        name="brand"
        id="brand"
        value={brand.value}
        isInvalid={brand.isInvalid}
        errorMessage="Brand Can't blank"
        onChangeText={(text) => setBrand({ value: text, isInvalid: false })}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <Input
        placeholder="Name"
        name="name"
        id="name"
        value={name.value}
        isInvalid={name.isInvalid}
        errorMessage="Name Can't blank"
        onChangeText={(text) => setName({ value: text, isInvalid: false })}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Price</Text>
      </View>
      <Input
        placeholder="Price"
        name="price"
        id="price"
        value={price.value}
        keyboardType={"numeric"}
        isInvalid={price.isInvalid}
        errorMessage="Price Can't blank"
        onChangeText={(text) => setPrice({ value: text, isInvalid: false })}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
      </View>
      <Input
        placeholder="Stock"
        name="stock"
        id="stock"
        value={countInStock.value}
        keyboardType={"numeric"}
        isInvalid={countInStock.isInvalid}
        errorMessage={
          +countInStock.value > -1 && countInStock.value !== ""
            ? "Max 255 items"
            : +countInStock.value < 0 && countInStock.value !== ""
            ? "Min 0 item"
            : "CountInStock Can't blank and must be an Integer Value"
        }
        onChangeText={(text) =>
          setCountInStock({ value: text, isInvalid: false })
        }
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Description</Text>
      </View>
      <Input
        placeholder="Description"
        name="description"
        id="description"
        value={description.value}
        isInvalid={description.isInvalid}
        errorMessage="Description Can't blank"
        onChangeText={(text) =>
          setDescription({ value: text, isInvalid: false })
        }
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Category</Text>
      </View>
      <View style={styles.categoryDropdownContainer}>
        <Select
          style={[
            styles.categoryDropdown,
            category.isInvalid && { borderColor: "red" },
          ]}
          selectedValue={pickerValue}
          minWidth="200"
          _selectedItem={{
            bg: "coolGray.200",
            endIcon: <CheckIcon size={4} />,
          }}
          placeholder="Select your Category"
          accessibilityLabel="Select your Category"
          placeholderTextColor="coolGray.600"
          onValueChange={(e) => [
            setPickerValue(e),
            setCategory({ value: e, isInvalid: false }),
          ]}
        >
          {categories.map((c) => (
            <Select.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Select>
        {category.isInvalid && (
          <View style={{ marginTop: 2 }}>
            <Error message="Category Invalid" />
          </View>
        )}
      </View>

      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton large primary onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Confirm</Text>
        </EasyButton>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  categoryDropdownContainer: {
    width: "80%",
  },
  categoryDropdown: {
    width: undefined,
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#5cb85c",
    fontSize: 16,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductForm;
