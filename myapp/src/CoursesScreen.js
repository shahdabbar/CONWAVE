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
} from "react-native";
import { useTheme } from "@react-navigation/native";
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
import axios from "axios";

const CoursesScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const { user } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <View style={styles.placeholder_box}>
        <TouchableOpacity
          style={{ marginTop: -60 }}
          onPress={() => navigation.navigate("AddCourse")}
        >
          <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.button}>
            <Image
              source={icons.plus}
              resizeMode="contain"
              imageStyle={{ borderRadius: 16 }}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <View>
          <Text style={{ ...FONTS.h1, fontWeight: "bold" }}>My Courses</Text>
        </View>
      </View>
    </View>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: "#fff",
  },
  add: {
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder_box: {
    position: "relative",
    display: "flex",
    width: "98%",
    alignSelf: "center",
    minHeight: "90%",
    marginTop: 40,
    padding: 30,
    borderColor: "#ffd200",
    borderBottomRightRadius: 10,
    borderRadius: 10,
    elevation: 10,
    marginHorizontal: 10,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ffd200",
    borderWidth: 2,
    width: 100,
    alignSelf: "center",
    borderRadius: 50,
    color: "white",
    marginBottom: 15,
    padding: 15,
  },
  image: {
    borderBottomRightRadius: 65,
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
    opacity: 0.5,
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
