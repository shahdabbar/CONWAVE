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
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import axios from "axios";
import { color } from "react-native-reanimated";

const SessionTypeScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={{ marginBottom: 10 }}>
          <Text
            style={{
              ...styles.subtext,
              color: COLORS.black,
              fontWeight: "bold",
            }}
          >
            Select Session Type
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 10,
              }}
            >
              <View>
                <Feather name="users" size={30} color={COLORS.blue} />
              </View>
              <View style={{ left: 20 }}>
                <Text style={styles.text}>In-Person Session</Text>
                <Text style={styles.subtext}>
                  Meet your student face to face
                </Text>
              </View>
            </View>

            <View>
              <Ionicon
                name="ios-chevron-forward"
                size={30}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              height: 0.5,
              width: "100%",
              backgroundColor: "#C8C8C8",
            }}
          />
          <TouchableOpacity
            style={{
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingLeft: 10,
              }}
            >
              <View>
                <FontAwesome name="tv" size={25} color={COLORS.primary} />
              </View>
              <View style={{ left: 20 }}>
                <Text style={styles.text}>Online Session</Text>
                <Text style={styles.subtext}>Have a video call session</Text>
              </View>
            </View>

            <View>
              <Ionicon
                name="ios-chevron-forward"
                size={30}
                color={COLORS.black}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SessionTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    margin: 10,
  },
  text: {
    marginHorizontal: 5,
    marginTop: 4,
    fontWeight: "800",
    color: "#000000",
    ...FONTS.h2,
  },
  subtext: {
    marginHorizontal: 5,
    fontWeight: "800",
    color: "gray",
    fontSize: 17,
  },
});
