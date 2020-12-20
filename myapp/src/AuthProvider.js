import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.106:8000";
export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        login: (email, password) => {
          axios
            .post("/api/sanctum/token", {
              email,
              password,
              device_name: "mobile",
            })
            .then((response) => {
              const userResponse = {
                email: response.data.user.email,
                token: response.data.token,
              };
              setUser(userResponse);
              SecureStore.setItemAsync("user", JSON.stringify(userResponse));
            })
            .catch((error) => {
              console.log("error", error);
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
            });
        },
        logout: () => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.token}`;

          axios
            .post("/api/logout")
            .then((response) => {
              setUser(null);
              SecureStore.deleteItemAsync("user");
            })
            .catch((error) => {
              console.log("error", error);
            });
        },
        signup: (
          firstname,
          lastname,
          gender,
          email,
          type,
          location,
          phone_number,
          password,
          confirm_password
        ) => {
          axios
            .post("/api/signup", {
              firstname,
              lastname,
              gender,
              email,
              type,
              location,
              phone_number,
              password,
              confirm_password,
              device_name: "mobile",
            })
            .then((response) => {
              if (response.status === 201) {
                const userResponse = {
                  email: response.data.user.email,
                  token: response.data.token,
                };
                setUser(userResponse);
                SecureStore.setItemAsync("user", JSON.stringify(userResponse));
              }
            })
            .catch((error) => {
              console.log("error", error);
              const key = Object.keys(error.response.data.errors)[0];
              setError(error.response.data.errors[key][0]);
            });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

const styles = StyleSheet.create({});
