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
  Modal,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import moment from "moment";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";

const ViewSessionScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [data, setData] = useState({
    type: route.params.type,
    session: route.params.session,
  });
  const [addressInfo, setAddressInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    axios
      .get(`api/user/address?user_id=${data.session.tutor_id}`)
      .then((response) => {
        setAddressInfo(response.data);
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
              navigation.navigate("tutorSchedule");
            }}
          />
        </View>
        <View style={{ left: 20 }}>
          <Text style={styles.payment}>{data.type} Session</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 10, marginTop: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius * 1.5,
            borderBottomRightRadius: SIZES.radius * 1.5,
            elevation: 5,
            marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <Text style={styles.infoText}>Session Info</Text>
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
                      data.session.student_profile_photo_path
                        ? {
                            uri: `http://192.168.0.106:8000/${data.session.student_profile_photo_path}`,
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
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {data.session.course_name}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      color: COLORS.black,
                      fontWeight: "800",
                      textTransform: "capitalize",
                      width: "100%",
                    }}
                  >
                    {data.session.course_description[0].course_description}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      ...styles.text,
                      color: COLORS.gray,
                      fontWeight: "800",
                      textTransform: "capitalize",
                    }}
                  >
                    with {data.session.student_firstname}{" "}
                    {data.session.student_lastname}.
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
                    {moment(data.session.date).format("dddd, MMM DD")}
                    {" - "}
                    {data.session.hour}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.radius * 1.5,
            borderBottomLeftRadius: SIZES.radius * 1.5,
            elevation: 5,
            marginLeft: SIZES.radius * 1.5,
            // marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text
                  style={{
                    ...styles.infoText,
                  }}
                >
                  Total
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 18 }}>LBP {data.session.payment}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={{ paddingVertical: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopRightRadius: SIZES.radius * 1.5,
            borderBottomRightRadius: SIZES.radius * 1.5,
            elevation: 5,
            marginRight: SIZES.padding * 5,
          }}
        >
          <View style={{ padding: 20 }}>
            {data.session.meeting_type === "In-person" ? (
              <View
                style={{
                  marginBottom: 10,
                }}
              >
                <View>
                  <Text
                    style={{
                      ...styles.infoText,
                      fontSize: 17,
                    }}
                  >
                    {data.type === "Upcoming" ? (
                      <Text>Here's where you are going to meet</Text>
                    ) : (
                      <Text>Here's where you met</Text>
                    )}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MeetingAddress", {
                      addressInfo: addressInfo,
                    });
                  }}
                >
                  <Text style={{ fontSize: 18, color: "blue" }}>Address</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {data.type === "Upcoming" ? (
                  <View>
                    <Text style={styles.infoText}>
                      Meeting is online via zoom
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: COLORS.gray,
                        fontWeight: "800",
                      }}
                    >
                      Make sure to share with your student the zoom link for the
                      session
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.infoText}>
                      The meeting was online via zoom
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </View>

      {data.session.note ? (
        <View>
          <View style={{ paddingVertical: 10 }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                borderTopLeftRadius: SIZES.radius * 1.5,
                borderBottomLeftRadius: SIZES.radius * 1.5,
                elevation: 5,
                marginLeft: SIZES.radius * 1.5,
                // marginRight: SIZES.padding * 5,
              }}
            >
              <View style={{ padding: 20 }}>
                <View
                  style={{
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        ...styles.infoText,
                        fontSize: 16,
                        color: COLORS.black2,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: COLORS.yellow2 }}>Note:</Text>{" "}
                      {data.session.note ? data.session.note : note}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ViewSessionScreen;

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
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    color: COLORS.black2,
  },
  action: {
    borderRadius: 20,
    borderWidth: 1,
    // marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    // paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  textinput: {
    padding: 10,
    fontSize: 20,
    height: 150,
    fontStyle: "italic",
    textAlignVertical: "top",
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
