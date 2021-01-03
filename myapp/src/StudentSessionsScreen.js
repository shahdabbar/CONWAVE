import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";

const StudentSessionsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios
      .get(`api/user/sessions?user_id=${user.id}`)
      .then((response) => {
        setSessions(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("BookTime");
            }}
          />
        </View>
        <View style={{ left: 20 }}>
          <Text style={styles.sessions}>Sessions</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10, marginTop: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
            elevation: 2,
            borderLeftColor: COLORS.pink,
            borderLeftWidth: 4,
            marginHorizontal: SIZES.padding * 2,
          }}
        >
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <View>
                <View style={styles.profileImage}>
                  {/* source=
                  {data.course.tutor.profile_photo_path
                    ? {
                        uri: `http://192.168.0.106:8000/${data.course.tutor.profile_photo_path}`,
                      }
                    : require("../assets/images/profile2.png")} */}
                  <Image
                    source={require("../assets/images/profile2.png")}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View style={{ left: 12 }}>
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      color: COLORS.yellow2,
                      fontWeight: "bold",
                      fontSize: 20,
                      textTransform: "capitalize",
                      marginVertical: 1,
                    }}
                  >
                    Excel for beginners
                    {/* {data.course.tutor.firstname} {data.course.tutor.lastname}. */}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      color: COLORS.black,
                      fontWeight: "800",
                      textTransform: "capitalize",
                      marginVertical: 1,
                    }}
                  >
                    With Shahd Al-Abbar
                    {/* {data.course.tutor.firstname} {data.course.tutor.lastname}. */}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      fontWeight: "100",
                      color: "gray",
                      width: "90%",
                      marginVertical: 1,
                    }}
                  >
                    Sunday, Jun 03 - 19:30 till 20:30
                    {/* {data.course.tutor.location}, Lebanon */}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#C8C8C8",
              }}
            />
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "800",
                  color: COLORS.pink,
                  alignSelf: "center",
                }}
              >
                View Booking
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StudentSessionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  sessions: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.black2,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
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
    elevation: 5,
  },
  text: {
    fontSize: 18,
    color: COLORS.black2,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  //   text: {
  //     margin: 30,
  //     fontSize: 30,
  //     fontWeight: "bold",
  //   },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
