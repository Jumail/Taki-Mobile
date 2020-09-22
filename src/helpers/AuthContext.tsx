import React from "react";

export const AuthContext = React.createContext({
  signIn: async (data: JSON) => {
    console.log("...");
  },
  signUp: async (data: JSON) => {
    console.log("...");
  },
  signOut: async () => {
    console.log("...");
  },
});
