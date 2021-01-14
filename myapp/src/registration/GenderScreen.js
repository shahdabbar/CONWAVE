import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LocationScreen from "./LocationScreen";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { block, Easing } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, SIZES } from "../constants";

function GenderScreen({ route, navigation }) {
  const { width, height } = Dimensions.get("screen");

  //   const [state, setState] = useState({ type: route.params.type, gender: "" });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
        }}
      >
        <Svg height={height + 50} width={width + 50}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("../../assets/images/dark.jpg")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            ClipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View>
        <MaterialIcons
          style={styles.icon}
          name="arrow-back"
          color={COLORS.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Animatable.View animation="slideInLeft" style={styles.header}>
        <Text style={styles.text_header}>Please select your gender</Text>
        <Text style={styles.textInput}></Text>
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="lightSpeedIn">
        <Animated.View animation="lightSpeedIn">
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LocationScreen", {
                  type: route.params.type,
                  gender: "Male",
                });
              }}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.yellow2]}
                style={styles.button}
              >
                <Text style={styles.textSign}>Male</Text>
                <MaterialIcons
                  style={{ marginLeft: 20 }}
                  name="navigate-next"
                  color="#000"
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <Animated.View animation="lightSpeedIn">
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LocationScreen", {
                  type: route.params.type,
                  gender: "Female",
                });
              }}
            >
              <LinearGradient
                colors={[COLORS.darkpink, COLORS.primary]}
                style={styles.button}
              >
                <Text style={styles.textSign}>Female</Text>
                <MaterialIcons
                  style={{ marginLeft: 10 }}
                  name="navigate-next"
                  color="#000"
                  size={30}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animatable.View>
    </View>
  );
}

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 30,
    marginVertical: 50,
  },
  footer: {
    flex: 3,
    opacity: 0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 10,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },

  icon: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20,
  },
  textInput: {
    marginHorizontal: 20,
    flex: 1,
    color: "#474747",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 2,
  },

  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
