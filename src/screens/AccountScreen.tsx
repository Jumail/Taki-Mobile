import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Alert,
  TextInput,
  Platform,
} from "react-native";
import { Provider, Portal, Modal, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "../components/Divider";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
// Context
import { AuthContext } from "../helpers/AuthContext";
// Types
import { MainStackParamList } from "../types/MainTypes";

export default function AccountScreen({
  navigation,
  route,
}: MainStackParamList<"AccountScreen">) {
  const { signOut } = React.useContext(AuthContext);
  const [isAddressModalVisible, setIsAddressModalVisible] = React.useState(
    false
  );
  const [address, setAddress] = React.useState(String);
  const [data, setData] = React.useState(Object);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      makeRequest();
    });

    return unsubscribe;
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
        console.log(response.data);
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
        console.log(response.data);
        setData(response.data);
        setIsAddressModalVisible(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: Dimensions.get("window").width,
          marginTop: 8,
          padding: 20,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 5 }}>
              {data.username}
            </Text>
            <Text style={{ fontSize: 14, marginBottom: 5 }}>{data.email}</Text>
            <Text style={{ marginBottom: 5 }}>Address: {data.address}</Text>

            <TouchableOpacity
              onPress={() => {
                setIsAddressModalVisible(true);
              }}
              style={{
                backgroundColor: "#2B2c28",
                width: 125,
                height: 25,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                change address
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
          <Image
            source={require("../../assets/user.png")}
            style={{
              width: 30,
              height: 30,
              marginRight: 8,
              borderRadius: 30 / 2,
            }}
          />
        </View>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PostToHomeList");
            console.log("Navigate to post to home list...");
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Ionicons name="md-mail" size={24} />
          <Text style={{ fontSize: 18, fontWeight: "500", marginStart: 8 }}>
            My Post to Home
          </Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "red",
            padding: 8,
            justifyContent: "center",
            borderRadius: 20,
          }}
        >
          <Ionicons name="md-log-out" size={24} color="red" />
          <Text style={{ marginStart: 8, fontSize: 18, color: "red" }}>
            Log out
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text>Version 1.1.2</Text>
        </View>
      </View>
      <Provider>
        <Portal>
          <Modal
            visible={isAddressModalVisible}
            contentContainerStyle={{
              flex: 1,
              marginTop: Platform.OS == "android" ? 100 : 0,
            }}
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
                    Your address will be used as a pickup location. Please make
                    sure it is accurate.
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
                    style={{ width: "100%", backgroundColor: "#339989" }}
                    onPress={() => {
                      updateAddress();
                    }}
                  >
                    <Text style={{ color: "white" }}>Save</Text>
                  </Button>
                  <Button
                    mode="contained"
                    style={{
                      width: "100%",
                      backgroundColor: "#2B2C28",
                      marginTop: 6,
                    }}
                    onPress={() => {
                      setIsAddressModalVisible(false);
                    }}
                  >
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}
