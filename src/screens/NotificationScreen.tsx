import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from "react-native";
import {
  Appbar,
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

export default function NotificationScreen({
  navigation,
  route,
}: MainStackParamList<"NotificationScreen">) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState();

  useEffect(() => {
    getNotifications();
  }, []);

  async function getNotifications() {
    const id = await AsyncStorage.getItem("@User:id");
    const jwt = await AsyncStorage.getItem("@User:jwt");

    const number_id = Number(id);

    const qs = axios
      .get(`/notifications?_where[user_id]=${id}`, {
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

  const ErrorBox = () => {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Its Empty..</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Appbar.Header>
            <Appbar.Action
              icon="menu"
              onPress={() => {
                navigation.openDrawer();
              }}
            />
            <Appbar.Content
              title="Notifications"
              subtitle={`${data.length} notifications`}
            />
            <Appbar.Action
              icon="refresh"
              onPress={() => {
                setLoading(true);
                getNotifications();
              }}
            />
          </Appbar.Header>

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
                <Text>You have no notifications</Text>
              </View>
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getNotifications()}
                  />
                }
                scrollEnabled={true}
                data={data}
                renderItem={({ item }) => {
                  return (
                    <Card
                      style={{
                        marginBottom: 8,
                        margin: 8,
                      }}
                      onPress={() => {
                        setSelectedData(item);
                        setIsModalVisible(true);
                      }}
                    >
                      <Card.Content>
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            alignItems: "center",
                          }}
                        >
                          <Title
                            style={{
                              flex: 1,
                              textAlignVertical: "center",
                            }}
                          >
                            {item.title}
                          </Title>
                          <Caption>{moment(item.created_at).fromNow()}</Caption>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                          }}
                        >
                          <Paragraph>{item.body}</Paragraph>
                        </View>
                      </Card.Content>
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
