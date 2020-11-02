import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type AuthParamList = {
  AuthScreen: undefined;
  RegisterScreen: {
    id: number;
    jwt: string;
    data: JSON;
  };
  OtpScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotScreen: undefined;
};

export type AuthStackParamList<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};
