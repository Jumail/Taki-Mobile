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
              <Text style={{ fontSize: 18, fontWeight: "700" }}>History</Text>
              <Text>{`${data.length} deliveries`}</Text>
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
                        <Caption>{`Parcel type: `}</Caption>

                        {Array.from(item.parcel_type).map((parcel) => {
                          if (parcel == "[") {
                            null;
                          } else if (parcel == "]") {
                            null;
                          } else {
                            if (parcel === "1") {
                              return <Caption>- Small bag</Caption>;
                            } else if (parcel === "2") {
                              return <Caption>- Big bag</Caption>;
                            } else if (parcel === "3") {
                              return <Caption>- Box 1ft x 1ft</Caption>;
                            } else {
                              return <Caption>- Box 1.5ft x 1.5ft</Caption>;
                            }
                          }
                        })}

                        <Button
                          mode="contained"
                          style={{ marginTop: 4, backgroundColor: "#339989" }}
                          onPress={() => {
                            let phoneNumber = "";

                            if (Platform.OS === "android") {
                              phoneNumber = `tel:${item.customer_contact}`;
                            } else {
                              phoneNumber = `telprompt:${item.customer_contact}`;
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
