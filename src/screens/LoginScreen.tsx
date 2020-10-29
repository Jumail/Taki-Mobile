import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextInput, Appbar } from "react-native-paper";
import { StackActions } from "@react-navigation/native";
import axios from "axios";

// Context
import { AuthContext } from "../helpers/AuthContext";

// Types
import { AuthStackParamList } from "../types/AuthTypes";

export default function Login({
  navigation,
  route,
}: AuthStackParamList<"LoginScreen">) {
  const [errorMsg, setErrorMsg] = React.useState(String);
  const [email, setEmail] = React.useState(String);
  const [password, setPassword] = React.useState(String);
  const { signIn } = React.useContext(AuthContext);

  function _doLogin() {
    axios
      .post("/auth/local", {
        identifier: email,
        password: password,
      })
      .then(function (response) {
        signIn(response.data);
      })
      .catch(function (error) {
        console.log(error.response.data.data[0].messages[0].message);
        setErrorMsg(error.response.data.data[0].messages[0].message);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ elevation: 0, backgroundColor: "white" }}>
        <Appbar.BackAction
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}
        />
        <Appbar.Content title="Login" />
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
          placeholder="Email or Username"
          onChangeText={(text) => {
            setErrorMsg("");
            setEmail(text);
          }}
          style={{ marginBottom: 5, backgroundColor: "white" }}
          keyboardType="email-address"
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
            _doLogin();
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{ textAlign: "right" }}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
