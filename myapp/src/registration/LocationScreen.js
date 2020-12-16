import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DropDownPicker from "react-native-dropdown-picker";
import Svg, { Image, Circle, ClipPath } from "react-native-svg";
import Animated, { block, Easing } from "react-native-reanimated";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

function LocationScreen({ route, navigation }) {
  const { width, height } = Dimensions.get("screen");

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    location: "",
    type: route.params.type,
    gender: route.params.gender,
  });

  console.log(state.gender);

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
      <Animatable.View animation="slideInLeft" style={styles.header}>
        <Text style={styles.text_header}>
          What's your name and where do you live?
        </Text>
      </Animatable.View>
      <Animatable.View style={styles.footer} animation="lightSpeedIn">
        <Animated.View animation="lightSpeedIn">
          <View>
            <View style={styles.action}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                placeholder="First name"
                style={styles.input}
                autoCapitalize="none"
                textContentType="name"
                onChangeText={(value) =>
                  setState({ ...state, firstname: value })
                }
              />
            </View>
          </View>
          <View>
            <View style={styles.action}>
              <FontAwesome name="user" size={20} style={styles.icon} />
              <TextInput
                placeholder="Last name"
                style={styles.input}
                autoCapitalize="none"
                textContentType="familyName"
                onChangeText={(value) =>
                  setState({ ...state, lastname: value })
                }
              />
            </View>
          </View>
        </Animated.View>
        <View>
          {/* <DropDownPicker
            items={[
              {
                label: "USA",
                value: "usa",
                icon: () => <Icon name="flag" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: "UK",
                value: "uk",
                icon: () => <Icon name="flag" size={18} color="#900" />,
                hidden: true,
              },
              {
                label: "France",
                value: "france",
                icon: () => <Icon name="flag" size={18} color="#900" />,
                hidden: true,
              },
            ]}
            defaultValue={state.location}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: "#fafafa" }}
            itemStyle={{ justifyContent: "flex-start" }}
            dropDownStyle={{ backgroundColor: "#fafafa" }}
            onChangeItem={(item) => setState({ location: item.value })}
          /> */}

          <Picker
            selectedValue={state.location}
            style={{
              height: "50%",
              width: "90%",
              marginHorizontal: 20,
            }}
            onValueChange={(itemValue, itemIndex) => {
              if (itemValue) {
                setState({
                  ...state,
                  location: itemValue,
                });
              } else {
              }
            }}
          >
            <Picker.Item label="Choose Your Location" value="" />
            <Picker.Item label="Beirut" value="Beirut" />
            <Picker.Item label="Sayda" value="Sayda" />
            <Picker.Item label="Ra's Bayrut" value="Ra's Bayrut" />
            <Picker.Item label="Zahle" value="Zahle" />
            <Picker.Item label="Byblos" value="Byblos" />
            <Picker.Item label="Jounieh" value="Jounieh" />
          </Picker>
        </View>
        <Animated.View animation="lightSpeedIn">
          <View>
            <TouchableOpacity
              // disabled
              onPress={() => {
                navigation.navigate("SignUpScreen", { data: state });
              }}
            >
              <LinearGradient
                colors={["#c6b893", "orange"]}
                style={styles.button}
              >
                <Text style={styles.textSign}>NEXT</Text>
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

export default LocationScreen;

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
    color: "#000",
    fontSize: 30,
    fontWeight: "bold",
    flex: 1,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    height: 70,
    marginHorizontal: 5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    marginHorizontal: 5,
    marginVertical: 5,
    borderColor: "orange",
    paddingLeft: 10,
    backgroundColor: "white",
  },
  // d02860
  arrow_icon: {
    flexDirection: "row",
    marginTop: 40,
    marginLeft: 20,
  },
  icon: {
    flexDirection: "row",
    marginTop: 25,
    paddingLeft: 10,
  },
  textInput: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    flex: 1,
    paddingLeft: 40,
  },
  input: {
    paddingLeft: 10,
    fontSize: 17,
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

  itemSeparatorStyle: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
  },
  searchBarContainerStyle: {
    marginBottom: 10,
    flexDirection: "row",
    height: 40,
    shadowOpacity: 1.0,
    shadowRadius: 5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 10,
    elevation: 3,
    marginLeft: 10,
    marginRight: 10,
  },

  selectLabelTextStyle: {
    color: "#000",
    textAlign: "left",
    width: "99%",
    padding: 10,
    flexDirection: "row",
  },
  placeHolderTextStyle: {
    color: "#D3D3D3",
    padding: 10,
    textAlign: "left",
    width: "99%",
    flexDirection: "row",
  },
  dropDownImageStyle: {
    marginLeft: 10,
    width: 10,
    height: 10,
    alignSelf: "center",
  },
  listTextViewStyle: {
    color: "#000",
    marginVertical: 10,
    flex: 0.9,
    marginLeft: 20,
    marginHorizontal: 10,
    textAlign: "left",
  },
  pickerStyle: {
    marginLeft: 18,
    elevation: 3,
    paddingRight: 25,
    marginRight: 10,
    marginBottom: 2,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    shadowRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    borderRadius: 5,
    flexDirection: "row",
  },
});
