import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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

export function HomeStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddDeliveryScreen" component={AddDeliveryScreen} />
    </Stack.Navigator>
  );
}

export default function MainRoute() {
  const [data, setData] = React.useState({
    name: null,
  });

  const Drawer = createDrawerNavigator<MainParamList>();
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeStack} />
        <Drawer.Screen name="DeliveriesScreen" component={DeliveriesScreen} />
        <Drawer.Screen name="HistoryScreen" component={HistoryScreen} />
        <Drawer.Screen
          name="NotificationScreen"
          component={NotificationsScreen}
        />
        <Drawer.Screen name="FeedbackScreen" component={FeedbackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
