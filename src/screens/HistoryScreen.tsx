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

export default function HistoryScreen({
  navigation,
  route,
}: MainStackParamList<"HistoryScreen">) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setLoading(true);
      getCompletedDeliveries();
    });

    return unsubscribe;
  }, [navigation]);

  async function getCompletedDeliveries() {
    const id = await AsyncStorage.getItem("@User:id");
    const jwt = await AsyncStorage.getItem("@User:jwt");

    const number_id = Number(id);

    // Send user ID and the status as 4 to get completed deliveries for the user
    const query = QueryString.stringify({
      _where: [{ user_id: id }, { status: 4 }],
    });

    const qs = axios
      .get(`/deliveries?_sort=created_at:desc&${query}`, {
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
              title="History"
              subtitle={`${data.length} deliveries`}
            />
            <Appbar.Action
              icon="refresh"
              onPress={() => {
                setLoading(true);
                getCompletedDeliveries();
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
                <Text>You have no items in History</Text>
              </View>
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getCompletedDeliveries()}
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
                            {item.customer_name}
                          </Title>
                          <Caption>{moment(item.created_at).fromNow()}</Caption>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                          }}
                        >
                          <Paragraph>{`${item.address}, nearby ${item.nearby}`}</Paragraph>
                        </View>
                        <Caption>Status: Completed</Caption>

                        <Button
                          mode="contained"
                          style={{ marginTop: 4 }}
                          onPress={() => {
                            let phoneNumber = "";

                            if (Platform.OS === "android") {
                              phoneNumber = `tel:${item.customer_contact}`;
                            } else {
                              phoneNumber = `telprompt:${item.customer.contact}`;
                            }

                            Linking.openURL(phoneNumber);
                          }}
                        >
                          {item.customer_contact}
                        </Button>
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
