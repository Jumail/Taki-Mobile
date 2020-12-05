import React from "react";
import { Dimensions, Image, Text, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
// Context
import { AuthContext } from "../helpers/AuthContext";
// Types
import { AuthStackParamList } from "../types/AuthTypes";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen({
  navigation,
  route,
}: AuthStackParamList<"AuthScreen">) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View
        style={{
          width: Dimensions.get("window").width,
          justifyContent: "space-between",
          margin: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/icon.png")}
            style={{ width: 50, height: 50, borderRadius: 8 }}
          />
          <Text style={{ fontWeight: "700", fontSize: 20, marginStart: 8 }}>
            Taki
          </Text>
        </View>
      </View>
      <View style={{ flex: 1 }}></View>

      <View
        style={{
          width: Dimensions.get("window").width,
          margin: 12,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "800" }}>
          Welcome to Taki!
        </Text>
        <Text style={{ width: "80%", marginVertical: 20 }}>
          Taki is a delivery platform for the sellers throughout Maldives to
          deliver their products to customers online.
        </Text>
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("User clicked sign in");
              navigation.navigate("LoginScreen");
            }}
            style={{
              width: "45%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 8,
              borderRadius: 20,
              marginEnd: 5,
              minWidth: 10,
              backgroundColor: "#339989",
            }}
          >
            <Text style={{ fontWeight: "700", color: "white" }}>Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SignUpScreen")}
            style={{
              width: "45%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 8,
              borderRadius: 20,
              marginStart: 5,
              backgroundColor: "#339989",
              minWidth: 10,
            }}
          >
            <Text style={{ fontWeight: "700", color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Version 1.1.2</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
