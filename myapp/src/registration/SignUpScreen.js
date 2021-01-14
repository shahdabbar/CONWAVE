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
} from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { AuthContext } from "../AuthProvider";
import { COLORS, SIZES } from "../constants";

const SignInScreen = ({ route, navigation }) => {
  const { width, height } = Dimensions.get("screen");
  const { signup, error } = useContext(AuthContext);

  const [data, setData] = React.useState({
    firstname: route.params.data.firstname,
    lastname: route.params.data.lastname,
    email: "",
    type: route.params.data.type,
    location: route.params.data.location,
    gender: route.params.data.gender,
    phone_number: "",
    password: "",
    confirm_password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

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
    if (value.trim().length >= 8) {
      setData({
        ...data,
        password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: value,
        isValidPassword: false,
      });
    }
  };

  const handleConfirmPasswordChange = (value) => {
    if (value.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: value,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: value,
        isValidPassword: false,
      });
    }
  };

  const textNumberChange = (value) => {
    setData({
      ...data,
      phone_number: value,
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
          style={styles.arrow_icon}
          name="arrow-back"
          color={COLORS.white}
          size={30}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.text_header}>Create Your Account!</Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        {error && (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>{error}</Text>
          </Animatable.View>
        )}
        <View style={styles.action}>
          <FontAwesome
            name="envelope"
            color="black"
            size={20}
            style={styles.icon}
          />
          <TextInput
            placeholder="email"
            keyboardType="email-address"
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
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}
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
        {/* <View>
          <Text style={styles.text_footer}>
            We need your number to send you a verfivation code.
          </Text>
        </View> */}
        <View style={styles.action}>
          <FontAwesome
            name="phone"
            color="black"
            size={20}
            style={styles.icon}
          />
          <TextInput
            placeholder="71 123 456"
            style={styles.textInput}
            textContentType="telephoneNumber"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={(value) => textNumberChange(value)}
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
        <View>
          <Animated.View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  signup(
                    data.firstname,
                    data.lastname,
                    data.gender,
                    data.email,
                    data.type,
                    data.location,
                    data.phone_number,
                    data.password,
                    data.confirm_password
                  )
                }
              >
                <LinearGradient
                  colors={[COLORS.darkpink, COLORS.primary]}
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
              style={{ color: COLORS.pink, marginLeft: 4 }}
              onPress={() => navigation.navigate("SplashScreen")}
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
    justifyContent: "space-around",
    marginHorizontal: 30,
  },
  footer: {
    flex: 6,
    opacity: 0.5,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: COLORS.white,
    fontSize: 30,
    fontWeight: "bold",
  },
  text_footer: {
    margin: 16,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 5,
    borderRadius: SIZES.radius,
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
    borderRadius: SIZES.radius,
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
    fontSize: 16,
    color: COLORS.black3,
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
  errorMsg: {
    color: "#d80000",
    marginLeft: 30,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
