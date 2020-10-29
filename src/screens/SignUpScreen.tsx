import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Appbar } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import axios from "axios";

// Types
import { AuthStackParamList } from "../types/AuthTypes";

export default function SignUpScreen({
  navigation,
  route,
}: AuthStackParamList<"SignUpScreen">) {
  const [username, setUsername] = React.useState(String);
  const [email, setEmail] = React.useState(String);
  const [password, setPassword] = React.useState(String);
  const [errorMsg, setErrorMsg] = React.useState(String);

  function _doLogin() {
    axios
      .post("/auth/local/register", {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate("RegisterScreen", {
          id: response.data.user.id,
          jwt: response.data.jwt,
          data: response.data,
        });
      })
      .catch(function (error) {
        console.log(error.response.data.data[0].messages[0].message);
        setErrorMsg(error.response.data.data[0].messages[0].message);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: "white", elevation: 0 }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}
        />
        <Appbar.Content title="Register" />
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
          placeholder="Username"
          onChangeText={(text) => {
            setErrorMsg("");
            setUsername(text);
          }}
          style={{ marginBottom: 5, backgroundColor: "white" }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => {
            setErrorMsg("");
            setEmail(text);
          }}
          keyboardType="email-address"
          style={{ marginBottom: 5, backgroundColor: "white" }}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(text) => {
            setErrorMsg("");
            setPassword(text);
          }}
          secureTextEntry={true}
          style={{ backgroundColor: "white" }}
        />
        <Text style={{ marginTop: 10, color: "red" }}>{errorMsg}</Text>
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
            _doLogin();
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
