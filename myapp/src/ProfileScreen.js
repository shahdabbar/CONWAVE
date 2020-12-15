import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { AuthContext } from "./AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

axios.defaults.baseURL = "http://10.0.2.2:8000";

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    name: "",
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
          name: response.data.name,
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
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={require("../assets/images/avatar2.png")}
            size={80}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[{ ...styles.title, marginTop: 15, marginBottom: 5 }]}
            >
              {userInfo.name}
            </Title>
            <Caption style={styles.caption}>@{userInfo.type}</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userInfo.location}, Lebanon
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +961-76 638 758
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {userInfo.email}
          </Text>
        </View>
      </View>
      {userInfo.type === "tutor" ? (
        <View style={styles.infoBoxWrapper}>
          <View
            style={{
              ...styles.infoBox,
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            }}
          >
            <Title>140</Title>
            <Caption style={{ fontSize: 17, color: "black" }}>
              Hours Tutored
            </Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>50</Title>
            <Caption style={{ fontSize: 17, color: "black" }}>
              Students Tutored
            </Caption>
          </View>
        </View>
      ) : null}
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#000000" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#000000" size={25} />
            <Text style={styles.menuItemText}>Your favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#000000" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="settings-outline" color="#000000" size={25} />
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
