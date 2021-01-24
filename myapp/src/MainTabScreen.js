import React, { useContext, useState, useEffect } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import { AuthContext } from "./AuthProvider";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Icon,
  MaterialCommunityIcons as MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "react-native-vector-icons";
import HomeScreen from "./HomeScreen/HomeScreen";
import DetailsScreen from "./DetailsScreen";
import ProfileScreen from "./ProfileScreen";
import ChatScreen from "./ChatScreen";
import ChatRoomsScreen from "./ChatRoomsScreen";
import EditProfileScreen from "./EditProfileScreen";
import CoursesScreen from "./CoursesScreen";
import CompleteProfileScreen from "./CompleteProfileScreen";
import AddCourseScreen from "./AddCourseScreen";
import AddRateScreen from "./AddRateScreen";
import CourseDescScreen from "./CourseDescScreen";
import AvailabilityScreen from "./AvailabilityScreen";
import SessionTypeScreen from "./HomeScreen/SessionTypeScreen";
import SearchTutorsScreen from "./HomeScreen/SearchTutorsScreen";
import TutorProfileScreen from "./HomeScreen/TutorProfileScreen";
import BookTimeScreen from "./HomeScreen/BookTimeScreen";
import BookSessionScreen from "./HomeScreen/BookSessionScreen";
import PaymentMethodScreen from "./HomeScreen/PaymentMethodScreen";
import BookingSucceededScreen from "./HomeScreen/BookingSucceededScreen";
import StudentSessionsScreen from "./StudentSessionsScreen";
import VideosScreen from "./VideosScreen";
import SetAddressScreen from "./SetAddressScreen";
import TutorCoursesScreen from "./TutorCoursesScreen";
import ScheduleScreen from "./ScheduleScreen";
import ViewSessionScreen from "./ViewSessionScreen";
import ViewSessionDetails from "./ViewSessionDetails";
import ReviewsScreen from "./ReviewsScreen";
import MeetingAddressScreen from "./MeetingAddressScreen";
import StudentsChatRooms from "./StudentsChatRooms";
import axios from "axios";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SessionStack = createStackNavigator();
const CoursesStack = createStackNavigator();
const ScheduleStack = createStackNavigator();
const StudentSessionsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderTopWidth: 3,
          borderTopColor: COLORS.pink,
          backgroundColor: COLORS.white,
        }}
      >
        {/* <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
          }}
        >
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View> */}
        <TouchableOpacity
          // style={{
          //   // top: -22.5,
          //   justifyContent: "center",
          //   alignItems: "center",
          //   width: 50,
          //   height: 50,
          //   borderRadius: 25,
          //   backgroundColor: COLORS.pink,
          // }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ flex: 1, height: 50, backgroundColor: COLORS.white }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return;
};

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);

  if (
    routeName === "SessionType" ||
    routeName === "SearchTutor" ||
    routeName === "TutorProfile" ||
    routeName === "BookTime" ||
    routeName === "BookSession" ||
    routeName === "PaymentMethod" ||
    routeName === "BookingSucceeded" ||
    routeName === "EditProfile" ||
    routeName === "Videos" ||
    routeName === "Courses" ||
    routeName === "AddCourse" ||
    routeName === "Availabilities" ||
    routeName === "SetRate" ||
    routeName === "Address" ||
    routeName === "Chat" ||
    routeName === "Reviews" ||
    routeName === "CourseDescription" ||
    routeName === "ViewSession" ||
    routeName === "MeetingAddress"
  ) {
    return false;
  }

  return true;
};

const MainTabScreen = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

    // get user name
    axios
      .get("api/user")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={userInfo.type === "tutor" ? "Sessions" : "Home"}
      activeColor="#fff"
      tabBarOptions={{
        showLabel: true,
        labelStyle: { color: "gray", fontSize: 14 },
        style: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
    >
      {userInfo.type === "tutor" ? (
        <>
          <Tab.Screen
            initialRouteName={userInfo.type === "tutor" ? "Sessions" : "Home"}
            name="Sessions"
            component={SessionsStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "Sessions",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.session}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />

          <Tab.Screen
            name="Schedule"
            component={ScheduleStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "Schedule",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.schedule}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />

          <Tab.Screen
            name="Chat"
            component={ChatStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "chat",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.chat}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "Home",
                tabBarOptions: {
                  activeTintColor: COLORS.black2,
                  inactiveTintColor: COLORS.secondary,
                },
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.home}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />
          <Tab.Screen
            name="StudentSessions"
            component={StudentSessionsStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "Sessions",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.session}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />
          <Tab.Screen
            name="Chat"
            component={StudentsChatStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "chat",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.chat}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: focused ? COLORS.black2 : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          />
          {/* <Tab.Screen
            name="Notification"
            component={DetailsStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "notification",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={require("../assets/icons/notification.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? COLORS.pink : COLORS.secondary,
                    }}
                  />
                ),
                tabBarButton: (props) => <TabBarCustomButton {...props} />,
              };
            }}
          /> */}
        </>
      )}

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={({ route }) => {
          return {
            tabBarVisible: getTabBarVisibility(route),
            tabBarLabel: "profile",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../assets/icons/user.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.black2 : COLORS.secondary,
                }}
              />
            ),
            tabBarButton: (props) => <TabBarCustomButton {...props} />,
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      // animationEnabled: false,
      headerShown: false,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: "Home",
        headerTitleStyle: {
          marginHorizontal: "30%",
        },

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="black"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name="SessionType"
      component={SessionTypeScreen}
      options={{
        headerShown: false,
        title: "Session Type",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="SearchTutor"
      component={SearchTutorsScreen}
      options={{
        headerShown: false,
        title: "Tutors",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("SessionType");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="TutorProfile"
      component={TutorProfileScreen}
      options={{
        headerShown: true,
        title: "Tutor Profile",
        headerTitleStyle: {
          fontSize: 24,
          color: COLORS.black3,
          // fontWeight: "bold",
        },
        headerStyle: {
          // backgroundColor: COLORS.primary,
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("SearchTutor");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{
        headerShown: false,
        title: "Reviews",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerStyle: {
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("TutorProfile");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="BookTime"
      component={BookTimeScreen}
      options={{
        headerShown: false,
        title: "Select Time",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerStyle: {
          // backgroundColor: COLORS.primary,
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("TutorProfile");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="BookSession"
      component={BookSessionScreen}
      options={{
        headerShown: false,
        title: "Payment",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerStyle: {
          // backgroundColor: COLORS.primary,
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("BookTime");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="PaymentMethod"
      component={PaymentMethodScreen}
      options={{
        headerShown: true,
        title: "Add Your Credit Card",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerStyle: {
          // backgroundColor: COLORS.primary,
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("BookSession");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="BookingSucceeded"
      component={BookingSucceededScreen}
      options={{
        headerShown: false,
        title: "",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerStyle: {
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        ),
      }}
    />

    <HomeStack.Screen
      name="StudentsSessions"
      component={StudentSessionsScreen}
      options={{
        headerShown: false,
      }}
    />
  </HomeStack.Navigator>
);

const StudentSessionsStackScreen = ({ navigation }) => (
  <StudentSessionsStack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <StudentSessionsStack.Screen
      name="StudentsSessions"
      component={StudentSessionsScreen}
      options={{
        headerShown: false,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="black"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <StudentSessionsStack.Screen
      name="ViewSession"
      component={ViewSessionScreen}
      options={{
        headerShown: false,
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("StudentsSessions");
            }}
          />
        ),
      }}
    />

    <StudentSessionsStack.Screen
      name="MeetingAddress"
      component={MeetingAddressScreen}
      options={{
        headerShown: false,
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("StudentsSessions");
            }}
          />
        ),
      }}
    />
  </StudentSessionsStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <DetailsStack.Screen
      name="Details"
      component={DetailsScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="black"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

const ScheduleStackScreen = ({ navigation }) => (
  <ScheduleStack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ScheduleStack.Screen
      name="tutorSchedule"
      component={ScheduleScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="black"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <ScheduleStack.Screen
      name="ViewSessionDetails"
      component={ViewSessionDetails}
      options={{
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("tutorSchedule");
            }}
          />
        ),
      }}
    />

    <ScheduleStack.Screen
      name="MeetingAddress"
      component={MeetingAddressScreen}
      options={{
        headerShown: false,
      }}
    />
  </ScheduleStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#000", // ios
        },
        headerTintColor: "black",
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.pink,
            elevation: 0, // Android
          },
          title: "",
          headerLeft: () => (
            <Icon
              name="ios-menu"
              size={30}
              color="#000000"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color="#000000"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("EditProfile")}
            />
          ),
        }}
      />

      <ProfileStack.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          headerShown: false,
          title: "My Videos",
          headerTitleStyle: {
            color: "gray",
            fontWeight: "800",
            fontSize: 20,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color={COLORS.black3}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
      />

      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: false,
          title: "PROFILE SETTINGS",
          headerTitleStyle: {
            color: COLORS.black3,
            fontSize: 25,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color={COLORS.black3}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
          headerRight: () => (
            <Icon
              name="md-ellipsis-vertical"
              size={30}
              color={COLORS.black3}
              style={{ marginRight: 16 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
      />

      <ProfileStack.Screen
        name="TutorCourses"
        component={TutorCoursesScreen}
        options={{
          headerShown: true,
          headerTitle: "Reviews Per Course",
          headerTitleStyle: {
            color: COLORS.black3,
            fontSize: 25,
          },
          headerStyle: {
            elevation: 0,
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color={COLORS.black3}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
      />

      <ProfileStack.Screen
        name="Reviews"
        component={ReviewsScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const StudentsChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ChatStack.Screen
      name="Chats"
      component={StudentsChatRooms}
      options={{
        headerTitleStyle: {
          fontSize: 25,
          color: COLORS.pink,
        },

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#FFFFFF"
            style={{ left: 10 }}
            color={COLORS.black3}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        title: "Chat",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("Chats");
            }}
          />
        ),
      }}
    />
  </ChatStack.Navigator>
);

const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ChatStack.Screen
      name="Chats"
      component={ChatRoomsScreen}
      options={{
        headerTitleStyle: {
          fontSize: 25,
          color: COLORS.pink,
        },

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#FFFFFF"
            style={{ left: 10 }}
            color={COLORS.black3}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        title: "Chat",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("Chats");
            }}
          />
        ),
      }}
    />
  </ChatStack.Navigator>
);

const SessionsStackScreen = ({ navigation }) => (
  <SessionStack.Navigator
    screenOptions={{
      initialRouteName: "Sessions",
      headerShown: "true",
    }}
  >
    <SessionStack.Screen
      name="TutorSessions"
      component={CompleteProfileScreen}
      options={{
        headerShown: false,
      }}
    />

    <SessionStack.Screen
      name="Courses"
      component={CoursesScreen}
      options={{
        headerShown: true,
        title: "COURSES",
        headerStyle: { elevation: 0 },
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
          alignSelf: "center",
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("TutorSessions");
            }}
          />
        ),

        headerRight: () => (
          <FontAwesome
            name="pencil"
            size={25}
            color={COLORS.black3}
            style={{ marginRight: 16 }}
            onPress={() => {}}
          />
        ),
      }}
    />

    <SessionStack.Screen
      name="Reviews"
      component={ReviewsScreen}
      options={{
        headerShown: false,
      }}
    />

    <SessionStack.Screen
      name="AddCourse"
      component={AddCourseScreen}
      options={{
        headerShown: false,
      }}
    />

    <SessionStack.Screen
      name="CourseDescription"
      component={CourseDescScreen}
      options={{
        headerShown: true,
        title: "Course Description",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("AddCourse");
            }}
          />
        ),
      }}
    />

    <SessionStack.Screen
      name="SetRate"
      component={AddRateScreen}
      options={{
        headerShown: true,
        title: "Set Your Rate",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("AddCourse");
            }}
          />
        ),
      }}
    />
    <SessionStack.Screen
      name="Availabilities"
      component={AvailabilityScreen}
      options={{
        headerShown: true,
        title: "Availabilities",
        headerTitleStyle: {
          color: COLORS.black3,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("TutorSessions");
            }}
          />
        ),
      }}
    />

    <SessionStack.Screen
      name="Address"
      component={SetAddressScreen}
      options={{
        headerShown: true,
        title: "Add Address",
        headerTitleStyle: {
          color: COLORS.black2,
          // left: 45,
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color={COLORS.black3}
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("TutorSessions");
            }}
          />
        ),
      }}
    />
  </SessionStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
