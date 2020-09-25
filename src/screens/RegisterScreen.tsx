import { StackActions } from "@react-navigation/native";
import axios from "axios";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Appbar, Button, Caption, TextInput } from "react-native-paper";
// Context
import { AuthContext } from "../helpers/AuthContext";
// Types
import { AuthStackParamList } from "../types/AuthTypes";

export default function RegisterScreen({
  navigation,
  route,
}: AuthStackParamList<"RegisterScreen">) {
  const [contact, setContact] = React.useState(String);
  const { signIn } = React.useContext(AuthContext);

  React.useEffect(() => {
    console.log(route.params.jwt);
  }, []);

  function submitContact() {
    if (contact.length === 7) {
      axios
        .put(
          `/users/${route.params.id}`,
          {
            phone: contact,
          },
          {
            headers: {
              Authorization: `Bearer ${route.params.jwt}`,
            },
          }
        )
        .then(function (response) {
          signIn(route.params.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("Incorrect contact");
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Appbar.Header>
            <Appbar.Action
              icon="arrow-left"
              onPress={() => {
                navigation.dispatch(StackActions.pop());
              }}
            />
            <Appbar.Content title="Register" />
          </Appbar.Header>
          <View style={{ flex: 1, padding: 20 }}>
            <TextInput
              style={{ marginBottom: 8 }}
              value={contact}
              label="Phone"
              keyboardType="phone-pad"
              mode="outlined"
              onChangeText={(text) => setContact(text)}
            />

            <Button
              onPress={() => {
                submitContact();
              }}
              mode="contained"
              style={{
                marginTop: 20,
                marginBottom: 4,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Next
            </Button>
            <Caption>
              By clicking next you are agreeing to out to our terms of service
              and privacy policy.
            </Caption>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
