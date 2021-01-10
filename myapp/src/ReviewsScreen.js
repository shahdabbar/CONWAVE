import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
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
import { COLORS, SIZES, FONTS, icons } from "./constants";
import Star from "react-native-star-view";
import axios from "axios";

const ReviewsScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [reviews, setReviews] = useState([]);
  const [sumRatings, setsumRatings] = useState([]);

  useEffect(() => {
    // get all reviews
    axios
      .get(
        `api/user/rating?tutor_id=${route.params.tutor_id}&course_id=${route.params.course_id}`
      )
      .then((response) => {
        setReviews(response.data[0]);
        setsumRatings(response.data[1]);
        // console.log("reviews", response.data[1]);
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
      size: 32,
      style: { marginHorizontal: 6 },
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
    (num = num + 1), (sum = sum + e["rating"] * e["count(rating)"]);
  });

  function flatlist() {
    return (
      <View>
        <View style={{ paddingVertical: 10, marginHorizontal: 20 }}>
          <View
            style={{
              backgroundColor: COLORS.white,
              borderRadius: SIZES.radius,
              borderWidth: 2,
              borderColor: COLORS.beige,
              elevation: 10,
            }}
          >
            <View
              style={{
                padding: 20,
              }}
            >
              <Star score={sum / num} style={styles.starStyle} />
              <View>
                <Text style={styles.name}>{status(sum / num)}</Text>
              </View>
              <View>
                <Text
                  style={{
                    ...styles.infoText,
                    marginVertical: 2,
                  }}
                >
                  Based on {num} ratings
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.text}>Reviews</Text>
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
                    borderRadius: SIZES.radius,
                    borderWidth: 2,
                    borderColor: COLORS.beige,
                    elevation: 10,
                  }}
                >
                  <View
                    style={{
                      padding: 20,
                    }}
                  >
                    <View>
                      <Text style={styles.name}>{status(item.rating)}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginVertical: 5,
                        marginHorizontal: 5,
                      }}
                    >
                      {stars.map((e) => {
                        return (
                          <View
                            key={e.x}
                            onPress={() => {
                              rate(e.x), animate();
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
                    </View>

                    <View>
                      <Text
                        style={{
                          ...styles.name,
                          marginVertical: 2,
                        }}
                      >
                        {item.users.firstname} {item.users.lastname}
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          ...styles.infoText,
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
              navigation.goBack();
            }}
          />
        </View>
        <View style={{ left: 20 }}>
          <Text style={styles.payment}>Reviews</Text>
        </View>
      </View>
      <View style={{ marginBottom: 70 }}>
        <FlatList ListHeaderComponent={flatlist} />
      </View>
    </View>
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
    paddingTop: 60,
  },
  header: {
    // backgroundColor: COLORS.lightGray4,
  },
  payment: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.pink,
  },
  starStyle: {
    width: 150,
    height: 30,
    marginBottom: 5,
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
    // backgroundColor: "gray",
    overflow: "hidden",
    elevation: 5,
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
    fontSize: 20,
    fontWeight: "normal",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
    color: "gray",
    left: 30,
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
    elevation: 10,
  },
});

//  <Star score={0} style={styles.starStyle} />
//       <Star score={0.5} style={styles.starStyle} />
//       <Star score={1} style={styles.starStyle} />
//       <Star score={2} style={styles.starStyle} />
//       <Star score={3} style={styles.starStyle} />
//       <Star score={3.5} style={styles.starStyle} />
//       <Star score={4} style={styles.starStyle} />
//       <Star score={4.2} style={styles.starStyle} />
//    <Star score={5} style={styles.starStyle} />;
