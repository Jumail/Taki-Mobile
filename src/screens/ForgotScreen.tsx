import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Appbar } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import axios from "axios";

// Context
import { AuthContext } from "../helpers/AuthContext";

// Types
import { AuthStackParamList } from "../types/AuthTypes";

export default function ForgotScreen({
  navigation,
  route,
}: AuthStackParamList<"ForgotScreen">) {
  const [errorMsg, setErrorMsg] = React.useState(String);
  const [email, setEmail] = React.useState(String);
  const [password, setPassword] = React.useState(String);
  const { signIn } = React.useContext(AuthContext);

  const _sendLink = () => {
    console.log("SENDING LINK");
    axios
      .post("/auth/forgot-password", {
        email: email,
      })
      .then((response) => {
        // Handle success.
        console.log("Your user received an email");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ elevation: 0, backgroundColor: "white" }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}
        />
        <Appbar.Content title="Reset your password" />
      </Appbar.Header>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 8,
          backgroundColor: "white",
          flex: 1,
        }}
      >
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setErrorMsg("");
            setEmail(text);
          }}
          style={{ marginBottom: 5, backgroundColor: "white" }}
          keyboardType="email-address"
        />
        <Text style={{ marginTop: 20, color: "red" }}>{errorMsg}</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#339989",
            marginVertical: 20,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
          onPress={() => {
            _sendLink();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Send reset link
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
