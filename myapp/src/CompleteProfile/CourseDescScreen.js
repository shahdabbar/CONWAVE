import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const CourseDescScreen = ({ route, navigation }) => {
  const data = route.params.data
    ? route.params.data.map((e) => {
        return {
          ...e,
          course_decsription: "",
        };
      })
    : null;
  const [courses, setCourses] = useState(data);
  console.log(courses);

  const onValueChange = (item, text) => {
    const newData = courses.map((e) => {
      if (e.id === item.id) {
        return {
          ...e,
          course_description: text,
        };
      }
      return {
        ...e,
        course_decsription: e.course_decsription,
      };
    });
    setCourses(newData);
  };

  const displayCourses = () => {
    return (
      <View>
        {courses ? (
          <FlatList
            data={courses}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View>
                    <Text style={styles.text}>{item.name}</Text>
                  </View>
                  <View style={styles.action}>
                    <TextInput
                      style={styles.textinput}
                      placeholder="Start Typing"
                      placeholderTextColor="#666"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(text) => {
                        onValueChange(item, text);
                      }}
                      underlineColorAndroid="transparent"
                    ></TextInput>
                  </View>
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.warning}>
        <Text style={styles.paragraph}>
          Please specify more what you are going to teach in each course..
        </Text>
      </View>
      <View style={{ marginBottom: 40 }}>
        <ScrollView>{displayCourses()}</ScrollView>
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("SetRate", { data: courses })}
        >
          <LinearGradient colors={["#ff01ff", "#ffd200"]} style={styles.next}>
            <Text style={styles.next_text}>NEXT</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseDescScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    marginTop: 10,
    paddingLeft: 25,
    fontSize: 20,
    fontWeight: "bold",
  },
  warning: {
    backgroundColor: "#ffd200",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  action: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: COLORS.yellow,
    // paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  textinput: {
    padding: 10,
    fontSize: 20,
    height: 150,
    textAlignVertical: "top",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    position: "absolute",
    bottom: 40,
    elevation: 5,
    alignSelf: "flex-end",
  },
  next: {
    position: "absolute",
    backgroundColor: "#fff",
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
