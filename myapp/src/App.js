import "react-native-gesture-handler";
import React from "react";
// import * as Font from "expo-font";
// import { useFonts } from "@use-expo/font";
// import { AppLoading } from "expo";
import { StyleSheet } from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from "react-native-paper";
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import MainTabScreen from "../src/MainTabScreen";
import DrawerContent, { DRAWER_WIDTH } from "../src/DrawerContent";
import SupportScreen from "../src/SupportScreen";
import SettingsScreen from "../src/SettingsScreen";
import CompleteProfileScreen from "../src/CompleteProfileScreen";
import RootStackScreen from "../src/RootStackScreen";
import VideosScreen from "./VideosScreen";
import EditProfileScreen from "./EditProfileScreen";

const Drawer = createDrawerNavigator();
// const RootApp = createAppContainer(appNavigator);
// const customFonts = {
//   Montserrat: require("./assets/fonts/montserrat.ttf"),
// };
function App() {
  const [isDarkTheme, setisDarkTheme] = React.useState(false);
  // const [isLoaded] = useFonts(customFonts);

  const CustomeDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: "#ffffff",
      text: "#333333",
    },
  };

  const CustomeDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: "#333333",
      text: "#ffffff",
    },
  };

  const theme = isDarkTheme ? CustomeDarkTheme : CustomeDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <Drawer.Navigator
        openByDefault={false}
        drawerStyle={{ width: DRAWER_WIDTH }}
        initialRouteName="HomeDrawer"
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
        <Drawer.Screen name="VideosScreen" component={VideosScreen} />
        <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
        <Drawer.Screen name="SupportScreen" component={SupportScreen} />
      </Drawer.Navigator>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
