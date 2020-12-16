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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";

axios.defaults.baseURL = "http://10.0.2.2:8000";

const HomeScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const { user } = useContext(AuthContext);

  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [categories, setCategories] = useState(null);
  const [courses, setCourses] = useState(null);
  const [filterCourses, setFilterCourses] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [gallery, setgallery] = useState([
    {
      image: {
        uri:
          "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%27",
      },
      title: "Switzerland",
      key: "1",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      title: "New Zeland",
      key: "2",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/258196/pexels-photo-258196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      title: "Rome",
      key: "3",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%27",
      },
      title: "Tahiti",
      key: "4",
    },
  ]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    // get user name
    axios
      .get("api/user")
      .then((response) => {
        setName({
          ...name,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });

    // get all categories
    axios
      .get("api/categories")
      .then((response) => {
        setCategories(response.data);
        console.log(categories);
      })
      .catch((error) => {
        console.log(error.response);
      });

    // get all courses
    axios
      .get("api/courses")
      .then((response) => {
        setCourses(response.data);
        console.log("courses", courses);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const theme = useTheme();

  const onSelectCategory = (category) => {
    // filter courses
    console.log("cat", category);
    let coursesList = courses.filter(
      (course) => course.category_id === category.id
    );
    console.log("all", courses);
    setFilterCourses(coursesList);
    setSelectedCategory(category);
  };

  const onSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const Icon = (name) => {
    let icon = "";
    if (name === "Fitness") {
      icon = icons.fitness;
    } else if (name === "Cooking") {
      icon = icons.cooking;
    } else if (name === "Languages") {
      icon = icons.languages;
    } else if (name === "Computer") {
      icon = icons.computer;
    } else if (name === "Prep Tests") {
      icon = icons.test;
    }
    return icon;
  };

  function renderCategories() {
    return (
      <Animatable.View animation="bounceInLeft">
        <FlatList
          horizontal={true}
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingVertical: 10, paddingLeft: 16 }}>
                <TouchableOpacity
                  style={{
                    padding: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor:
                      selectedCategory?.id == item.id
                        ? COLORS.primary
                        : COLORS.white,
                    borderRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    // elevation: 10,
                    marginRight: SIZES.padding,
                    ...styles.shadow,
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  <View
                    style={{
                      width: 55,
                      height: 50,
                      borderRadius: 25,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor:
                        selectedCategory?.id == item.id
                          ? COLORS.white
                          : COLORS.lightGray,
                    }}
                  >
                    <Image
                      source={Icon(item.name)}
                      resizeMode="contain"
                      imageStyle={{ borderRadius: 16 }}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      marginHorizontal: 1,
                      marginTop: SIZES.padding,
                      fontWeight: "bold",
                      color:
                        selectedCategory?.id == item.id
                          ? COLORS.white
                          : COLORS.black,
                    }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Animatable.View>
    );
  }

  function renderCoursesList() {
    return (
      <Animatable.View animation="bounceInDown">
        {selectedCategory ? (
          <Animatable.View
            animation="pulse"
            style={{ padding: SIZES.padding * 2 }}
          >
            <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>Courses</Text>
          </Animatable.View>
        ) : null}
        <FlatList
          data={filterCourses}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectedCourse?.id == item.id ? "#DEE9FD" : COLORS.white,
                    borderRadius: SIZES.radius,
                    elevation: 10,
                    marginRight: SIZES.padding * 2,
                  }}
                  onPress={() => onSelectCourse(item)}
                >
                  <View
                    style={{
                      padding: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        marginHorizontal: 5,
                        marginTop: 4,
                        fontWeight:
                          selectedCourse?.id == item.id ? "bold" : "normal",
                        color:
                          selectedCourse?.id == item.id
                            ? "#155c47"
                            : COLORS.black,

                        ...FONTS.h2,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Image
                      source={icons.right}
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 44,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </Animatable.View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          source={require("../assets/images/bg10.jpg")}
          style={{ width: "100%", height: 270 }}
          imageStyle={styles.image}
        >
          <View style={styles.DarkOverlay}></View>
          <View style={styles.searchContainer}>
            <Text style={styles.userGreet}>
              Hi {name.firstname} {name.lastname},
            </Text>
            <Text style={styles.userText}>
              what do you want to learn today?
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.searchBox}
              placeholder="Search Category"
              placeholderTextColor="#666"
            ></TextInput>
            <Feather
              name="search"
              size={22}
              color="#666"
              style={{ position: "absolute", top: 30, right: 60, opacity: 0.6 }}
            />
          </View>
          <Feather
            name="menu"
            size={22}
            color="#fff"
            style={{ position: "absolute", top: 40, left: 16 }}
            onPress={() => navigation.openDrawer()}
          />
          <Feather
            name="bell"
            size={22}
            color="#fff"
            style={{ position: "absolute", top: 40, right: 30 }}
          />
        </ImageBackground>
      </View>
      <ScrollView>
        <Animatable.View
          animation="pulse"
          style={{ padding: SIZES.padding * 2 }}
        >
          <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>Main</Text>
          <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>Categories</Text>
        </Animatable.View>
        {renderCategories()}
        {renderCoursesList()}
        <Animatable.View animation="pulse" style={{ padding: 20 }}>
          <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>Top Tutors</Text>
        </Animatable.View>
        <View>
          <FlatList
            horizontal={true}
            data={gallery}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 10, paddingLeft: 16 }}>
                  <TouchableOpacity>
                    <Image
                      source={item.image}
                      style={{
                        width: 150,
                        marginRight: 8,
                        height: 250,
                        borderRadius: 30,
                      }}
                    />
                    <View style={styles.imageOverlay}></View>
                    <Feather
                      name="map-pin"
                      size={16}
                      color="white"
                      style={styles.imageLocationIcon}
                    />
                    <Text style={styles.imageText}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={{ marginBottom: 60 }}>
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.textSection}>Recently Viewed</Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", color: "#ff2600" }}
            >
              View All
            </Text>
          </View>
          <Image
            source={require("../assets/images/photo.jpeg")}
            style={{
              width: "92%",
              height: 250,
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
          <View style={{ position: "absolute", bottom: 0, padding: 16 }}>
            <View style={{ flexDirection: "row" }}>
              <Feather
                name="map-pin"
                color="white"
                size={20}
                style={{ marginLeft: 10, position: "relative", top: 4 }}
              />
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontWeight: "normal",
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}
              >
                Venice
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: "white",
                fontWeight: "normal",
                marginBottom: 4,
                opacity: 0.8,
                marginLeft: 16,
              }}
            >
              Venice, the capital of northen Italy's Veneto Region in the
              Adriatic Sea
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  image: {
    borderBottomRightRadius: 65,
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
  searchBox: {
    marginTop: 16,
    backgroundColor: "#fff",
    paddingLeft: 24,
    padding: 12,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: "90%",
  },
  textSection: {
    fontSize: 22,
    fontWeight: "bold",
  },
  imageOverlay: {
    width: 150,
    height: 250,
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
