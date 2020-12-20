import React, { useContext, useState, useEffect } from "react";
import {
  EdgeInsetsPropType,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
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
import ExploreScreen from "./ExploreScreen";
import EditProfileScreen from "./EditProfileScreen";
import axios from "axios";

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;
  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
        </View>
        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#FFFFFF",
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{ flex: 1, height: 60, backgroundColor: COLORS.white }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
  return;
};

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    tabBarOptions={{
      showLabel: false,
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
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ focused }) => (
          <Image
            source={require("../assets/icons/home.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />

    <Tab.Screen
      name="Notification"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: "notification",
        tabBarIcon: ({ focused }) => (
          <Image
            source={require("../assets/icons/notification.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Chat"
      component={ExploreStackScreen}
      options={{
        tabBarLabel: "chat",
        tabBarIcon: ({ focused }) => (
          <Image
            source={require("../assets/icons/chat.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "profile",
        tabBarIcon: ({ focused }) => (
          <Image
            source={require("../assets/icons/user.png")}
            resizeMode="contain"
            style={{
              width: 25,
              height: 25,
              tintColor: focused ? COLORS.primary : COLORS.secondary,
            }}
          />
        ),
        tabBarButton: (props) => <TabBarCustomButton {...props} />,
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
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
  </HomeStack.Navigator>
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
                navigation.navigate("ProfileScreen");
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
                navigation.navigate("EditProfile", { modal3: true });
              }}
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

const ExploreStackScreen = ({ navigation }) => (
  <ExploreStack.Navigator
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
    <ExploreStack.Screen
      name="Details"
      component={ExploreScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={30}
            backgroundColor="#fff"
            color="#000"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </ExploreStack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
