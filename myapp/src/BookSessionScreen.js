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

const BookSessionScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [status, setStatus] = useState("failed");

  const [data, setData] = useState({
    // day: route.params.day,
    date: route.params.date,
    hour: route.params.hour,
    // tutor: route.params.tutor,
    type: route.params.type,
    course: route.params.course,
  });

  // console.log("type", data.course.tutor.id);

  const onClick = () => {
    if (
      data.type === "In-person" ||
      (route.params.status && route.params.status === "success")
    ) {
      const session = {
        user_id: user.id,
        tutor_id: data.course.tutor.id,
        date: data.date,
        timeslots_id: data.hour.id,
        course_id: data.course.course_id,
        meeting_type: data.type,
        payment: data.course.rate,
      };

      axios
        .post("api/book/session", session)
        .then((response) => {
          console.log("i am here", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .post("api/chat/users", {
          users_id: user.id,
          tutor_id: data.course.tutor.id,
        })
        .then((response) => {
          console.log("Yesss Chatt", response.data);
        })
        .catch((error) => {
          console.log(error);
        });

      navigation.navigate("BookingSucceeded");
    } else {
      alert("Please select a payment method");
    }
    // const newData = data.courses.map((e) => {
    //   return {
    //     ...e,
    //     rate: data.rate,
    //   };
    // });
    // axios
    //   .post("api/tutor/courses", newData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // navigation.navigate("Courses");
  };

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
          <Text style={styles.payment}>Payment</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10, marginTop: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.beige,
            borderTopRightRadius: SIZES.radius * 1.5,
            borderBottomRightRadius: SIZES.radius * 1.5,
            // elevation: 5,
            marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.infoText}>Tutor Info</Text>
            </View>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#C8C8C8",
              }}
            />
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
                  <Image
                    source={
                      data.course.tutor.profile_photo_path
                        ? {
                            uri: `http://192.168.0.106:8000/${data.course.tutor.profile_photo_path}`,
                          }
                        : require("../assets/images/profile2.png")
                    }
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
                      color: COLORS.black,
                      fontWeight: "800",
                      textTransform: "capitalize",
                    }}
                  >
                    {data.course.tutor.firstname} {data.course.tutor.lastname}.
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "100",
                      color: "gray",
                    }}
                  >
                    {data.course.tutor.location}, Lebanon
                  </Text>
                </View>
                <View style={{ flexDirection: "row", top: 4 }}>
                  <Icon name="star" size={22} color={COLORS.yellow} />
                  <Text
                    style={{
                      color: COLORS.yellow,
                      fontSize: 18,
                      fontWeight: "bold",
                    }}
                  >
                    4
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingVertical: 5 }}>
        <View
          style={{
            backgroundColor: COLORS.beige,
            borderTopLeftRadius: SIZES.radius * 1.5,
            borderBottomLeftRadius: SIZES.radius * 1.5,
            // elevation: 5,
            marginLeft: SIZES.radius * 1.5,
            // marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.infoText}>Payment Method</Text>
            </View>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#C8C8C8",
              }}
            />
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {(route.params.status && route.params.status === "success") ||
                data.type === "In-person" ? (
                  <Image
                    source={icons.check}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                    }}
                  />
                ) : (
                  <FontAwesome
                    name="circle-thin"
                    size={26}
                    color={COLORS.black}
                  />
                )}

                {data.type === "Online" ? (
                  <View
                    style={{
                      left: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <FontAwesome name="credit-card" color="#000000" size={30} />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PaymentMethod");
                      }}
                    >
                      <Text style={{ left: 20, fontSize: 20, color: "blue" }}>
                        Credit Card
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      left: 10,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <FontAwesome name="dollar" color="#000000" size={25} />

                    <Text
                      style={{ left: 20, fontSize: 20, color: COLORS.black2 }}
                    >
                      Pay Cash
                    </Text>
                  </View>
                )}
              </View>
              {data.type === "Online" ? (
                <View
                  style={{
                    backgroundColor: COLORS.yellow,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SIZES.radius / 4,
                    padding: 5,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    You will only be charged at the end of your session
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      <View style={{ paddingVertical: 5 }}>
        <View
          style={{
            backgroundColor: COLORS.beige,
            borderTopRightRadius: SIZES.radius * 1.5,
            borderBottomRightRadius: SIZES.radius * 1.5,
            // elevation: 5,
            marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.infoText}>Total</Text>
            </View>
            <View
              style={{
                height: 0.5,
                width: "100%",
                backgroundColor: "#C8C8C8",
              }}
            />
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // marginBottom: 10,
              }}
            >
              <View>
                <Text
                  style={{ ...styles.text, fontSize: 20, fontWeight: "800" }}
                >
                  Total
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  LBP {data.course.rate}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ bottom: -100, marginHorizontal: 10 }}>
        <TouchableOpacity style={styles.next} onPress={() => onClick()}>
          <LinearGradient
            colors={[COLORS.darkpink, COLORS.primary]}
            style={styles.next}
          >
            <Text style={styles.next_text}>Confirm Booking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookSessionScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white2,
    paddingTop: 60,
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
  infoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: COLORS.black2,
  },
  payment: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.pink,
  },
  next: {
    marginHorizontal: 20,
    position: "absolute",
    alignItems: "center",
    top: 20,
    bottom: 0,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    width: "90%",
    height: 70,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.black3,
  },
});
