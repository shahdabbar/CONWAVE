// import "react-native-gesture-handler";
// import { StatusBar } from "expo-status-bar";
// import { Asset } from "expo-asset";
// import { AppLoading } from "expo";
// import React, { useEffect, useState, useMemo } from "react";
// import {
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   ActivityIndicator,
// } from "react-native";
// import {
//   Provider as PaperProvider,
//   DefaultTheme as PaperDefaultTheme,
//   DarkTheme as PaperDarkTheme,
// } from "react-native-paper";
// import {
//   NavigationContainer,
//   DefaultTheme as NavigationDefaultTheme,
//   DarkTheme as NavigationDarkTheme,
// } from "@react-navigation/native";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItem,
// } from "@react-navigation/drawer";

// import MainTabScreen from "./screens/MainTabScreen";
// import DrawerContent from "./screens/DrawerContent";
// import SupportScreen from "./screens/SupportScreen";
// import SettingsScreen from "./screens/SettingsScreen";
// import BookmarkScreen from "./screens/BookmarkScreen";
// import { AuthContext, authContext } from "./components/context";
// import RootStackScreen from "./screens/RootStackScreen";
// import { Providers } from "./screens/Providers";
// import AuthStack from "./screens/AuthProvider";
// const Drawer = createDrawerNavigator();

// function App() {
//   const [isDarkTheme, setisDarkTheme] = React.useState(false);

//   const CustomeDefaultTheme = {
//     ...NavigationDefaultTheme,
//     ...PaperDefaultTheme,
//     colors: {
//       ...NavigationDefaultTheme.colors,
//       ...PaperDefaultTheme.colors,
//       background: "#ffffff",
//       text: "#333333",
//     },
//   };

//   const CustomeDarkTheme = {
//     ...NavigationDarkTheme,
//     ...PaperDarkTheme,
//     colors: {
//       ...NavigationDarkTheme.colors,
//       ...PaperDarkTheme.colors,
//       background: "#333333",
//       text: "#ffffff",
//     },
//   };

//   const theme = isDarkTheme ? CustomeDarkTheme : CustomeDefaultTheme;

//   return (
//     <PaperProvider theme={theme}>
//       <AuthContext.Provider value={authContext}>
//         <NavigationContainer theme={theme}>
//           <Drawer.Navigator
//             drawerContent={(props) => <DrawerContent {...props} />}
//           >
//             <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
//             <Drawer.Screen name="SupportScreen" component={SupportScreen} />
//             <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
//             <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
//           </Drawer.Navigator>

//           <AuthStack />
//         </NavigationContainer>
//       </AuthContext.Provider>
//     </PaperProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default App;

import { Providers } from "./src/Providers";

export default Providers;
