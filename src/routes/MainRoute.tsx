import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
// Components
import DrawerContent from "../components/DrawerContent";
// Screens
import AddDeliveryScreen from "../screens/AddDeliveryScreen";
import DeliveriesScreen from "../screens/DeliveriesScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import HistoryScreen from "../screens/HistoryScreen";
import HomeScreen from "../screens/HomeScreen";
import NotificationsScreen from "../screens/NotificationScreen";
// Types
import { MainParamList } from "../types/MainTypes";
import { SafeAreaView } from "react-native-safe-area-context";
import AccountScreen from "../screens/AccountScreen";

export function HomeStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddDeliveryScreen" component={AddDeliveryScreen} />
    </Stack.Navigator>
  );
}

export function DeliveriesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DeliveriesScreen" component={DeliveriesScreen} />
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

export function AccountStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
    </Stack.Navigator>
  );
}

export default function MaterialRoutes() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <View style={{ flex: 1, paddingTop: 28, backgroundColor: "#339989" }}>
      <StatusBar style="dark" />
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          tabBarOptions={{
            showIcon: true,
            showLabel: false,
            inactiveTintColor: "#7de2d1",
            activeTintColor: "white",
            indicatorContainerStyle: {
              backgroundColor: "#339989",
            },
            indicatorStyle: { backgroundColor: "#339989" },
          }}
          initialRouteName="HomeScreen"
        >
          <Tab.Screen
            name="DeliveriesScreen"
            component={DeliveriesStack}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "md-list-box" : "md-list-box"}
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <Tab.Screen
            name="HomeScreen"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "ios-home" : "md-home"}
                  color={color}
                  size={25}
                />
              ),
            }}
          />
          <Tab.Screen
            name="AccountScreen"
            component={AccountStack}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons
                  name={focused ? "md-person" : "md-person"}
                  color={color}
                  size={25}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
