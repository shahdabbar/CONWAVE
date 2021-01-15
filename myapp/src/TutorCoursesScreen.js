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
import axios from "axios";

const TutorCourses = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // get all tutor courses
    axios
      .get("api/tutor/courses")
      .then((response) => {
        setCourses(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={courses}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingVertical: SIZES.padding * 2,
          }}
          renderItem={({ item }) => {
            return (
              <View>
                <View>
                  <LinearGradient
                    colors={[COLORS.white, COLORS.white]}
                    style={{
                      borderRadius: SIZES.radius,
                      borderColor: COLORS.beige,
                      borderWidth: 2,
                      elevation: 5,
                      padding: 5,
                      marginHorizontal: 20,
                      marginBottom: 20,
                    }}
                  >
                    <View>
                      <View style={{ ...styles.infoContent }}>
                        <View style={{ marginBottom: 10 }}>
                          <View>
                            <Text style={styles.infoText}>
                              {item.course.name}
                            </Text>
                          </View>
                        </View>
                        <Text style={styles.text}>
                          {item.course_description}
                        </Text>

                        <View
                          style={{
                            marginVertical: 10,
                          }}
                        >
                          <View
                            style={{
                              height: 0.3,
                              width: "100%",
                              backgroundColor: "#C8C8C8",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        // position: "absolute",
                        marginHorizontal: 20,
                        marginVertical: 5,
                        bottom: 0,
                        right: 0,
                        flexDirection: "row",
                        alignItems: "center",
                        // justifyContent: "flex-end",
                        justifyContent: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("Reviews", {
                          tutor_id: item.user_id,
                          course_id: item.course_id,
                        })
                      }
                    >
                      <Text
                        style={{
                          fontSize: 19,
                          fontWeight: "800",
                          color: COLORS.pink,
                          alignSelf: "center",
                        }}
                      >
                        Students reviews
                      </Text>
                      <View>
                        <FontAwesome5
                          name="arrow-right"
                          size={16}
                          style={{ left: 10 }}
                          color={COLORS.pink}
                        />
                      </View>
                    </TouchableOpacity>
                    <LinearGradient
                      colors={[COLORS.primary, COLORS.yellow2]}
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
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: "bold",
                            color: COLORS.white,
                          }}
                        >
                          LBP {item.rate}
                        </Text>
                      </View>
                    </LinearGradient>
                  </LinearGradient>
                </View>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default TutorCourses;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  courses: { marginHorizontal: 20, marginVertical: 10, fontWeight: "100" },
  button: {
    height: 75,
    width: "100%",
    borderColor: "#ffd200",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    elevation: 5,
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
    bottom: 60,
    alignSelf: "flex-end",
  },
  infoContent: {
    margin: 10,
  },
  infoText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
  },
  image: {
    borderBottomRightRadius: 65,
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
    elevation: 3,
  },
});
