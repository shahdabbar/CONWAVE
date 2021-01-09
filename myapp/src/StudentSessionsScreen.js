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
  Modal,
  Animated,
  Easing,
  ColorPropType,
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
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import moment from "moment";

import axios from "axios";

const StudentSessionsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [upcoming, setUpcoming] = useState([]);
  const [previous, setPrevious] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const [sessions, setSessions] = useState(upcoming);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState({
    tutor_id: "",
    course_id: "",
  });
  const [state, setState] = useState({
    rating: 0,
    animation: new Animated.Value(1),
  });
  const [show, setShow] = useState(true);

  useEffect(() => {
    axios
      .get(`api/user/sessions?user_id=${user.id}`)
      .then((response) => {
        setUpcoming(
          response.data.data
            ? response.data.data.filter(
                (e) => e.date >= moment().format("YYYY-MM-DD")
              )
            : null
        );

        setPrevious(
          response.data.data
            ? response.data.data.filter(
                (e) => e.date < moment().format("YYYY-MM-DD")
              )
            : null
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [show, sessions]);

  let stars = [];
  for (let x = 1; x <= 5; x++) {
    stars.push({
      x: x,
      name: "star",
      color: COLORS.yellow,
      size: 32,
      style: { marginHorizontal: 6 },
    });
  }

  const rate = (star) => {
    setState({ ...state, rating: star });
  };

  const animate = () => {
    Animated.timing(state.animation, {
      toValue: 2,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      state.animation.setValue(1);
    });
  };

  const animateScale = state.animation.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 1.4, 1],
  });

  const animateOpacity = state.animation.interpolate({
    inputRange: [1, 1.2, 2],
    outputRange: [1, 0.5, 1],
  });

  const animateWobble = state.animation.interpolate({
    inputRange: [1, 1.25, 1.75, 2],
    outputRange: ["0deg", "-3deg", "3deg", "0deg"],
  });

  const animationStyle = {
    transform: [{ scale: animateScale }, { rotate: animateWobble }],
    opacity: animateOpacity,
  };

  function onSubmit() {
    let data = {
      comment: comment,
      rating: state.rating,
      user_id: user.id,
      tutor_id: id.tutor_id,
      course_id: id.course_id,
    };
    axios
      .post("api/user/rating", data)
      .then((response) => {
        console.log("success?", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
                    elevation: 2,
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
                              item.tutor_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.106:8000/${item.tutor_profile_photo_path}`,
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
                            With {item.tutor_firstname} {item.tutor_lastname}.
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
                            {moment(item.date).format("dddd, MMM DD")}
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
                        navigation.navigate("ViewSession", {
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
                        View Booking
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
                    elevation: 2,
                    borderLeftColor: COLORS.yellow2,
                    borderLeftWidth: 4,
                    marginHorizontal: SIZES.padding * 2,
                    marginVertical: SIZES.padding,
                  }}
                >
                  <View style={{ position: "absolute", top: 5, right: 10 }}>
                    {item.review.lenght < 1 ? (
                      <Text
                        style={{
                          color: COLORS.yellow,
                          right: 5,
                          fontSize: 16,
                        }}
                        onPress={() => {
                          setId({
                            ...id,
                            tutor_id: item.tutor_id,
                            course_id: item.course_id,
                          });
                          setModal(true);
                        }}
                      >
                        Rate
                      </Text>
                    ) : (
                      <View>
                        <Text>{item.review.rating}</Text>
                      </View>
                    )}
                  </View>
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
                              item.tutor_profile_photo_path
                                ? {
                                    uri: `http://192.168.0.106:8000/${item.tutor_profile_photo_path}`,
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
                            With {item.tutor_firstname} {item.tutor_lastname}.
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
                            {moment(item.date).format("dddd, MMM DD")}
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
                        navigation.navigate("ViewSession", {
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
                        View Booking
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
      <Modal visible={modal} transparent={true} animationType="fade">
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "40%",
              marginHorizontal: 10,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
              paddingBottom: 20,
              // height: 300,
              // E0DFE1,
            }}
          >
            <View>
              <View style={{ marginVertical: 20 }}>
                <Text style={styles.infoText}>Enjoyed the session?</Text>
                <Text style={{ fontSize: 15, color: COLORS.gray, left: 10 }}>
                  Please rate this tutor
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                {stars.map((e) => {
                  return (
                    <TouchableOpacity
                      key={e.x}
                      onPress={() => {
                        rate(e.x), animate();
                      }}
                    >
                      <Animated.View
                        style={e.x <= state.rating ? animationStyle : ""}
                      >
                        <FontAwesome
                          name={e.x <= state.rating ? e.name : "star-o"}
                          size={e.size}
                          color={e.color}
                          style={e.style}
                        />
                      </Animated.View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {addComment ? (
                <View>
                  <View style={styles.action}>
                    <TextInput
                      style={styles.textinput}
                      placeholder="Leave comment"
                      placeholderTextColor="#666"
                      multiline={true}
                      numberOfLines={4}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => {
                        setComment(text);
                      }}
                    />
                  </View>
                </View>
              ) : (
                <TouchableOpacity onPress={() => setAddComment(!addComment)}>
                  <Text style={styles.next_text}>Leave Comment</Text>
                </TouchableOpacity>
              )}

              <View style={styles.statsContainer}>
                <TouchableOpacity
                  style={styles.statsBox}
                  onPress={() => {
                    setModal(false);
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      color: COLORS.blue,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    onSubmit(), setModal(false);
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
                      color: COLORS.gray,
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
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

      <View style={{ paddingVertical: 10, marginTop: 10 }}>
        {show ? <>{Upcoming()}</> : <>{Previous()}</>}
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
    color: COLORS.black2,
    left: 5,
    // alignSelf: "center",
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
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 35,
    width: "50%",
    height: 50,
    borderColor: "#ffd200",
    borderWidth: 2,
    alignSelf: "center",
  },
  next_text: {
    fontSize: 16,
    color: COLORS.gray,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  // action: {
  //   flexDirection: "row",
  //   marginTop: 10,
  //   marginBottom: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "gray",
  //   paddingBottom: 5,
  //   // width: 100,
  // },
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
  //   text: {
  //     margin: 30,
  //     fontSize: 30,
  //     fontWeight: "bold",
  //   },
});
