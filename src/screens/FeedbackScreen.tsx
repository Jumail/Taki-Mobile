import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import { MainStackParamList } from "../types/MainTypes";

export default function FeedbackScreen({
  navigation,
  route,
}: MainStackParamList<"FeedbackScreen">) {
  const [subject, setSubject] = React.useState();
  const [feedback, setFeedback] = React.useState();

  function submitFeedback() {
    axios
      .post("/feedbacks")
      .then(function (response) {
        console.log(response);
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
            <TextInput style={{ flex: 3, height: 30 }}></TextInput>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1 }}>Feedback</Text>
            <TextInput
              multiline={true}
              style={{ flex: 3, height: 200 }}
            ></TextInput>
          </View>
          <Button mode="contained" style={{ marginTop: 12 }}>
            Submit Feedback
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
