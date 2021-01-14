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
  LogBox,
} from "react-native";
import { useTheme } from "@react-navigation/native";

// LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
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
// import { AppLoading } from "expo";
// import {
//   useFonts,
//   Raleway_200ExtraLight,
//   Raleway_400Regular,
//   Raleway_900Black,
// } from "@expo-google-fonts/raleway";
import axios from "axios";

// axios.defaults.baseURL = "http://192.168.0.1:8000";

const HomeScreen = ({ navigation }) => {
  // let [fontsLoaded, error] = useFonts({
  //   Raleway_200ExtraLight,
  //   Raleway_400Regular,
  //   Raleway_900Black,
  //   italic_black: require("../assets/fonts/Roboto-Italic.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  const { user } = useContext(AuthContext);

  const [name, setName] = useState({
    firstname: "",
    lastname: "",
  });
  const [categories, setCategories] = useState(null);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [tutors, setTutors] = useState([]);
  const [gallery, setgallery] = useState([
    {
      image: {
        uri:
          "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%27",
      },
      title: "tutor1",
      key: "1",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/227417/pexels-photo-227417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      title: "tutor2",
      key: "2",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/258196/pexels-photo-258196.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      },
      title: "tutor3",
      key: "3",
    },
    {
      image: {
        uri:
          "https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940%27",
      },
      title: "tutor4",
      key: "4",
    },
  ]);

  useEffect(() => {
    if (search) {
      const newData = courses
        ? courses.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : "".toUpperCase();
            const textData = search.toUpperCase();
            return itemData.indexOf(textData) > -1;
          })
        : null;
      setFilterCourses(newData);
    } else {
      setFilterCourses([]);
    }
  }, [search]);

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
        setTutors(response.data);
        // console.log(response.data);
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
    navigation.navigate("SessionType", { course: course });
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
            // console.log(courses);

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
        {categories ? (
          <FlatList
            horizontal={true}
            data={categories}
            showsHorizontalScrollIndicator={false}
            // ItemSeparatorComponent={ItemSeparatorView}
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
                          ? "#ffd200"
                          : COLORS.beige,
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
        ) : null}
      </Animatable.View>
    );
  }
  // animation = "bounceInDown";
  function renderCoursesList() {
    return (
      <Animatable.View>
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

  function renderCourses() {
    return (
      <Animatable.View animation="bounceInLeft">
        <FlatList
          horizontal={true}
          data={courses}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          contentContainerStyle={{ paddingVertical: SIZES.padding / 2 }}
          renderItem={({ item }) => {
            return (
              <View style={{ paddingVertical: 5, paddingLeft: 16 }}>
                <View
                  style={{
                    padding: SIZES.padding,
                    paddingBottom: SIZES.padding * 2,
                    backgroundColor: COLORS.darkpink,
                    borderRadius: SIZES.radius / 2,
                    alignItems: "center",
                    justifyContent: "center",
                    elevation: 5,
                    marginRight: SIZES.padding,
                    // ...styles.shadow,
                  }}
                  onPress={() => onSelectCategory(item)}
                >
                  <Text
                    style={{
                      marginHorizontal: 1,
                      marginTop: SIZES.padding,
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      fontSize: 17,
                    }}
                  >
                    {item.name}
                  </Text>

                  <View
                    style={{
                      margin: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text>5 Tutors</Text>
                  </View>
                </View>
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

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "#C8C8C8",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.name);
  };

  function flatlist() {
    return (
      <>
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
          <View>
            <Animatable.View
              animation="pulse"
              style={{ padding: SIZES.padding * 2 }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  // fontFamily: "italic_black",
                }}
              >
                Main
              </Text>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: COLORS.pink,
                }}
              >
                Categories
              </Text>
            </Animatable.View>
            {renderCategories()}
            {renderCoursesList()}
          </View>
        )}
        <View>
          <Animatable.View animation="pulse" style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                color: COLORS.yellow,
              }}
            >
              <Text style={{ color: COLORS.black3 }}>Top</Text> Tutors
            </Text>
          </Animatable.View>
          <FlatList
            data={tutors}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <View style={{ paddingVertical: 10, paddingLeft: 16 }}>
                  <TouchableOpacity>
                    <View>
                      <Image
                        source={
                          item.profile_photo_path
                            ? {
                                uri: `http://192.168.0.107:8000/${item.profile_photo_path}`,
                              }
                            : require("../assets/images/profile4.png")
                        }
                        resizeMode="cover"
                        style={{
                          width: 150,
                          marginRight: 8,
                          height: 200,
                          borderRadius: 30,
                        }}
                      />
                    </View>
                    <View style={styles.imageOverlay}></View>
                    <MaterialIcon
                      name="alternate-email"
                      size={16}
                      color="white"
                      style={styles.imageLocationIcon}
                    />
                    <Text style={styles.imageText}>
                      {item.firstname} {item.lastname}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={{ marginBottom: 60 }}>
          <Animatable.View animation="pulse" style={{ padding: 20 }}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Most Popular courses
            </Text>
          </Animatable.View>
          <View>{renderCourses()}</View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <ImageBackground
          style={{
            width: "100%",
            height: 270,
            borderBottomRightRadius: SIZES.radius * 2,
          }}
          resizeMode="cover"
          source={require("../assets/images/bg28.jpg")}
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
              placeholder="Search Courses"
              placeholderTextColor="#666"
              onChangeText={(text) => {
                console.log("value", text);
                setSearch(text);
              }}
              // onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              underlineColorAndroid="transparent"
            ></TextInput>
            <Feather
              name="search"
              size={22}
              color="#666"
              style={{ position: "absolute", top: 35, right: 60, opacity: 0.6 }}
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
      <FlatList ListHeaderComponent={flatlist()} />
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
    borderBottomRightRadius: SIZES.radius * 2,
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
    fontSize: 18,
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
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
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
    opacity: 0.3,
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
