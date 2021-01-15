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

const AddRateScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [data, setData] = useState({
    courses: route.params.data,
    rate: 0,
  });
  const { user } = useContext(AuthContext);
  console.log(data.courses);
  console.log(data);

  const onClick = () => {
    const newData = data.courses.map((e) => {
      return {
        ...e,
        rate: data.rate,
      };
    });
    axios
      .post("api/tutor/courses", newData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    navigation.navigate("Courses");
  };

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <TextInput
          style={{ fontSize: 20 }}
          placeholder="Start Typing"
          placeholderTextColor="#666"
          onChangeText={(text) => setData({ ...data, rate: text })}
          underlineColorAndroid="transparent"
        ></TextInput>
      </View>
      <View>
        <Text style={styles.text}>Total: {data.rate} LBP/h</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onClick()}
        >
          <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
            <Text style={styles.next_text}>NEXT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: SIZES.radius,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: COLORS.yellow,
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  text: {
    margin: 30,
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonContainer: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    position: "absolute",
    bottom: 0,
    top: 400,
    elevation: 5,
    alignSelf: "flex-end",
  },
  next: {
    position: "absolute",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "100%",
    height: 70,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
