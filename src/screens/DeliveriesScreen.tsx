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
import { TouchableOpacity } from "react-native-gesture-handler";
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

export default function DeliveriesScreen({
  navigation,
  route,
}: MainStackParamList<"DeliveriesScreen">) {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [selectedData, setSelectedData] = React.useState();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // do something
      setLoading(true);
      getOngoingDeliveries();
    });

    return unsubscribe;
  }, [navigation]);

  async function getOngoingDeliveries() {
    const id = await AsyncStorage.getItem("@User:id");
    const jwt = await AsyncStorage.getItem("@User:jwt");

    const number_id = Number(id);

    // Query in the url
    const query = QueryString.stringify({
      _where: [{ user_id: id }, { status: 1 || 2 || 3 }],
    });

    console.log(query);

    // apiadmin.oauthx.mv/deliveries

    axios
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
          <View
            style={{
              width: "100%",
              backgroundColor: "white",
              padding: 14,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Deliveries
              </Text>
              <Text>{` ${data.length} deliveries`}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#2B2C28",
                padding: 8,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>History</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, backgroundColor: "white" }}>
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
                <Text>You have no items</Text>
              </View>
            ) : (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getOngoingDeliveries()}
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
                        <Caption>{`Status: ${
                          item.status == 1
                            ? "Pending"
                            : item.status == 2
                            ? "Dispatched"
                            : "Picked up"
                        }`}</Caption>

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
