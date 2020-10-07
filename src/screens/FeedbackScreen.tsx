import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, SafeAreaView, Text, TextInput, View } from "react-native";
import { Appbar, Button } from "react-native-paper";
// Types
import { MainStackParamList } from "../types/MainTypes";

export default function FeedbackScreen({
  navigation,
  route,
}: MainStackParamList<"FeedbackScreen">) {
  const [subject, setSubject] = React.useState(String);
  const [feedback, setFeedback] = React.useState(String);

  async function submitFeedback() {
    const jwt = await AsyncStorage.getItem("@User:jwt");

    console.log(jwt);

    axios
      .post(
        "/feedbacks",
        {
          subject: subject,
          body: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        Alert.alert(
          "Thank you.",
          "Your feedback has been submitted and will be reviewed by our team.",
          [
            {
              text: "Thank you",
              onPress: () =>
                console.log(
                  "Your feedback has been submitted and will be reviewed by our team."
                ),
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ],
          { cancelable: false }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar />
        <Appbar.Header>
          <Appbar.Action
            icon="menu"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content
            title="Feedback"
            // subtitle={`${data.length} in history`}
          />
        </Appbar.Header>
        <View style={{ padding: 8 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ flex: 1 }}>Subject</Text>
            <TextInput
              onChangeText={(text) => {
                setSubject(text);
              }}
              style={{
                flex: 3,
                height: 50,
                textAlignVertical: "center",
                backgroundColor: "#E7E7E7",
                padding: 8,
              }}
            ></TextInput>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Feedback</Text>
            <TextInput
              onChangeText={(text) => {
                setFeedback(text);
              }}
              multiline={true}
              numberOfLines={20}
              style={{
                flex: 3,
                height: 200,
                textAlignVertical: "top",
                backgroundColor: "#E7E7E7",
                padding: 8,
              }}
            ></TextInput>
          </View>
          <Button
            onPress={() => {
              submitFeedback();
            }}
            mode="contained"
            style={{ marginTop: 12 }}
          >
            Submit Feedback
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
