import React, { useContext, useState, useEffect } from "react";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import {
  Dimensions,
  Image,
  StyleSheet,
  SwitchComponent,
  View,
} from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "./AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import axios from "axios";
import { LinearGradient } from "react-native-svg";
// axios.defaults.baseURL = "http://10.0.2.2:8000";

const { width } = Dimensions.get("window");
const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

function DrawerContent(props) {
  const paperTheme = useTheme();
  const { user, logout } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    type: "",
  });

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get("api/user")
      .then((response) => {
        setUserInfo({
          ...userInfo,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          location: response.data.location,
          type: response.data.type,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    // <LinearGradient colors={[COLORS.yellow, COLORS.white]}>
    <View style={styles.container}>
      {/* <View style={{ flex: 1 }}> */}
      <View style={{ flex: 0.4, backgroundColor: COLORS.white }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderBottomRightRadius: 70,
            backgroundColor: COLORS.yellow2,
          }}
        />
      </View>
      <View style={{ flex: 0.8 }}>
        <View style={{ flex: 1, backgroundColor: COLORS.yellow2 }} />
        <View style={{ flex: 1, backgroundColor: COLORS.gray }} />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 70,
          }}
        />
      </View>
      <View>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={require("../assets/images/profile2.png")}
                  size={75}
                  // resizeMode="contain"
                  style={{ backgroundColor: COLORS.white }}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.title}>
                    {userInfo.firstname} {userInfo.lastname}
                  </Title>
                  <Caption style={styles.caption}>@{userInfo.type}</Caption>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.section}>
                  <Paragraph style={[styles.paragraph, styles.caption]}>
                    @
                  </Paragraph>
                  <Caption style={styles.caption}>
                    shahdabbar32@gmail.com
                  </Caption>
                </View>
              </View>
            </View>
            <Drawer.Section style={styles.drawerSection}>
              <DrawerItem
                icon={() => (
                  <Icon name="home-outline" color="#515e5a" size={30} />
                )}
                label="Home"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="account-outline" color="#515e5a" size={30} />
                )}
                label="Profile"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon name="video-outline" color="#515e5a" size={30} />
                )}
                label="Videos"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("CompleteProfileScreen");
                }}
              />
              <DrawerItem
                icon={() => (
                  <Ionicon name="settings-outline" color="#515e5a" size={30} />
                )}
                label="Settings"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("SettingsScreen");
                }}
              />
              <DrawerItem
                icon={() => (
                  <Icon
                    name="account-check-outline"
                    color="#515e5a"
                    size={30}
                  />
                )}
                label="Support"
                labelStyle={{ fontSize: 18, fontWeight: "bold" }}
                onPress={() => {
                  props.navigation.navigate("SupportScreen");
                }}
              />
            </Drawer.Section>
            {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                // toggleTheme();
              }}
            >
              <View style={styles.preferences}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section> */}
          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={() => <Icon name="exit-to-app" color="#515e5a" size={30} />}
            label="Sign out"
            labelStyle={{ fontSize: 18, fontWeight: "bold" }}
            onPress={() => {
              logout();
            }}
          />
        </Drawer.Section>
      </View>

      <View style={{ flex: 0.8 }}>
        <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        <View style={{ flex: 1, backgroundColor: COLORS.pink }} />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.white,
            borderBottomRightRadius: 70,
            borderTopLeftRadius: 70,
          }}
        />
      </View>
      <View style={{ flex: 0.2, backgroundColor: COLORS.white }}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderTopLeftRadius: 70,
            backgroundColor: COLORS.pink,
          }}
        />
      </View>
    </View>
    // </LinearGradient>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.beige,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerContent: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preferences: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
