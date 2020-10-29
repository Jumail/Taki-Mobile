import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import React from "react";
import { StatusBar } from "react-native";
// Context
import { AuthContext } from "./src/helpers/AuthContext";
// Routes
import AuthRoute from "./src/routes/AuthRoute";
import MainRoute from "./src/routes/MainRoute";

export default function App() {
  const [userToken, setUserToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    onAppLoad();
  }, []);

  async function onAppLoad() {
    // Set the default URL on axios
    axios.defaults.baseURL = "https://apiadmin.oauthx.mv";
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    // Get the user token
    const token = await getTokenFromAsyncStorage();
    setUserToken(token);
  }

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        await AsyncStorage.setItem("@User:jwt", data.jwt);
        await AsyncStorage.setItem("@User:id", String(data.user.id));
        await AsyncStorage.setItem("@User", JSON.stringify(data));

        setUserToken(data.jwt);
      },
      signUp: async (data: JSON) => {
        console.log("Signing up...");
      },
      signOut: async () => {
        await AsyncStorage.setItem("@User:jwt", "");
        await AsyncStorage.setItem("@User:id", "");
        await AsyncStorage.setItem("@User", "");

        setUserToken(null);
        console.log("signing out...");
      },
    }),
    []
  );
  console.log(userToken);
  return (
    <AuthContext.Provider value={authContext}>
      {userToken === null || userToken === "" ? <AuthRoute /> : <MainRoute />}
    </AuthContext.Provider>
  );
}

export async function getTokenFromAsyncStorage() {
  const token = await AsyncStorage.getItem("@User:jwt");
  return token;
}
