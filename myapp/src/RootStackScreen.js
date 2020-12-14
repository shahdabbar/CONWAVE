import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./SplashScreen";
import TypeScreen from "./registration/TypeScreen";
import SignUpScreen from "./registration/SignUpScreen";
import LocationScreen from "./registration/LocationScreen";

const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => {
  return (
    <RootStack.Navigator headerMode="none">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="TypeScreen" component={TypeScreen} />
      <RootStack.Screen name="LocationScreen" component={LocationScreen} />
      <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;

const styles = StyleSheet.create({});
