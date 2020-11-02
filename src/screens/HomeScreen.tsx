import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Alert,
  Dimensions,
  Image,
  Platform,
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
      <StatusBar style="dark" />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 14,
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          {data.address === null || data.address === "" ? (
            <View
              style={{
                backgroundColor: "red",
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: 12,
                paddingVertical: 8,
                alignItems: "center",
                borderRadius: 8,
                marginTop: 8,
              }}
            >
              <Ionicons
                name="ios-warning"
                style={{ color: "white" }}
                size={24}
              />
              <Text
                style={{ marginStart: 8, fontWeight: "600", color: "white" }}
              >
                Please set your address first
              </Text>
            </View>
          ) : null}
          <View
            style={{
              flex: 1,
            }}
          ></View>

          <View
            style={{
              width: Dimensions.get("window").width - 24,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              elevation: 1,
              shadowColor: "black",
              shadowOffset: { width: 2, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              backgroundColor: "#FFFAFB",
              borderRadius: 85,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (data.address == null || data.address == "") {
                  Alert.alert(
                    "Please enter your address first",
                    "",
                    [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                    { cancelable: false }
                  );
                } else {
                  navigation.navigate("AddDeliveryScreen", {
                    pickup_location: data.address,
                  });
                }
              }}
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 9,
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  backgroundColor: "#339989",
                  padding: 12,
                  borderRadius: 80,
                }}
              >
                <Ionicons
                  name="md-cube"
                  size={28}
                  style={{
                    color: "white",
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 9,
                borderRadius: 8,
              }}
              onPress={() => {
                Alert.alert(
                  "Coming soon",
                  "We are still working on this feature and will be coming in the next few weeks",
                  [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                  { cancelable: false }
                );
              }}
            >
              <View
                style={{
                  backgroundColor: "#339989",
                  padding: 12,
                  borderRadius: 80,
                }}
              >
                <Ionicons
                  name="md-mail"
                  size={28}
                  style={{
                    color: "white",
                  }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                PostToHome
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
