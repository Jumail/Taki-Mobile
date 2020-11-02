import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, Dimensions, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Divider from "../components/Divider";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
// Context
import { AuthContext } from "../helpers/AuthContext";

export default function AccountScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [data, setData] = React.useState(Object);

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
        console.log(response.data);
        setData(response.data);
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
                Alert.prompt("Enter new address", "", [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: async (address) => {
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
                        })
                        .catch(function (error) {
                          console.log(error);
                        });
                    },
                  },
                ]);
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
          <Text>Version 1.0.9</Text>
        </View>
      </View>
    </View>
  );
}
