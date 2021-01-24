import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const SessionTypeScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(route.params.course);

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.beige, COLORS.white]}>
        <View style={{ paddingTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color={COLORS.black3}
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.goBack("SessionType");
              }}
            />
            <View style={{ left: 10 }}>
              <View>
                <Text
                  style={{
                    ...styles.infoText,
                    color: COLORS.black3,
                  }}
                >
                  Select Session{" "}
                  <Text style={{ color: COLORS.pink }}>Type</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.wrapper}>
            <View>
              <TouchableOpacity
                style={{
                  marginBottom: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("SearchTutor", {
                    course: course,
                    type: "In-person",
                  });
                }}
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
                onPress={() => {
                  navigation.navigate("SearchTutor", {
                    course: course,
                    type: "Online",
                  });
                }}
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
                    <Text style={styles.subtext}>
                      Have a video call session
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
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SessionTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 60,
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
  infoText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtext: {
    marginHorizontal: 5,
    fontWeight: "800",
    color: "gray",
    fontSize: 17,
  },
});
