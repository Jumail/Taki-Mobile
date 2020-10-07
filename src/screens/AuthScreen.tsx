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
        icon="google"
        mode="contained"
        onPress={() => signInWithGoogleAsync()}
        style={{
          width: "80%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 8,
        }}
      >
        Login with Google
      </Button>
      <Button
        icon="facebook"
        mode="contained"
        onPress={() => signInWithFacebookAsync()}
        style={{
          width: "80%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 8,
        }}
      >
        Login with Facebook
      </Button>

      <View>
        <Text>Version 1.0.6</Text>
      </View>
    </View>
  );

  async function signInWithGoogleAsync() {
    try {
      // First- obtain access token from Expo's Google API
      const result = await Google.logInAsync({
        androidClientId:
          "293615448786-ckhf1936l085v0t9i31db3u6b845h7i7.apps.googleusercontent.com",
        iosClientId:
          "293615448786-uvimftv60iq49bcqbnff096faiokab48.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      console.log(result);
      if (result.type === "success") {
        axios
          .get(
            `/auth/google/callback?id_token=${result.idToken}&access_token=${result.accessToken}`
          )
          .then(function (response) {
            if (response.data.user.phone === null) {
              navigation.navigate("RegisterScreen", {
                id: response.data.user.id,
                jwt: response.data.jwt,
                data: response.data,
              });
            } else {
              signIn(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(`Google login error: ${error}`);
    }
  }

  async function signInWithFacebookAsync() {
    console.log("Trying to signin with facebook");
    try {
      await Facebook.initializeAsync("330024598109308");
      const result = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });
      if (result.type === "success") {
        axios
          .get(`/auth/facebook/callback?access_token=${result.token}`)
          .then(function (response) {
            if (response.data.user.phone === null) {
              navigation.navigate("RegisterScreen", {
                id: response.data.user.id,
                jwt: response.data.jwt,
                data: response.data,
              });
            } else {
              signIn(response.data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } catch (error) {
      alert(`Facebook login error: ${error}`);
    }
  }
}
