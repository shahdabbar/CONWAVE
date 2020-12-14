import {
  TapGestureHandler,
  RotationGestureHandler,
  State,
} from "react-native-gesture-handler";
import React, { Component, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { Easing } from "react-native-reanimated";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext } from "./AuthProvider";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
}

class MyApp extends Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      isValidUser: true,
      isValidPassword: true,
    };

    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3 - 110, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });

    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  textInputChange = (value) => {
    if (value.trim().length >= 4) {
      this.setState({
        ...this.state,
        email: value,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      this.setState({
        ...this.state,
        email: value,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  handlePasswordChange = (value) => {
    if (value.trim().length >= 8) {
      this.setState({
        ...this.state,
        password: value,
        isValidPassword: true,
      });
    } else {
      this.setState({
        ...this.state,
        password: value,
        isValidPassword: false,
      });
    }
  };

  updateSecureTextEntry = () => {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  };

  handleValidUser = (value) => {
    if (value.length >= 4) {
      this.setState({
        ...this.state,
        isValidUser: true,
      });
    } else {
      this.setState({
        ...this.state,
        isValidUser: false,
      });
    }
  };

  // loginHandle = () => {
  //   this.props.navigation.navigate("MainTabScreen");
  //   // const foundUser = Users.filter((item) => {
  //   //   return username == item.username && password == item.password;
  //   // });
  //   // if (this.state.username.length == 0 || this.state.password.length == 0) {
  //   //   Alert.alert(
  //   //     "Wrong Input!",
  //   //     "Username or password field cannot be empty.",
  //   //     [{ text: "Okay" }]
  //   //   );
  //   //   return;
  //   // }
  //   // if (foundUser.length == 0) {
  //   //   Alert.alert("Invalid User!", "Username or password is incorrect", [
  //   //     { text: "Okay" },
  //   //   ]);
  //   //   return;
  //   // }
  //   // signIn();
  // };

  render() {
    const { login, error } = this.context;

    return (
      <View style={styles.container}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{ translateY: this.bgY }],
          }}
        >
          <Svg height={height + 50} width={width + 50}>
            <ClipPath id="clip">
              <Circle r={height + 50} cx={width / 2} />
            </ClipPath>
            <Image
              href={require("../assets/images/bg.jpg")}
              width={width}
              height={height + 50}
              preserveAspectRatio="xMidYMid slice"
              ClipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={styles.header}>
          <Text style={{ ...styles.title }}>Stay connected with everyone!</Text>
          <Text style={styles.ttt}>Sign in with account</Text>
        </View>
        <View style={styles.footer}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                opacity: this.buttonOpacity,
                transform: [{ translateY: this.buttonY }],
              }}
            >
              <View>
                <TouchableOpacity>
                  <LinearGradient
                    colors={["white", "#c6b893"]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>SIGN IN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              opacity: this.buttonOpacity,
              transform: [{ translateY: this.buttonY }],
            }}
          >
            <View>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("TypeScreen")}
              >
                {/* d02860 */}
                <LinearGradient
                  colors={["#c6b893", "#d02860"]}
                  style={styles.button}
                >
                  <Text style={styles.text}>Create an account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{ translateY: this.textInputY }],
              ...StyleSheet.absoluteFill,
              ...styles.signin,
            }}
          >
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    fontSize: 15,
                    transform: [{ rotate: concat(this.rotateCross, "deg") }],
                  }}
                >
                  <FontAwesome name="times" color={"#d02860"} size={30} />
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>
            {this.context.error && (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{this.context.error}</Text>
              </Animatable.View>
            )}
            <View style={styles.action}>
              <FontAwesome name="envelope" size={20} style={styles.icon} />
              <TextInput
                placeholder="email"
                style={styles.textInput}
                autoCapitalize="none"
                textContentType="emailAddress"
                onChangeText={(value) => this.textInputChange(value)}
                onEndEditing={(e) => this.handleValidUser(e.nativeEvent.text)}
              />
              {this.state.check_textInputChange ? (
                <Animatable.View
                  style={{ ...styles.icon, marginRight: 15 }}
                  animation="bounceIn"
                >
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>

            <View style={styles.action}>
              <FontAwesome name="lock" size={25} style={styles.icon} />
              <TextInput
                placeholder="password"
                secureTextEntry={this.state.secureTextEntry ? true : false}
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(value) => this.handlePasswordChange(value)}
              />
              <TouchableOpacity
                style={{ ...styles.icon, marginRight: 15 }}
                onPress={this.updateSecureTextEntry}
              >
                {this.state.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {this.state.isValidPassword ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
            <TouchableOpacity>
              <Text style={styles.forgotpassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Animated.View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    console.log(this.state.email, this.state.password);
                    this.context.login(this.state.email, this.state.password);
                  }}
                >
                  <LinearGradient
                    colors={["#c6b893", "#d02860"]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>SIGN IN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    );
  }
}

export default MyApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  header: {
    marginVertical: 60,
  },
  footer: {
    height: height / 3,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    // elevation: 100,
  },
  ttt: {
    color: "gray",
    fontSize: 17,
    marginTop: 5,
    marginHorizontal: 30,
    // marginLeft: 20,
    // marginRight: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    // marginLeft: 20,
    // marginRight: 20,
    marginHorizontal: 30,
  },
  signin: {
    height: height / 3,
    top: null,
    justifyContent: "center",
  },
  action: {
    flexDirection: "row",
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#d02860",
    paddingLeft: 10,
  },
  icon: {
    flexDirection: "row",
    marginTop: 14,
    paddingLeft: 10,
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "#FDFDFD",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -35,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 2,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
  },
  errorMsg: {
    color: "#d80000",
    marginLeft: 30,
  },
  forgotpassword: {
    color: "#474747",
    marginLeft: 30,
    fontSize: 12,
    marginBottom: 10,
  },
});
// 05375a
