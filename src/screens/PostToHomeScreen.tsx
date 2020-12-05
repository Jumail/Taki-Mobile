import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Button, TextInput, Modal, Portal, Provider } from "react-native-paper";
import { MainStackParamList } from "../types/MainTypes";
import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

export default function PostToHomeScreen({
  navigation,
  route,
}: MainStackParamList<"PostToHomeScreen">) {
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [contactName, setContactName] = React.useState(String);
  const [mobile, setMobile] = React.useState(String);
  const [address, setAddress] = React.useState(String);
  const [postalCode, setPostalCode] = React.useState(String);
  const [error, setError] = React.useState(String);

  function validateSave() {
    console.log("Validating");

    var validationError = false;

    if (contactName.length === 0) {
      validationError = true;
    } else {
    }

    if (mobile.length === 0) {
      validationError = true;
    } else {
    }

    if (address.length === 0) {
      validationError = true;
    }

    if (postalCode.length === 0) {
      validationError = true;
    }

    if (!validationError) {
      submitPost();
    } else {
      setError("Please fill in all the fields");
    }
  }

  async function submitPost() {
    const customer_code = Math.floor(Math.random() * 99999 + 1);
    console.log(`Logging customer code: ${customer_code}`);

    const jwt = await AsyncStorage.getItem("@User:jwt");
    const user_id = await AsyncStorage.getItem("@User:id");

    console.log("Logging jwt");
    console.log(jwt);

    axios
      .post(
        `/posts`,
        {
          contact_name: contactName,
          mobile: mobile,
          address: address,
          postal_code: postalCode,
          customer_code: customer_code,
          created_user_id: user_id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setIsModalShow(true);
      })
      .catch(function (error) {
        Alert.alert(
          "An error occured",
          "Please try again later",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  }

  return (
    <View style={{ flex: 1, padding: 8, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{ paddingRight: 20 }}
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}
        >
          <Ionicons name="md-arrow-back" size={24} />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 18, fontWeight: "700" }}>Post to Home</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={{ flex: 1 }}>Contact name</Text>
        <TextInput
          onChangeText={(text) => {
            setError("");
            setContactName(text);
          }}
          style={{ flex: 2, height: 40, backgroundColor: "white" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={{ flex: 1 }}>Mobile</Text>
        <TextInput
          onChangeText={(text) => {
            setError("");
            setMobile(text);
          }}
          style={{ flex: 2, height: 40, backgroundColor: "white" }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={{ flex: 1 }}>Address</Text>
        <TextInput
          onChangeText={(text) => {
            setError("");
            setAddress(text);
          }}
          style={{ flex: 2, height: 40, backgroundColor: "white" }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <Text style={{ flex: 1 }}>Zip/Postal Code</Text>
        <TextInput
          onChangeText={(text) => {
            setError("");
            setPostalCode(text);
          }}
          style={{ flex: 2, height: 40, backgroundColor: "white" }}
        />
      </View>

      <Text
        style={{
          fontSize: 14,
          fontWeight: "600",
          color: "red",
          textAlign: "center",
          marginVertical: 4,
        }}
      >
        {error}
      </Text>
      <Button
        onPress={() => {
          validateSave();
        }}
        style={{ marginTop: 14, backgroundColor: "#339989" }}
      >
        <Text style={{ color: "white"}}>

        Save
        </Text>
      </Button>

      {/* Modal START */}
      <Provider>
        <Portal>
          <Modal
            visible={isModalShow}
            onDismiss={() => setIsModalShow(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 8,
              justifyContent: "flex-start",
            }}
          >
            <Text style={{ fontWeight: "600", fontSize: 18, marginBottom: 4 }}>
              Success
            </Text>
            <Text>
              We are now waiting for your package to arrive. Have have your item
              shipped to this P.O. box number below, and we will have it delivered to you.
            </Text>
            <View style={{ flexDirection: "row", marginVertical: 8 }}>
              <Text>P.O. Box: </Text>
              <Text style={{ fontWeight: "700" }}>23020</Text>
            </View>
            <Text>
              You can also view all your Post to Home order's by going to Profile > My Post to Home
            </Text>
            <Button
              onPress={() => {
                setIsModalShow(false);
                navigation.dispatch(StackActions.pop());
              }}
              style={{ marginTop: 14, backgroundColor: "#339989" }}
              mode="contained"
            >
              Ok
            </Button>
          </Modal>
        </Portal>
      </Provider>
      {/* Modal END */}
    </View>
  );
}
