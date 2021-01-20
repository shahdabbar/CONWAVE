import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { AuthContext } from "./AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import Moment from "moment";
import axios from "axios";

const StudentsChatRooms = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);
  const [chat, setChat] = useState([]);

  const goChat = (name) => {
    navigation.navigate("Chat", { name: name });
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    // get user name
    axios
      .get("api/user")
      .then((response) => {
        setUserInfo(response.data);
        // console.log(response.data.type);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .get(`api/chat/users?user_id=${user.id}`)
      .then((response) => {
        setChat(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 2 }}>
        {chat ? (
          <FlatList
            data={chat}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              marginBottom: 60,
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={{
                    marginHorizontal: 20,
                  }}
                  onPress={() => {
                    goChat(item.tutors.firstname + " " + item.tutors.lastname);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View style={styles.profileImage}>
                      <Image
                        source={
                          item.tutors.profile_photo_path
                            ? {
                                uri: `http://192.168.0.107:8000/${item.tutors.profile_photo_path}`,
                              }
                            : require("../assets/images/profile2.png")
                        }
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{ paddingLeft: 20 }}>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {item.tutors.firstname} {item.tutors.lastname}
                      </Text>

                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                          color: "gray",
                        }}
                      >
                        ...
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 0.5,
                      width: "70%",
                      left: 100,
                      backgroundColor: "lightgray",
                    }}
                  />
                </TouchableOpacity>
              );
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default StudentsChatRooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#514E5A",
    marginTop: 200,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 75,
    height: 75,
    borderRadius: 100,
    overflow: "hidden",
  },

  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600",
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075E3",
    justifyContent: "center",
    alignItems: "center",
  },
});
