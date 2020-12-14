import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Image,
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
// import axios from "axios";

// axios.defaults.baseURL = "http://10.0.2.2:8000";

const EditProfileScreen = ({ route }) => {
  const { colors } = useTheme();

  const [user, setUser] = useState({
    name: route.params.data.name,
    email: route.params.data.email,
    location: route.params.data.location,
  });

  const [image, setImage] = useState(
    "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmyapp-b4e7cd70-8fd6-42af-bf1b-7a07e7f1abe1/ImagePicker/665a8652-9a82-4fbc-ab54-115f96304690.jpgfile:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fmyapp-b4e7cd70-8fd6-42af-bf1b-7a07e7f1abe1/ImagePicker/665a8652-9a82-4fbc-ab54-115f96304690.jpg"
  );

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      bs.current.snapTo(1);
    }
  };
  console.log(image);

  const onTextChange = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={["#c6b893", "#d02860"]}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <LinearGradient
          colors={["#c6b893", "#d02860"]}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          bs.current.snapTo(1);
        }}
      >
        <LinearGradient
          colors={["#c6b893", "#d02860"]}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle}></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: image }}
                // source={require("../assets/avatar2.png")}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 50 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    // justifyContent: "center",
                  }}
                >
                  <Icon
                    name="camera"
                    size={35}
                    color="gray"
                    style={{
                      opacity: 0.7,
                      alignItems: "center",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: "#fff",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text
            style={{
              marginTop: 10,
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            {user.name}
          </Text>
        </View>

        <View>
          <Text style={styles.info}>Personal Information</Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" size={20} color={colors.text} />
          <TextInput
            placeholder="Name"
            name="name"
            defaultValue={user.name}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
            onChangeText={onTextChange}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" size={20} color={colors.text} />
          <TextInput
            placeholder="Phone"
            defaultValue="+961 76 638 758"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} color={colors.text} />
          <TextInput
            placeholder="Email"
            defaultValue={user.email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" size={20} color={colors.text} />
          <TextInput
            placeholder="Country"
            defaultValue="Lebanon"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" size={22} color={colors.text} />
          <TextInput
            placeholder="City"
            name="location"
            defaultValue={user.location}
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
            onChangeText={onTextChange}
          />
        </View>
        <Animated.View>
          <View>
            <TouchableOpacity onPress={() => {}}>
              <LinearGradient
                colors={["#c6b893", "#A8D9F8"]}
                style={styles.button}
              >
                <Text style={styles.panelButtonTitle}>Update</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 0 },
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  info: {
    color: "gray",
    fontSize: 14,
    marginBottom: 10,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 25,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 30,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -5,
    paddingLeft: 10,
    color: "#05375a",
  },
});
