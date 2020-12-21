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
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";

const AddCoursesScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const { user } = useContext(AuthContext);

  const [categories, setCategories] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [profiles, setProfiles] = useState(null);

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
        console.log("error", error);
      });

    axios
      .get("api/user_profile")
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });

    // get all categories
    axios
      .get("api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // get all courses
    axios
      .get("api/courses")
      .then((response) => {
        // setFilterCourses(response.data);
        setCourses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSelectCategory = (category) => {
    // filter courses
    let coursesList = courses.filter(
      (course) => course.category_id === category.id
    );
    setFilteredCourses(coursesList);
    setSelectedCategory(category);
  };

  const onSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const Icon = (name) => {
    let icon = "";
    if (name === "Health & Fitness") {
      icon = icons.health;
    } else if (name === "Cooking") {
      icon = icons.cooking;
    } else if (name === "Languages") {
      icon = icons.languages;
    } else if (name === "Development") {
      icon = icons.code;
    } else if (name === "Finance & Accounting") {
      icon = icons.finance;
    } else if (name === "Office Productivity") {
      icon = icons.office;
    } else if (name === "Design") {
      icon = icons.design;
    } else if (name === "Marketing") {
      icon = icons.marketing;
    } else if (name === "Photography & Video") {
      icon = icons.camera;
    } else if (name === "Music") {
      icon = icons.music;
    } else if (name === "Lifestyle") {
      icon = icons.lifestyle;
    } else if (name === "Personal Development") {
      icon = icons.self_dev;
    } else if (name === "IT & Software") {
      icon = icons.computer;
    } else if (name === "Business") {
      icon = icons.business;
    } else if (name === "Teaching & Academics") {
      icon = icons.teach;
    } else if (name === "Test Prep") {
      icon = icons.test;
    }
    return icon;
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = courses
        ? courses.filter(function (item) {
            console.log(courses);

            const itemData = item.name
              ? item.name.toUpperCase()
              : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          })
        : null;
      setFilterCourses(newData);
      setSearch(text);
    } else {
      setFilterCourses([]);
      setSearch(text);
    }
  };

  function renderCategories() {
    return (
      <Animatable.View animation="bounceInLeft">
        <FlatList
          horizontal={true}
          data={categories}
          showsHorizontalScrollIndicator={false}
          // ItemSeparatorComponent={ItemSeparatorView}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingVertical: SIZES.padding }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingLeft: 16 }}>
                <TouchableOpacity
                  style={{
                    padding: SIZES.padding,
                    backgroundColor:
                      selectedCategory?.id == item.id
                        ? "#ff01ff"
                        : COLORS.white,
                    borderRadius: SIZES.radius,
                    ...styles.shadow,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  <View
                    style={{
                      width: 25,
                      height: 25,
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
                        width: 22,
                        height: 22,
                      }}
                    />
                  </View>

                  <Text
                    style={{
                      marginHorizontal: 3,
                      fontWeight: "bold",
                      color: COLORS.black,
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

  const ItemView = ({ item }) => {
    return (
      // // Flat List Item
      // <Text style={styles.itemStyle} onPress={() => getItem(item)}>
      //   {item.name.toUpperCase()}
      // </Text>
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
                fontWeight: selectedCourse?.id == item.id ? "bold" : "normal",
                color: selectedCourse?.id == item.id ? "#155c47" : COLORS.black,

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
  };

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
          data={filteredCourses}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingLeft: 5 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      selectedCourse?.id == item.id ? "#DEE9FD" : COLORS.white,
                    // borderRadius: SIZES.radius,
                    // elevation: 10,
                    // marginRight: SIZES.padding * 2,
                  }}
                  onPress={() => onSelectCourse(item)}
                >
                  <View
                    style={{
                      padding: 10,
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
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#C8C8C8",
                  }}
                />
              </View>
            );
          }}
        />
      </Animatable.View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
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
        <View style={styles.action}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search Courses"
            placeholderTextColor="#666"
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
          ></TextInput>
          <Feather
            name="search"
            size={22}
            color="#666"
            style={{
              position: "absolute",
              alignSelf: "center",
              right: 20,
              opacity: 0.6,
            }}
          />
        </View>
      </View>
      {renderCategories()}

      <ScrollView>
        {search ? (
          <View>
            <FlatList
              data={filterCourses}
              keyExtractor={(item, index) => index.toString()}
              // ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
            />
          </View>
        ) : (
          <View>{renderCoursesList()}</View>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{ marginTop: -60 }}
        onPress={() => navigation.navigate("AddCourse")}
      >
        <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
          <Text style={styles.text}>NEXT</Text>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddCoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  image: {
    borderBottomRightRadius: 65,
  },
  action: {
    flexDirection: "row",
    height: 50,
    width: "80%",
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 10,
    backgroundColor: "#f2f2f2",
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    // paddingRight: 24,
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 60,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginHorizontal: 10,
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
    // marginTop: 16,
    // backgroundColor: "#fff",
    // paddingLeft: 24,
    // padding: 12,
    // borderTopRightRadius: 40,
    // borderBottomRightRadius: 40,
    // width: "90%",
    // height: 60,
    // borderColor: "#ffd200",
    // borderWidth: 2,
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
