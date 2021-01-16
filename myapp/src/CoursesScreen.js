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
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import NumberFormat from "react-number-format";
import axios from "axios";

const CoursesScreen = ({ navigation }) => {
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

  const onChangeText = (item, text) => {
    const newData = courses.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          rate: text,
        };
      }
      return {
        ...e,
        rate: e.rate,
      };
    });
    setCourses(newData);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{
          paddingVertical: SIZES.padding,
          marginBottom: 60,
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <View>
                <LinearGradient
                  colors={["#FFFFFF", "#FFFFFF"]}
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
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          // marginBottom: 10,
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              ...styles.infoText,
                              marginVertical: 8,
                            }}
                          >
                            {item.course.name}
                          </Text>
                        </View>
                        {/* <View
                          style={{
                            // flexDirection: "row",
                            alignItems: "center",
                          }}
                        >
                          <View style={styles.action}>
                            <TextInput
                              // defaultValue={item.rate}
                              textContentType="telephoneNumber"
                              style={{ fontSize: 20, fontWeight: "bold" }}
                              // placeholder="Rate"
                              placeholderTextColor="#666"
                              onChangeText={(text) => onChangeText(item, text)}
                              underlineColorAndroid="transparent"
                            >
                              <NumberFormat
                                renderText={(text) => <Text>{text}</Text>}
                                value={item.rate}
                                displayType={"text"}
                                thousandSeparator={true}
                                // prefix={"LBP "}
                              />
                            </TextInput>
                          </View>
                          <Text style={{ ...styles.text, color: "#34495e" }}>
                            LBP/h
                          </Text>
                        </View> */}
                      </View>
                      <Text style={styles.text}>{item.course_description}</Text>
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
                          fontSize: 13,
                          fontWeight: "bold",
                          color: COLORS.white,
                        }}
                      >
                        <NumberFormat
                          renderText={(text) => <Text>{text}</Text>}
                          value={item.rate}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"LBP/h "}
                        />
                      </Text>
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </View>
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate("AddCourse")}
      >
        <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.button}>
          <Image
            source={icons.plus}
            resizeMode="contain"
            imageStyle={{ borderRadius: 16 }}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // backgroundColor: COLORS.white,
  },
  courses: { marginHorizontal: 20, marginVertical: 10, fontWeight: "100" },
  button: {
    height: 75,
    width: "100%",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    right: 25,
    bottom: 0,
    elevation: 10,
    justifyContent: "flex-end",
    height: 75,
    width: "20%",
    borderRadius: 50,
    marginVertical: 20,
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
  action: {
    flexDirection: "row",
    height: 40,
    borderRadius: SIZES.radius / 2,
    borderWidth: 1,
    marginHorizontal: 10,
    // marginVertical: 5,
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
