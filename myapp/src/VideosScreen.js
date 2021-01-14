import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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
import { AuthContext } from "./AuthProvider";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import { Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";

import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const VideosScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get("api/user/videos")
      .then((response) => {
        setVideo(response.data[0]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <MaterialIcon
          name="arrow-back-ios"
          size={24}
          color="gray"
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.text}>videos</Text>
        <Ionicon
          name="md-ellipsis-vertical"
          size={30}
          color="gray"
          style={{ marginRight: 16 }}
          onPress={() => {}}
        />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.mediaVideoContainer}>
          <Video
            source={require("../assets/images/video4.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        </View>
        <View style={styles.mediaVideoContainer}>
          <Video
            source={require("../assets/images/video1.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        </View>
        <View style={styles.mediaVideoContainer}>
          <Video
            source={require("../assets/images/video3.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        </View>
        <View style={styles.mediaVideoContainer}>
          <Video
            source={require("../assets/images/video2.mp4")}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        </View>
      </ScrollView>
    </View>
  );
};

//  source={{ uri: `http://192.168.0.107:8000/${video.video_path}` }}

export default VideosScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 65,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 19,
    color: COLORS.pink,
    textTransform: "uppercase",
  },
  video: {
    width: width,
    height: height / 3,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  mediaVideoContainer: {
    width: "90%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
    marginVertical: SIZES.padding,
  },
});
