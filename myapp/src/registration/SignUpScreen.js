import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  TextPropTypes,
  StatusBar,
} from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../AuthProvider";

const SignInScreen = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("screen");
  const { signup, error } = useContext(AuthContext);

  const [data, setData] = React.useState({
    name: route.params.data.name,
    email: "",
    type: route.params.data.type,
    location: route.params.data.location,
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  console.log("type", data.type, data.name, data.location);
  const textInputChange = (value) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (value) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPasswordChange = (value) => {
    setData({
      ...data,
      confirm_password: value,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFill,
          // transform: [{ translateY: this.bgY }],
        }}
      >
        <Svg height={height + 50} width={width}>
          <ClipPath id="clip">
            <Circle r={height + 50} cx={width / 2} />
          </ClipPath>
          <Image
            href={require("../../assets/images/bg.jpg")}
            width={width}
            height={height + 50}
            preserveAspectRatio="xMidYMid slice"
            ClipPath="url(#clip)"
          />
        </Svg>
      </Animated.View>
      <View>
        <MaterialIcons
          style={styles.arrow_icon}
          name="arrow-back"
          color="#000"
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Your Account!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.action}>
          <FontAwesome
            name="envelope"
            color="black"
            size={20}
            style={styles.icon}
          />
          <TextInput
            placeholder="email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => textInputChange(value)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather
                style={{ ...styles.icon, marginRight: 15 }}
                name="check-circle"
                color="green"
                size={20}
              />
            </Animatable.View>
          ) : null}
        </View>
        <View style={styles.action}>
          <FontAwesome
            style={styles.icon}
            name="lock"
            color="black"
            size={25}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => handlePasswordChange(value)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather
                style={{ ...styles.icon, marginRight: 15 }}
                name="eye-off"
                color="grey"
                size={20}
              />
            ) : (
              <Feather
                style={{ ...styles.icon, marginRight: 15 }}
                name="eye"
                color="grey"
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <FontAwesome
            style={styles.icon}
            name="lock"
            color="black"
            size={25}
          />
          <TextInput
            placeholder="confirm password"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => handleConfirmPasswordChange(value)}
          />
          <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather
                style={{ ...styles.icon, marginRight: 15 }}
                name="eye-off"
                color="grey"
                size={20}
              />
            ) : (
              <Feather
                style={{ ...styles.icon, marginRight: 15 }}
                name="eye"
                color="grey"
                size={20}
              />
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Animated.View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  signup(
                    data.name,
                    data.email,
                    data.type,
                    data.location,
                    data.password,
                    data.confirm_password
                  )
                }
              >
                <LinearGradient
                  colors={["#c6b893", "#d02860"]}
                  style={styles.button}
                >
                  <Text style={styles.textSign}>SIGN UP</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#474747" }}>Already have an account?</Text>
            <Text
              style={{ color: "blue", marginLeft: 4 }}
              onPress={() => navigation.goBack()}
            >
              Sign In
            </Text>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    marginHorizontal: 30,
    // marginVertical: 50,
  },
  footer: {
    flex: 3,
    opacity: 0.5,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    marginTop: 30,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  ttt: {
    color: "#474747",
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    borderColor: "orange",
    paddingLeft: 10,
    backgroundColor: "white",
  },
  // d02860
  icon: {
    flexDirection: "row",
    marginTop: 22,
    paddingLeft: 10,
  },
  textInput: {
    // marginBottom: 30,

    flex: 1,
    color: "#05375a",
    paddingLeft: 10,
  },
  arrow_icon: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
