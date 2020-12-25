import React, { useContext, useState, useEffect } from "react";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { StyleSheet, SwitchComponent, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { AuthContext } from "./AuthProvider";
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
// axios.defaults.baseURL = "http://10.0.2.2:8000";

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
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/images/profile2.png")}
                size={75}
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
                  80
                </Paragraph>
                <Caption style={styles.caption}>Videos</Caption>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => (
                <Icon name="home-outline" color="#515e5a" size={24} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="account-outline" color="#515e5a" size={24} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="bookmark-outline" color="#515e5a" size={24} />
              )}
              label="Bookmarks"
              onPress={() => {
                props.navigation.navigate("CompleteProfileScreen");
              }}
            />
            <DrawerItem
              icon={() => (
                <Ionicon name="settings-outline" color="#515e5a" size={24} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate("SettingsScreen");
              }}
            />
            <DrawerItem
              icon={() => (
                <Icon name="account-check-outline" color="#515e5a" size={24} />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate("SupportScreen");
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="Preferences">
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
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => <Icon name="exit-to-app" color="#515e5a" size={24} />}
          label="Sign out"
          onPress={() => {
            logout();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
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
