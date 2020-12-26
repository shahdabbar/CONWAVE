import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.106:8000";
export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [days, setDays] = useState([]);
  const [hours, setHours] = useState([]);

  useEffect(() => {
    // get days
    axios
      .get("api/days")
      .then((response) => {
        setDays(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    // get hours
    axios
      .get("api/hours")
      .then((response) => {
        setHours(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const timeslotsSetUp = (type) => {
    if (user && type === "tutor") {
      const array = [];
      days.forEach((day) => {
        hours.forEach((hour) => {
          array.push({ day_id: day.id, hour_id: hour.id });
        });
      });
      //   console.log(array);
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      axios.post("/api/timeslots", array).then((response) => {
        console.log("response", response.data);
      });
    }
  };

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
              console.log(userResponse.token);
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
                // timeslotsSetUp(type);
                if (userResponse && type === "tutor") {
                  const array = [];
                  days.forEach((day) => {
                    hours.forEach((hour) => {
                      array.push({ day_id: day.id, hour_id: hour.id });
                    });
                  });
                  axios.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${userResponse.token}`;
                  axios.post("/api/timeslots", array).then((response) => {
                    console.log("response", response.data);
                  });
                }
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
