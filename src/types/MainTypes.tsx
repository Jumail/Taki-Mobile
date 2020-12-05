import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

export type MainParamList = {
  HomeScreen: undefined;
  DeliveriesScreen: undefined;
  HistoryScreen: undefined;
  NotificationScreen: undefined;
  FeedbackScreen: undefined;
  AddDeliveryScreen: {
    pickup_location: string;
  };
  AccountScreen: undefined;
  PostToHomeScreen: undefined;
  PostToHomeList: undefined;
};

export type MainStackParamList<T extends keyof MainParamList> = {
  navigation: DrawerNavigationProp<MainParamList, T>;
  route: RouteProp<MainParamList, T>;
};
