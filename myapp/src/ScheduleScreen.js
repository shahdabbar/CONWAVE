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
import { curveBasis } from "d3-shape";
import Moment from "moment";
import axios from "axios";

const ScheduleScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get(`api/user/sessions?tutor_id=${user.id}`)
      .then((response) => {
        // setSessions(response.data);
        setUpcoming(
          response.data.data
            ? response.data.data.filter(
                (e) => e.date >= Moment().format("YYYY-MM-DD")
              )
            : null
        );

        setPrevious(
          response.data.data
            ? response.data.data.filter(
                (e) => e.date < Moment().format("YYYY-MM-DD")
              )
            : null
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show]);

  const Upcoming = () => {
    return (
      <View>
        {upcoming ? (
          <FlatList
            data={upcoming}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              marginBottom: 60,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    elevation: 5,
                    borderLeftColor: COLORS.pink,
                    borderLeftWidth: 4,
                    marginHorizontal: SIZES.padding * 2,
                    marginVertical: SIZES.padding,
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
                          <Image
                            source={
                              item.student_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.107:8000/${item.student_profile_photo_path}`,
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
                              color: COLORS.yellow2,
                              fontWeight: "bold",
                              fontSize: 20,
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            {item.course_name}
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
                            With {item.student_firstname}{" "}
                            {item.student_lastname}.
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              fontWeight: "800",
                              color: "gray",
                              width: "90%",
                              marginVertical: 1,
                            }}
                          >
                            {Moment(item.date).format("dddd, MMM DD")}
                            {" - "}
                            {item.hour}
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
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        navigation.navigate("ViewSessionDetails", {
                          type: "Upcoming",
                          session: item,
                        });
                      }}
                    >
                      <View>
                        <FontAwesome5
                          name="arrow-right"
                          size={16}
                          color={COLORS.pink}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "800",
                          color: COLORS.pink,
                          alignSelf: "center",
                          left: 10,
                        }}
                      >
                        View Session Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };

  const Previous = () => {
    return (
      <View>
        {previous ? (
          <FlatList
            data={previous}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              marginBottom: 60,
            }}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomRightRadius: SIZES.radius,
                    elevation: 5,
                    borderLeftColor: COLORS.yellow2,
                    borderLeftWidth: 4,
                    marginHorizontal: SIZES.padding * 2,
                    marginVertical: SIZES.padding,
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
                          <Image
                            source={
                              item.student_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.107:8000/${item.student_profile_photo_path}`,
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
                              color: COLORS.yellow2,
                              fontWeight: "bold",
                              fontSize: 20,
                              textTransform: "capitalize",
                              marginVertical: 1,
                            }}
                          >
                            {item.course_name}
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
                            With {item.student_firstname}{" "}
                            {item.student_lastname}.
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              fontWeight: "800",
                              color: "gray",
                              width: "90%",
                              marginVertical: 1,
                            }}
                          >
                            {Moment(item.date).format("dddd, MMM DD")}
                            {" - "}
                            {item.hour}
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
                    <TouchableOpacity
                      style={{
                        marginVertical: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        navigation.navigate("ViewSessionDetails", {
                          type: "Previous",
                          session: item,
                        });
                      }}
                    >
                      <View>
                        <FontAwesome5
                          name="arrow-right"
                          size={16}
                          color={COLORS.pink}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "800",
                          color: COLORS.pink,
                          alignSelf: "center",
                          left: 10,
                        }}
                      >
                        View Session Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          left: 20,
        }}
      >
        <View>
          <Ionicon
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="gray"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View style={{ left: 20 }}>
          <Text style={styles.sessions}>Sessions</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statsBox}
          onPress={() => {
            setShow(!show);
          }}
        >
          <Text
            style={{
              ...styles.text,
              ...styles.subText,
              color: show ? COLORS.primary : COLORS.black2,
              fontWeight: show ? "bold" : "normal",
              fontSize: show ? 22 : 20,
              textTransform: show ? "uppercase" : "none",
              textDecorationLine: show ? "underline" : "none",
            }}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}
          style={{
            ...styles.statsBox,
            borderColor: "#DFDBC8",
            borderLeftWidth: 2,
          }}
        >
          <Text
            style={{
              ...styles.text,
              ...styles.subText,

              color: !show ? COLORS.yellow2 : COLORS.black2,
              fontWeight: !show ? "bold" : "normal",
              fontSize: !show ? 22 : 20,
              textTransform: !show ? "uppercase" : "none",
              textDecorationLine: !show ? "underline" : "none",
            }}
          >
            Previous
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingVertical: 10, marginBottom: 70 }}>
        {/* <FlatList ListHeaderComponent= /> */}
        {show ? Upcoming() : Previous()}
      </View>
    </View>
  );
};

export default ScheduleScreen;

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
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 22,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
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
