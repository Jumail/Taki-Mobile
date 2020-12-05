import { Ionicons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import QueryString from "qs";
import React from "react";
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Appbar,
  Button,
  Caption,
  Card,
  Paragraph,
  Text,
  Title,
} from "react-native-paper";
// SVG
import Empty from "../../assets/SVG/Empty";
// Types
import { MainStackParamList } from "../types/MainTypes";

export default function PostToHomeList({
  navigation,
  route,
}: MainStackParamList<"PostToHomeList">) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    const id = await AsyncStorage.getItem("@User:id");
    const jwt = await AsyncStorage.getItem("@User:jwt");

    const query = QueryString.stringify({
      _where: [{ created_user_id: id }],
    });

    axios
      .get(`/posts?_sort=created_at:desc&${query}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 14,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{ paddingRight: 20 }}
              onPress={() => {
                navigation.dispatch(StackActions.pop());
              }}
            >
              <Ionicons name="md-arrow-back" size={24} />
            </TouchableOpacity>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                My Post to Home
              </Text>
              <Text>{`${data.length} listing`}</Text>
            </View>
          </View>

          <View style={{ flex: 1 }}>
            {data.length == 0 ? (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Empty
                  width={Dimensions.get("window").width - 65}
                  height={Dimensions.get("window").width - 65}
                />
                <Text>You have no items in History</Text>
              </View>
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => makeRequest()}
                  />
                }
                scrollEnabled={true}
                data={data}
                renderItem={({ item }) => {
                  return (
                    <Card
                      style={{
                        margin: 8,
                        padding: 8,
                        backgroundColor: "white",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 16,
                          marginBottom: 5,
                        }}
                      >
                        {item.contact_name}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text>P.O box: </Text>
                        <Text style={{ fontWeight: "700" }}>2000</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Created: </Text>
                        <Text style={{ fontWeight: "700" }}>
                          {moment(item.created_at).fromNow()}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Delivery address: </Text>
                        <Text style={{ fontWeight: "700" }}>
                          {item.address}
                        </Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text>Contact: </Text>
                        <Text style={{ fontWeight: "700" }}>{item.mobile}</Text>
                      </View>
                    </Card>
                  );
                }}
              ></FlatList>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
