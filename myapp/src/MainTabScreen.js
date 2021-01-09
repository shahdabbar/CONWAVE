import React, { useContext, useState, useEffect } from "react";
import {
  EdgeInsetsPropType,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "react-native-paper";
import Svg, { Path, Circle, ClipPath } from "react-native-svg";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import { AuthContext } from "./AuthProvider";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Icon,
  MaterialCommunityIcons as MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "react-native-vector-icons";
import { Modal, Card } from "react-native-paper";
import HomeScreen from "./HomeScreen";
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
import SessionTypeScreen from "./SessionTypeScreen";
import SearchTutorsScreen from "./SearchTutorsScreen";
import TutorProfileScreen from "./TutorProfileScreen";
import BookTimeScreen from "./BookTimeScreen";
import BookSessionScreen from "./BookSessionScreen";
import PaymentMethodScreen from "./PaymentMethodScreen";
import BookingSucceededScreen from "./BookingSucceededScreen";
import StudentSessionsScreen from "./StudentSessionsScreen";
import VideosScreen from "./VideosScreen";
import SetAddressScreen from "./SetAddressScreen";
import TutorCoursesScreen from "./TutorCoursesScreen";
import ScheduleScreen from "./ScheduleScreen";
import ViewSessionScreen from "./ViewSessionScreen";

import axios from "axios";
import ReviewsScreen from "./ReviewsScreen";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const SessionStack = createStackNavigator();
const CoursesStack = createStackNavigator();
const ScheduleStack = createStackNavigator();
const StudentSessionsStack = createStackNavigator();

// const ExploreStack = createStackNavigator();
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
    routeName === "CourseDescription"
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
      initialRouteName="Home"
      activeColor="#fff"
      tabBarOptions={{
        showLabel: true,
        labelStyle: { color: "gray", fontSize: 14 },
        // labelStyle: { fontSize: 16, color: COLORS.pink },
        style: {
          borderTopWidth: 0,
          backgroundColor: "transparent",
          elevation: 0,
        },
      }}
    >
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
      {userInfo.type === "tutor" ? (
        <>
          <Tab.Screen
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
            name="Courses"
            component={TutorCoursesStackScreen}
            options={({ route }) => {
              return {
                tabBarVisible: getTabBarVisibility(route),
                tabBarLabel: "Courses",
                tabBarIcon: ({ focused }) => (
                  <Image
                    source={icons.courses}
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
          color: "gray",
          fontWeight: "800",
          fontSize: 20,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
          color: "gray",
          fontWeight: "800",
          fontSize: 20,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
        title: "Tutor Prfile",
        headerTitleStyle: {
          color: "gray",
          fontWeight: "800",
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
            color="gray"
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
        headerShown: true,
        title: "Reviews",
        headerTitleStyle: {
          color: "gray",
          fontWeight: "800",
          fontSize: 25,
        },
        headerStyle: {
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
          color: "gray",
          fontWeight: "800",
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
            color="gray"
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
          color: "gray",
          fontWeight: "800",
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
            color="gray"
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
          color: "gray",
          fontWeight: "800",
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
            color="gray"
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
          color: "gray",
          fontWeight: "800",
          fontSize: 25,
        },
        headerStyle: {
          elevation: 0, // Android
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const TutorCoursesStackScreen = ({ navigation }) => (
  <CoursesStack.Navigator
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
    <CoursesStack.Screen
      name="Courses"
      component={TutorCoursesScreen}
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
  </CoursesStack.Navigator>
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
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
      name="MySchedule"
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
      name="ViewSession"
      component={ScheduleScreen}
      options={{
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("MySchedule");
            }}
          />
        ),
      }}
    />
  </ScheduleStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          shadowColor: "#000", // ios
          elevation: 0, // Android
        },
        headerTintColor: "black",
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          // headerShown: false,
          title: "",
          headerLeft: () => (
            <Icon
              name="ios-menu"
              size={30}
              color="gray"
              style={{ marginLeft: 16 }}
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color="gray"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("EditProfile")}
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
            color: "gray",
            fontWeight: "800",
            fontSize: 14,
            alignSelf: "center",
          },
          headerLeft: () => (
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color="gray"
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
              color="gray"
              style={{ marginRight: 16 }}
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
        }}
      />

      <ProfileStack.Screen
        name="Videos"
        component={VideosScreen}
        options={{
          // headerShown: false,
          title: "My Videos",
          headerTitleStyle: {
            color: "gray",
            fontWeight: "800",
            fontSize: 20,
            alignSelf: "center",
          },

          headerLeft: () => (
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color="gray"
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="account-edit"
              size={30}
              color="gray"
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate("EditProfile")}
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const ChatStackScreen = ({ navigation }) => (
  <ChatStack.Navigator
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
    <ChatStack.Screen
      name="Chats"
      component={ChatRoomsScreen}
      options={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: 27,
          fontWeight: "bold",
          color: COLORS.pink,
        },
        headerStyle: { elevation: 0 },
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            style={{ left: 10 }}
            color="gray"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <ChatStack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        headerShown: true,
        title: "Chat",
        headerTitleStyle: {
          color: "gray",
          fontWeight: "bold",
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
      headerShown: "false",
      headerStyle: {
        backgroundColor: "#fff",
        shadowColor: "#000", // ios
        elevation: 0, // Android
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <SessionStack.Screen
      name="Sessions"
      component={CompleteProfileScreen}
      options={{
        headerTitle: "Complete Profile",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "bold",
          color: COLORS.black,
        },
        headerShown: false,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            left={10}
            color="gray"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
        headerRight: () => {
          <Icon
            name="md-ellipsis-vertical"
            size={30}
            color="gray"
            style={{ marginRight: 16 }}
            onPress={() => {}}
          />;
        },
      }}
    />

    <SessionStack.Screen
      name="Courses"
      component={CoursesScreen}
      options={{
        headerShown: true,
        title: "COURSES",
        headerTitleStyle: {
          color: "gray",
          fontWeight: "800",
          fontSize: 14,
          alignSelf: "center",
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("CompleteProfileScreen");
            }}
          />
        ),

        headerRight: () => (
          <Icon
            name="pencil"
            size={25}
            color="gray"
            style={{ marginRight: 16 }}
            onPress={() => {}}
          />
        ),
      }}
    />

    <SessionStack.Screen
      name="AddCourse"
      component={AddCourseScreen}
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

    <SessionStack.Screen
      name="CourseDescription"
      component={CourseDescScreen}
      options={{
        headerShown: true,
        title: "Course Description",
        headerTitleStyle: {
          color: "gray",
          fontWeight: "800",
          fontSize: 20,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
          color: "gray",
          fontWeight: "800",
          fontSize: 20,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
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
          color: "gray",
          fontWeight: "800",
          fontSize: 20,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("CompleteProfileScreen");
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
          fontWeight: "bold",
          fontSize: 25,
        },
        headerLeft: () => (
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            style={{ marginLeft: 20 }}
            onPress={() => {
              navigation.navigate("CompleteProfileScreen");
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
