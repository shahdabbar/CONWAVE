import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { Video } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthProvider";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import Star from "react-native-star-view";
import axios from "axios";
import NumberFormat from "react-number-format";
import moment from "moment";

const Tab = createMaterialTopTabNavigator();

function MyTabs({ route, navigation }) {
  const [item, setItem] = useState(route.params.item);
  const [type, seType] = useState(route.params.type);
  const [course_id, setcourse_id] = useState(route.params.course_id);

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      tabBarOptions={{
        labelStyle: { fontSize: 16 },
        indicatorStyle: { backgroundColor: COLORS.pink },
      }}
    >
      <Tab.Screen
        name="Profile"
        component={TutorProfileScreen}
        initialParams={{ item: item, type: type, course_id: course_id }}
      />
      <Tab.Screen
        name="Courses"
        component={Courses}
        initialParams={{ item: item }}
      />
      <Tab.Screen
        name="Reviews"
        component={Reviews}
        initialParams={{ course_id: course_id, item: item }}
      />
    </Tab.Navigator>
  );
}

export default MyTabs;

const Courses = ({ route, navigation }) => {
  const [courses, setCourses] = useState([]);
  const [item, setItem] = useState(route.params.item);

  useEffect(() => {
    axios
      .get(`api/user/tutor/courses?user_id=${item.user_id}`)
      .then((response) => {
        setCourses(response.data);
        // console.log("couuuu", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          padding: 20,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              ...FONTS.h2,
              fontWeight: "bold",
              color: COLORS.black,
            }}
          >
            Courses
          </Text>
        </View>
        {courses.map((e) => (
          <View style={{ marginHorizontal: 25 }} key={e.id}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: "70%" }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {e.course.name}
                    {", "}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "400" }}>
                  {e.course_description}
                </Text>
              </View>
              <View style={styles.action}>
                <NumberFormat
                  renderText={(text) => <Text>{text}</Text>}
                  value={item.rate}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={" LBP "}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={{ marginBottom: 50 }}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>Videos</Text>
          {/* <Text style={{ ...FONTS.h3, color: "red" }}>View all</Text> */}
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.mediaVideoContainer}>
            <Video
              source={require("../../assets/images/video3.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={styles.image}
            />
          </View>
          <View style={styles.mediaVideoContainer}>
            <Video
              source={require("../../assets/images/video1.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={styles.image}
            />
          </View>
          <View style={styles.mediaVideoContainer}>
            <Video
              source={require("../../assets/images/video4.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={styles.image}
            />
          </View>
          <View style={styles.mediaVideoContainer}>
            <Video
              source={require("../../assets/images/se_intro.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay={false}
              isLooping={false}
              useNativeControls
              style={styles.image}
            />
          </View>
        </ScrollView>
        <View style={styles.mediaCount}>
          <Text
            style={[
              styles.text,
              { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
            ]}
          >
            4
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontSize: 14,
                color: "#DFD8C8",
                textTransform: "uppercase",
              },
            ]}
          >
            Videos
          </Text>
        </View>
      </View>
    </View>
  );
};

const Reviews = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [reviews, setReviews] = useState([]);
  const [sumRatings, setsumRatings] = useState([]);
  const [item, setItem] = useState(route.params.item);

  useEffect(() => {
    // get all reviews
    axios
      .get(
        `api/user/rating?tutor_id=${route.params.item.user_id}&course_id=${route.params.course_id}`
      )
      .then((response) => {
        setReviews(response.data[0]);
        setsumRatings(response.data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let stars = [];
  for (let x = 1; x <= 5; x++) {
    stars.push({
      x: x,
      name: "star",
      color: COLORS.yellow,
      size: 20,
      style: { marginHorizontal: 2 },
    });
  }

  function status(rating) {
    if (rating >= 5) {
      return "Excellent";
    } else if (rating >= 4) {
      return "Very Good";
    } else if (rating >= 3) {
      return "Good";
    } else if (rating >= 2) {
      return "Bad";
    } else if (rating >= 1) {
      return "Very Bad";
    }
  }

  let sum = 0;
  let num = 0;
  sumRatings.map((e) => {
    (num = num + e["count(rating)"]),
      (sum = sum + e["rating"] * e["count(rating)"]);
  });

  console.log("sum", sum, num);

  function flatlist() {
    return (
      <View>
        <View style={{ paddingVertical: 16, marginHorizontal: 20 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius / 2,
              // borderWidth: 2,
              // borderColor: COLORS.beige,
              elevation: 10,
            }}
          >
            <View
              style={{
                marginVertical: 10,
                marginHorizontal: 16,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={{
                    ...styles.starText,
                    color: COLORS.orange,
                    bottom: 3,
                  }}
                >
                  {sum / num}
                </Text>
                <Star score={sum / num} style={styles.starStyle} />
              </View>

              <View>
                <Text style={styles.name}>{status(sum / num)}</Text>
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    marginVertical: 2,
                    color: COLORS.lightgray,
                  }}
                >
                  Based on {num} ratings
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={{ fontSize: 20, left: 30, color: COLORS.lightgray }}>
            Reviews
          </Text>
        </View>
        <FlatList
          data={reviews}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingVertical: 10, marginHorizontal: 20 }}>
                <View
                  style={{
                    backgroundColor: COLORS.white,
                    borderRadius: SIZES.radius / 2,
                    // borderWidth: 2,
                    // borderColor: COLORS.beige,
                    elevation: 10,
                  }}
                >
                  <View
                    style={{
                      marginVertical: 10,
                      marginHorizontal: 16,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          {stars.map((e) => {
                            return (
                              <View
                                key={e.x}
                                onPress={() => {
                                  rate(e.x);
                                }}
                              >
                                <FontAwesome
                                  name={e.x <= item.rating ? e.name : "star-o"}
                                  size={e.size}
                                  color={e.color}
                                  style={e.style}
                                />
                              </View>
                            );
                          })}

                          {/* <Star score={item.rating} style={styles.starStyle} /> */}
                        </View>
                        <View style={{ left: 3, bottom: 3 }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: "gray",
                              marginVertical: 2,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "bold",
                              }}
                            >
                              .
                            </Text>
                            By {item.users.firstname} {item.users.lastname}
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                              .
                            </Text>
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text
                          style={{
                            fontSize: 12,
                            color: "gray",
                            marginVertical: 2,
                          }}
                        >
                          {moment(item.created_at).format("MMM DD, YYYY")}
                        </Text>
                      </View>
                    </View>
                    <View style={{ marginVertical: 3 }}>
                      <Text style={styles.name}>{status(item.rating)}</Text>
                    </View>

                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginVertical: 2,
                        }}
                      >
                        {item.comment}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  }
  // style={{ marginBottom: 70 }}
  return (
    <View style={styles.container}>
      <View>
        <FlatList ListHeaderComponent={flatlist} />
      </View>
    </View>
  );
};

function TutorProfileScreen({ route, navigation }) {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [tutor, setTutor] = useState([]);
  const [item, setItem] = useState(route.params.item);
  const [type, seType] = useState(route.params.type);
  const [sumRatings, setsumRatings] = useState([]);

  useEffect(() => {
    // get user tutor
    axios
      .get(`api/user/tutor?user_id=${item.user_id}`)
      .then((response) => {
        setTutor(response.data.data[0]);
        console.log(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `api/tutor/ratings?tutor_id=${item.user_id}&course_id=${route.params.course_id}`
      )
      .then((response) => {
        setsumRatings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let sum = 0;
  let num = 0;
  sumRatings.map((e) => {
    (num = num + e["count(rating)"]),
      (sum = sum + e["rating"] * e["count(rating)"]);
  });

  return (
    <View style={styles.container}>
      {tutor.length != 0 ? (
        <View>
          <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={{ marginBottom: 100 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginHorizontal: 30,
                  marginTop: 20,
                }}
              >
                <View style={styles.infoContainer}>
                  <Text
                    style={{
                      ...styles.infoText,
                      color: COLORS.black,
                      textTransform: "capitalize",
                    }}
                  >
                    {tutor.firstname}
                  </Text>
                  <Text
                    style={{
                      ...styles.infoText,
                      color: COLORS.black,
                      textTransform: "capitalize",
                    }}
                  >
                    {tutor.lastname}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "100",
                      color: "gray",
                    }}
                  >
                    {tutor.location} Lebanon
                  </Text>
                  {num > 0 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        top: 4,
                        // justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Icon name="star" size={22} color={COLORS.yellow} />
                      <Text
                        style={{
                          color: COLORS.yellow,
                          fontSize: 18,
                          fontWeight: "bold",
                        }}
                      >
                        {Number((sum / num).toFixed(1))}
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View style={styles.wrapper}>
                  <View style={styles.profileImage}>
                    <Image
                      source={
                        item.tutor.profile_photo_path
                          ? {
                              uri: `http://192.168.0.107:8000/${item.tutor.profile_photo_path}`,
                            }
                          : require("../../assets/images/profile2.png")
                      }
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <TouchableOpacity style={styles.statsBox}>
                  <Text style={{ ...styles.text, fontSize: 24 }}>
                    {tutor.courses.length}
                  </Text>
                  <Text style={{ ...styles.text, ...styles.subText }}>
                    Courses Offering
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    ...styles.statsBox,
                    borderColor: "#DFDBC8",
                    borderLeftWidth: 1,
                  }}
                >
                  <Text style={{ ...styles.text, fontSize: 24 }}>
                    {/* {tutor[0].profile.students_tutored} */}7
                  </Text>
                  <Text style={{ ...styles.text, ...styles.subText }}>
                    Students Tutored
                  </Text>
                </View>
              </View>

              <View style={{ marginHorizontal: 0, marginTop: 35 }}>
                <LinearGradient
                  colors={[COLORS.white, COLORS.white]}
                  style={{
                    borderRadius: SIZES.radius,
                    elevation: 10,

                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <LinearGradient
                    colors={[COLORS.yellow2, COLORS.yellow2]}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      height: 50,
                      width: SIZES.width * 0.3,
                      // borderTopRightRadius: SIZES.radius,
                      borderBottomLeftRadius: SIZES.radius,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "bold",
                          color: COLORS.black3,
                        }}
                      >
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
                  <View style={{ padding: 5 }}>
                    <View>
                      <View style={{ marginBottom: 10 }}>
                        <Text style={{ ...styles.content_text }}>
                          Why hire me
                        </Text>
                      </View>
                      <View>
                        <Text style={{ fontSize: 17, fontWeight: "800" }}>
                          {tutor.bio}
                        </Text>
                      </View>
                    </View>

                    <View style={{ marginBottom: 20, marginTop: 16 }}>
                      <Text style={{ ...styles.content_text }}>
                        Educational Background
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          width: "50%",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="university"
                          size={20}
                          color={COLORS.black3}
                        />

                        <Text
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          {tutor.university}
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "50%",
                          justifyContent: "space-around",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesome
                          name="graduation-cap"
                          size={22}
                          color={COLORS.black3}
                        />

                        <Text
                          style={{
                            fontSize: 20,
                            textAlign: "center",
                          }}
                        >
                          {tutor.major}
                        </Text>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 20,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() =>
                navigation.navigate("BookTime", {
                  course: item,
                  type: type,
                })
              }
            >
              <LinearGradient
                colors={[COLORS.black3, COLORS.black3]}
                style={styles.next}
              >
                <Text
                  style={{
                    ...styles.infoText,
                    fontSize: 20,
                    textAlign: "center",
                    color: COLORS.white,
                    textTransform: "uppercase",
                  }}
                >
                  Book a session -
                  <NumberFormat
                    renderText={(text) => <Text>{text}</Text>}
                    value={item.rate}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={" LBP "}
                  />
                  <Text style={{ textTransform: "none" }}>/h</Text>
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: "white",
  },
  wrapper: {
    alignSelf: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    width: "80%",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 30,
  },
  next: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    width: "100%",
    height: 70,
    alignSelf: "center",
  },
  starStyle: {
    width: 120,
    height: 25,
    marginBottom: 5,
    left: 10,
  },
  action: {
    borderRadius: SIZES.radius / 2,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  content_text: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  starText: {
    fontWeight: "bold",
    fontSize: 24,
  },
  infoText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    color: "#202020",
  },

  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },

  text: {
    // fontFamily: "HelveticaNeue",
    color: "#41444B",
  },
  subText: {
    fontSize: 14,
    color: COLORS.black,
    // color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    overflow: "hidden",
    elevation: 10,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 28,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 22,
    left: 20,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 5,
    right: 0,
    padding: 4,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    // alignSelf: "center",
    // alignItems: "center",
    marginTop: 5,
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
  mediaVideoContainer: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  // 41444B
  mediaCount: {
    backgroundColor: "#a06262",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 16,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 14,
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "center",
    left: 10,
    marginBottom: 16,
  },
  activityIndicator: {
    // backgroundColor: "#CABFAB",
    backgroundColor: COLORS.pink,
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
