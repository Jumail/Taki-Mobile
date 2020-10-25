import axios from "axios";
import * as Facebook from "expo-facebook";
import * as Google from "expo-google-app-auth";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { Button } from "react-native-paper";
// SVG
import Deliveries from "../../assets/SVG/Deliveries";
// Context
import { AuthContext } from "../helpers/AuthContext";
// Types
import { AuthStackParamList } from "../types/AuthTypes";

export default function AuthScreen({
  navigation,
  route,
}: AuthStackParamList<"AuthScreen">) {
  const { signIn } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Deliveries
        width={Dimensions.get("window").width - 20}
        height={Dimensions.get("window").width - 20}
      />

      <Text style={{ fontSize: 20, fontWeight: "500" }}>WELCOME</Text>
      <Text style={{ width: "80%", textAlign: "center", marginVertical: 20 }}>
        Taki is a delivery platform for the sellers throughout Maldives to
        deliver their products to customers online.
      </Text>

      <Button
        mode="contained"
        onPress={() => {
          console.log("User clicked sign in");
          navigation.navigate("LoginScreen");
        }}
        style={{
          width: "80%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 8,
        }}
      >
        Sign In
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("SignUpScreen")}
        style={{
          width: "80%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 8,
        }}
      >
        Create an account
      </Button>

      <View>
        <Text>Version 1.0.8</Text>
      </View>
    </View>
  );
}
