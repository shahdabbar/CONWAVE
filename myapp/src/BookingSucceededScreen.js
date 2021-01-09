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
  SafeAreaView,
  BackgroundImage,
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
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "./constants";
import axios from "axios";

const BookingSucceededScreen = ({ route, navigation }) => {
  const { colors } = useTheme();

  const onClick = () => {
    // const newData = data.courses.map((e) => {
    //   return {
    //     ...e,
    //     rate: data.rate,
    //   };
    // });
    // axios
    //   .post("api/tutor/courses", newData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // navigation.navigate("Courses");
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.2 }}>
        <TouchableOpacity
          style={{
            position: "absolute",
            marginHorizontal: 16,
            marginVertical: 30,
            right: 2,
          }}
        >
          <FontAwesome
            name="close"
            size={36}
            color={COLORS.black}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.7,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: COLORS.black }}
          >
            Congrats!
          </Text>
          <Text style={{ fontSize: 19, fontStyle: "italic" }}>
            You can now chat with your tutor
          </Text>
        </View>
        <View>
          <Image source={icons.fireworks} resizeMode="center" />
        </View>
      </View>

      <View style={{ flex: 0.4 }}>
        <TouchableOpacity onPress={() => {}}>
          <LinearGradient
            colors={["#000000", "#000000"]}
            style={{ ...styles.button, borderColor: COLORS.pink }}
          >
            <Text style={styles.text}>Go to chat</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("StudentSessionsStackScreen", {
              screen: "StudentsSessions",
            });
          }}
        >
          <LinearGradient
            colors={[COLORS.white, COLORS.white]}
            style={{
              ...styles.button,
              borderColor: COLORS.beige,
              borderWidth: 3,
            }}
          >
            <Text style={{ ...styles.text, color: COLORS.pink }}>
              View session
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSucceededScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    borderColor: COLORS.beige,
    borderWidth: 2,
    borderTopRightRadius: SIZES.radius * 4,
    borderBottomLeftRadius: SIZES.radius * 4,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    // elevation: 100,
    elevation: 5,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  text: {
    margin: 30,
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    color: COLORS.white,
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "flex-end",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
