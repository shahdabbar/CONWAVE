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
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
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
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import axios from "axios";
import { block, color } from "react-native-reanimated";
import NumberFormat from "react-number-format";

const SearchTutorsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [tutors, setTutors] = useState([]);
  const [tutorsType, setTutorsType] = useState([]);

  const [data, setData] = useState({
    course: route.params.course,
    type: route.params.type,
  });

  useEffect(() => {
    axios
      .get(`api/course/rating?course_id=${data.course.id}`)
      .then((response) => {
        console.log("coursessssssssssssssss", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get all tutor courses
    axios
      .get(`api/course/tutors?course_id=${data.course.id}`)
      .then((response) => {
        setTutors(response.data);
        // console.log("course", response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // all meeting type
    axios
      .get(`api/meetingtype/tutors?type=${data.type}`)
      .then((response) => {
        setTutorsType(response.data);
        // console.log("meetingtype", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filtertutors = tutors.filter((e) => {
    return (
      tutorsType.filter((el) => {
        return el.user_id === e.user_id;
      }).length != 0
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            // color="gray"
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("SessionType");
            }}
          />
          <View style={{ left: 10 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {data.type === "In-person" ? (
                <View style={{ left: 10 }}>
                  <Text style={{ ...styles.infoText, color: COLORS.pink }}>
                    {data.type}
                  </Text>
                </View>
              ) : (
                <View style={{ left: 10 }}>
                  <Text style={{ ...styles.infoText, color: COLORS.pink }}>
                    {data.type}
                  </Text>
                </View>
              )}

              <View style={{ left: 20 }}>
                <Text style={styles.infoText}>Tutors</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View>
        <FlatList
          data={filtertutors}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
            marginBottom: 60,
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <TouchableOpacity
                    style={{
                      borderTopRightRadius: SIZES.radius,
                      borderBottomLeftRadius: SIZES.radius,
                      marginHorizontal: 10,
                      elevation: 5,
                      marginBottom: 20,
                    }}
                    onPress={() => {
                      navigation.navigate("TutorProfile", {
                        item: item,
                        type: data.type,
                        course_id: data.course.id,
                      });
                    }}
                  >
                    <LinearGradient
                      colors={[COLORS.beige, COLORS.beige]}
                      style={{
                        borderTopRightRadius: SIZES.radius,
                        borderBottomLeftRadius: SIZES.radius,
                        padding: 5,
                      }}
                    >
                      <LinearGradient
                        colors={[COLORS.primary, COLORS.yellow]}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          height: 50,
                          width: SIZES.width * 0.3,
                          backgroundColor: COLORS.yellow,
                          borderTopRightRadius: SIZES.radius,
                          borderBottomLeftRadius: SIZES.radius,
                          alignItems: "center",
                          justifyContent: "center",
                          ...styles.shadow,
                        }}
                      >
                        <View>
                          <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                            <NumberFormat
                              renderText={(text) => <Text>{text}</Text>}
                              value={item.rate}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={" LBP "}
                            />
                          </Text>
                        </View>
                      </LinearGradient>
                      <View>
                        <View style={{ ...styles.infoContent }}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginBottom: 10,
                            }}
                          >
                            <View>
                              <View style={styles.profileImage}>
                                <Image
                                  source={
                                    item.tutor.profile_photo_path
                                      ? {
                                          uri: `http://192.168.0.107:8000/${item.tutor.profile_photo_path}`,
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
                                    ...styles.infoText,
                                    color: COLORS.black,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {item.tutor.firstname}{" "}
                                  {item.tutor.lastname.charAt(0)}.
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
                                  {item.tutor.location}, Lebanon
                                </Text>
                              </View>
                              <View style={{ flexDirection: "row", top: 4 }}>
                                <Icon
                                  name="star"
                                  size={22}
                                  color={COLORS.yellow}
                                />
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
                          <View style={{ paddingLeft: 10 }}>
                            <Text style={styles.text}>
                              {item.course_description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default SearchTutorsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },

  headerContent: {
    marginHorizontal: 10,
    marginVertical: 20,
    fontWeight: "100",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: "hidden",
    elevation: 50,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  button: {
    height: 75,
    width: "100%",
    borderColor: "#ffd200",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    // elevation: 5,
    position: "absolute",
    alignSelf: "flex-end",
  },
  buttonContainer: {
    height: 75,
    width: "20%",
    left: 300,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  infoContent: {
    margin: 10,
  },
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#202020",
  },
  action: {
    flexDirection: "row",
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderColor: "#ff01ff",
    paddingHorizontal: 5,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  DarkOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 270,
    backgroundColor: "#000",
    opacity: 0.5,
    borderBottomRightRadius: 65,
  },
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
    height: 60,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  searchContainer: {
    paddingTop: 100,
    paddingLeft: 16,
  },
  userGreet: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
  userText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "normal",
  },

  textSection: {
    fontSize: 22,
    fontWeight: "bold",
  },
  imageOverlay: {
    width: 150,
    height: 200,
    marginRight: 8,
    borderRadius: 30,
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.5,
  },
  imageLocationIcon: {
    position: "absolute",
    marginTop: 5,
    left: 14,
    bottom: 12,
  },
  imageText: {
    position: "absolute",
    color: "#fff",
    marginTop: 4,
    fontSize: 14,
    left: 34,
    bottom: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 20,
  },
});
