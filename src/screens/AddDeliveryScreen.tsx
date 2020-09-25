import AsyncStorage from "@react-native-community/async-storage";
import { Picker } from "@react-native-community/picker";
// import { Picker } from "@react-native-community/picker";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
// Types
import { MainStackParamList } from "../types/MainTypes";

export default function AddDeliveryScreen({
  navigation,
  route,
}: MainStackParamList<"AddDeliveryScreen">) {
  const [loading, setLoading] = React.useState(true);
  const [name, setName] = React.useState(String);
  const [nameError, setNameError] = React.useState(false);
  const [address, setAddress] = React.useState(String);
  const [addressError, setAddressError] = React.useState(false);
  const [nearby, setNearby] = React.useState(String);
  const [nearbyError, setNearbyError] = React.useState(false);
  const [contact, setContact] = React.useState(String);
  const [contactError, setContactError] = React.useState(false);
  const [remarks, setRemarks] = React.useState(String);

  const [parcelCount, setParcelCount] = React.useState(1);
  const [parcelArray, setParcelArray] = React.useState(Array);

  React.useEffect(() => {
    updateList(1);
  }, []);

  function validateDelivery() {
    console.log("Adding delivery");
    var validationError = false;

    // Customer Name
    if (name.length == 0) {
      validationError = true;
      setNameError(true);
    } else {
      setNameError(false);
    }
    // Customer Address
    if (address.length == 0) {
      validationError = true;
      setAddressError(true);
    } else {
      setAddressError(false);
    }
    // Nearby location
    if (nearby.length == 0) {
      validationError = true;
      setNearbyError(true);
    } else {
      setNearbyError(false);
    }
    // Contact number
    if (contact.length == 0) {
      validationError = true;
      setContactError(true);
    } else {
      setContactError(false);
    }

    if (!validationError) {
      addDelivery();
    }
  }

  async function addDelivery() {
    const parcel_type = JSON.stringify(parcelArray);

    const jwt = await AsyncStorage.getItem("@User:jwt");
    const id = await AsyncStorage.getItem("@User:id");
    console.log(jwt);
    axios
      .post(
        `/deliveries`,
        {
          customer_name: name,
          customer_contact: contact,
          address: address,
          nearby: nearby,
          remarks: remarks,
          parcel_quantity: parcelCount,
          parcel_type: parcel_type,
          user_id: id,
          pickup_location: route.params.pickup_location,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function updateList(count: number) {
    var parcel_array = [];

    for (var i = 1; i <= count; i++) {
      parcel_array.push(0);
    }

    setParcelArray(parcel_array);
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Appbar.Header>
            <Appbar.BackAction
              onPress={() => {
                navigation.dispatch(StackActions.pop());
              }}
            />
            <Appbar.Content title="Add delivery" />
          </Appbar.Header>

          <View style={{ padding: 8 }}>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text style={{ flex: 1 }}>Customer name</Text>
              <TextInput
                onChangeText={(text) => {
                  setName(text);
                }}
                style={{ flex: 2, height: 40 }}
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
              <Text style={{ flex: 1 }}>Customer contact</Text>
              <TextInput
                onChangeText={(text) => {
                  setContact(text);
                }}
                keyboardType="phone-pad"
                style={{ flex: 2, height: 40 }}
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
              <Text style={{ flex: 1 }}>Delivery address</Text>
              <TextInput
                onChangeText={(text) => {
                  setAddress(text);
                }}
                style={{ flex: 2, height: 40 }}
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
              <Text style={{ flex: 1 }}>Nearby</Text>
              <TextInput
                onChangeText={(text) => {
                  setNearby(text);
                }}
                style={{ flex: 2, height: 40 }}
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
              <Text style={{ flex: 1 }}>Remarks</Text>
              <TextInput
                onChangeText={(text) => {
                  setRemarks(text);
                }}
                style={{ flex: 2, height: 40 }}
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
              <Text style={{ flex: 1 }}>Parcel quantity</Text>
              <View
                style={{
                  flex: 2,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 40,
                  alignItems: "center",
                }}
              >
                <Button
                  mode="contained"
                  onPress={() => {
                    if (parcelCount != 1) {
                      const newCount = parcelCount - 1;
                      updateList(newCount);
                      setParcelCount(parcelCount - 1);
                    }
                  }}
                >
                  -
                </Button>
                <Text>{parcelCount}</Text>
                <Button
                  mode="contained"
                  onPress={() => {
                    if (parcelCount != 5) {
                      const newCount = parcelCount + 1;
                      updateList(newCount);
                      setParcelCount(parcelCount + 1);
                    }
                  }}
                >
                  +
                </Button>
              </View>
            </View>
            <FlatList
              data={parcelArray}
              renderItem={({ item, index, separators }) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 8,
                      borderBottomWidth: 1,
                      borderColor: "gray",
                      backgroundColor: "#FEFEFE",
                      height: 40,
                      justifyContent: "center",
                      marginTop: 4,
                    }}
                  >
                    <Picker
                      style={{ height: 50, width: "100%" }}
                      onValueChange={(itemValue: number, itemIndex: number) => {
                        var newParcelArray = parcelArray;
                        newParcelArray.splice(itemIndex, 1, itemValue);
                        setParcelArray(newParcelArray);
                      }}
                    >
                      <Picker.Item label="Small bag" value={1} />
                      <Picker.Item label="Big bag" value={2} />
                      <Picker.Item label="Box 1ft x 1ft" value={3} />
                      <Picker.Item label="Box 1.5ft x 1.5ft" value={4} />
                    </Picker>
                    {/*
                      // <RNPickerSelect
                      //   useNativeAndroidPickerStyle={false}
                      //   onValueChange={(value) => {
                      //     var newParcelArray = parcelArray;
                      //     newParcelArray.splice(index, 1, value);
                      //     setParcelArray(newParcelArray);
                      //   }}
                      //   items={[
                      //     { label: "Small bag", value: 1 },
                      //     { label: "Big bag", value: 2 },
                      //     { label: "Box 1ft x 1ft", value: 3 },
                      //     { label: "Box 1.5ft x 1.5ft", value: 4 },
                      //   ]}
                      // /> */}
                  </View>
                );
              }}
            />

            <Button
              onPress={() => {
                validateDelivery();
              }}
              mode="contained"
              style={{ marginTop: 8 }}
            >
              Add delivery
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
