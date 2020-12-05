import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import axios from "axios";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Caption,
  Drawer,
  Title,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { AuthContext } from "../helpers/AuthContext";

export default function DrawerContent(props: any) {
  const [data, setData] = React.useState({
    username: null,
    phone: null,
  });
  const { signOut } = React.useContext(AuthContext);

  const paperTheme = useTheme();

  React.useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const id = await AsyncStorage.getItem("@User:id");
    const jwt = await AsyncStorage.getItem("@User:jwt");

    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <TouchableRipple
            onPress={() => {
              console.log("Take user to user info..");
            }}
            style={styles.userInfoSection}
          >
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              {/* <Avatar.Image
                source={{
                  uri: props.data.img,
                }}
                size={50}
              /> */}

              <Image
                source={require("../../assets/user.png")}
                style={{
                  width: 45,
                  height: 45,
                  marginRight: 8,
                  borderRadius: 45 / 2,
                }}
              />
              <View
                style={{
                  marginLeft: 15,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Title style={styles.title}>{data.username}</Title>
                <Caption style={styles.caption}>{data.phone}</Caption>
              </View>
            </View>
          </TouchableRipple>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("HomeScreen");
              }}
              // onPress={() => navigation.navigate("HomeScreen")}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Deliveries"
              onPress={() => {
                props.navigation.navigate("DeliveriesScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="history"
                  color={color}
                  size={size}
                />
              )}
              label="History"
              onPress={() => {
                props.navigation.navigate("HistoryScreen");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("Settings");
              }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="bell-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Notifications"
              onPress={() => {
                props.navigation.navigate("NotificationScreen");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons
                  name="account-check-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Feedback"
              onPress={() => {
                props.navigation.navigate("FeedbackScreen");
              }}
            />
          </Drawer.Section>
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                console.log("Theme toggle");
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
        <Caption style={{ marginHorizontal: 20 }}>Version: 1.1.2</Caption>
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
