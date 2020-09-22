import axios from "axios";
import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
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
      <TextInput onChangeText={(text) => setContact(text)} />
      <Button onPress={() => submitContact()}>Submit</Button>
    </View>
  );
}
