import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Appbar,
  Button,
  Modal,
  Portal,
  Provider,
  Text,
} from "react-native-paper";
// SVG
import OnTheWay from "../../assets/SVG/OnTheWay";
// Context
import { AuthContext } from "../helpers/AuthContext";
// Types
import { MainStackParamList } from "../types/MainTypes";

export default function Home({
  navigation,
  route,
}: MainStackParamList<"HomeScreen">) {
  const [data, setData] = React.useState(Object);
  const [isAddressModalVisible, setIsAddressModalVisible] = React.useState(
    false
  );
  const [address, setAddress] = React.useState(String);
  const { signOut } = React.useContext(AuthContext);

  React.useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    const jwt = await AsyncStorage.getItem("@User:jwt");
    const id = await AsyncStorage.getItem("@User:id");

    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(function (response) {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function updateAddress() {
    const jwt = await AsyncStorage.getItem("@User:jwt");
    const id = await AsyncStorage.getItem("@User:id");

    axios
      .put(
        `/users/${id}`,
        {
          address: address,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        setData(response.data);
        setIsAddressModalVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content title="OauthX Express" />
        </Appbar.Header>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 14,
            alignItems: "center",
          }}
        >
          <OnTheWay
            width={Dimensions.get("window").width - 50}
            height={Dimensions.get("window").width - 50}
          />
          <View
            style={{
              marginBottom: 24,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                fontSize: 20,
                color: "#434343",
                marginBottom: 8,
              }}
            >
              OauthX Express
            </Text>
            <Text
              style={{
                fontWeight: "700",
                color: "#7B7B7B",
                textAlign: "center",
              }}
            >
              A delivery platform for sellers throughout Maldives to deliver
              their products to customers.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              setIsAddressModalVisible(true);
            }}
            style={{
              marginBottom: 14,
              backgroundColor: "#FF5980",
              width: "100%",
              padding: 20,
              borderRadius: 20,
              flexDirection: "row",
            }}
          >
            {/* <Image
              source={{ uri: data.img }}
              style={{
                width: 45,
                height: 45,
                marginRight: 8,
                borderRadius: 45 / 2,
              }}
            /> */}
            <Image
              source={require("../../assets/profile.jpg")}
              style={{
                width: 45,
                height: 45,
                marginRight: 8,
                borderRadius: 45 / 2,
              }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{ color: "white", marginBottom: 6, fontWeight: "600" }}
              >
                Pickup location
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white" }}>
                  {data.address == null ? "-" : data.address}
                </Text>
              </View>
            </View>
            <Ionicons name="md-create" size={20} style={{ color: "white" }} />
          </TouchableOpacity>
          {data.address == null ? (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "You need to enter an address first",
                  "",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
              }}
              style={{
                backgroundColor: "gray",
                width: "100%",
                padding: 20,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="md-cube"
                size={20}
                style={{ color: "white", marginRight: 8 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                Add delivery
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("AddDeliveryScreen", {
                  pickup_location: data.address,
                });
              }}
              style={{
                backgroundColor: "#EF555C",
                width: "100%",
                padding: 20,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name="md-cube"
                size={20}
                style={{ color: "white", marginRight: 8 }}
              />
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                Add delivery
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <Provider>
          <Portal>
            <Modal
              visible={isAddressModalVisible}
              contentContainerStyle={{ flex: 1 }}
            >
              <View style={{ flex: 1, paddingHorizontal: 14 }}>
                <View
                  style={{
                    backgroundColor: "white",
                    paddingVertical: 40,
                    marginTop: 20,
                    borderRadius: 20,
                  }}
                >
                  {/* <MyLocationSvg
                    width={Dimensions.get("window").width}
                    height={Dimensions.get("window").width / 2}
                  /> */}

                  <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
                    <Text>
                      Your address will be used as a pickup location. Please
                      make sure it is accurate.
                    </Text>
                    <TextInput
                      placeholder="Enter address"
                      placeholderTextColor="gray"
                      onChangeText={(text) => {
                        setAddress(text);
                      }}
                      style={{
                        width: "100%",
                        marginVertical: 20,
                        borderBottomWidth: 2,
                        borderBottomColor: "gray",
                        marginHorizontal: 20,
                        padding: 8,
                        marginTop: 30,
                      }}
                    ></TextInput>
                    <Button
                      mode="contained"
                      style={{ width: "100%" }}
                      onPress={() => {
                        updateAddress();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      mode="contained"
                      style={{
                        width: "100%",
                        backgroundColor: "gray",
                        marginTop: 6,
                      }}
                      onPress={() => {
                        setIsAddressModalVisible(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </View>
                </View>
              </View>
            </Modal>
          </Portal>
        </Provider>
      </SafeAreaView>
    </View>
  );
}
