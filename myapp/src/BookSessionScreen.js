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

  const [data, setData] = useState({
    // day: route.params.day,
    date: route.params.date,
    hour: route.params.hour,
    // tutor: route.params.tutor,
    course: route.params.course,
  });

  const onClick = () => {
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
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <FontAwesome name="credit-card" color="#000000" size={30} />
                <Text style={{ left: 20, fontSize: 20, color: "blue" }}>
                  Credit Card
                </Text>
              </View>
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
      <View style={{ marginTop: 5, marginHorizontal: 10 }}>
        <TouchableOpacity onPress={() => onClick()}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.yellow2]}
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
    fontSize: 25,
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    width: "100%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
    // elevation: 5,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
