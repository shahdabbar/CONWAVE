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
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import DropShadow from "react-native-drop-shadow";
import { useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import axios from "axios";

axios.defaults.baseURL = "http://10.0.2.2:8000";

const EditProfileScreen = ({ route, navigation }) => {
  const { colors } = useTheme();

  const [user, setUser] = useState({
    firstname: route.params.data.firstname,
    lastname: route.params.data.lastname,
    email: route.params.data.email,
    location: route.params.data.location,
  });

  const [image, setImage] = useState(null);

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
      // axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      // axios
      //   .post("api/profile/photo", image)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error.response);
      //   });
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
    <SafeAreaView style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
      />
      <ScrollView>
        {/* <View style={styles.titleBar}>
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            color="gray"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Text style={styles.edit}>PROFILE SETTINGS</Text>
          <Ionicon name="md-ellipsis-vertical" size={30} color="gray" />
        </View> */}
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../assets/images/profile4.png")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.active}></View>
            <View style={styles.add}>
              <Ionicon
                name="camera"
                size={48}
                color="#DFDBC8"
                style={{ marginBottom: 2, marginLeft: 1 }}
                onPress={() => bs.current.snapTo(0)}
              />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <Text style={{ ...styles.text, fontWeight: "200", fontSize: 36 }}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={{ ...styles.text, color: "#AEB5BC", fontSize: 17 }}>
              {user.email}
            </Text>
          </View>

          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <LinearGradient
              colors={["#CABFAB", COLORS.primary]}
              style={{
                borderRadius: SIZES.radius / 2,
                elevation: 5,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.info }}>Personal Information</Text>
                </View>

                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="user" size={22} color={COLORS.dark} />
                    <Text style={styles.infoText}>{user.firstname}</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>
                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="user" size={22} color={COLORS.dark} />
                    <Text style={styles.infoText}>{user.lastname}</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>
                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome name="phone" size={20} color={COLORS.dark} />
                    <Text style={styles.infoText}>+961 76 638 758</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>

                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="gender-male-female"
                      size={25}
                      color={COLORS.dark}
                    />
                    <Text style={styles.infoText}>Female</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#CABFAB", COLORS.primary]}
              style={{
                borderRadius: SIZES.radius / 2,
                elevation: 5,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.info }}>Search location</Text>
                </View>

                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicon name="location" size={22} color={COLORS.dark} />
                    <Text style={styles.infoText}>{user.location}</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#CABFAB", COLORS.primary]}
              style={{
                borderRadius: SIZES.radius / 2,
                elevation: 5,
                padding: 10,
                marginBottom: 10,
              }}
            >
              <View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ ...styles.info }}>Education</Text>
                </View>

                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="university"
                      size={20}
                      color={COLORS.dark}
                    />
                    <Text style={styles.infoText}>
                      Lebanese International University
                    </Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>

                <View style={styles.infoContent}>
                  <View
                    style={{
                      ...styles.infoContent,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="book-open-page-variant"
                      size={22}
                      color={COLORS.dark}
                    />
                    <Text style={styles.infoText}>Computer Science</Text>
                  </View>

                  <Icon name="pencil" size={24} />
                </View>
              </View>
            </LinearGradient>

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
            {/* <View style={styles.action}>
          <FontAwesome name="envelope-o" size={20} color={colors.text} />
          <TextInput
            placeholder="Email"
            defaultValue={user.email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={{ ...styles.textInput, color: colors.text }}
          />
        </View> */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  edit: {
    color: "gray",
    fontWeight: "800",
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#41444B",
  },
  subText: {
    fontSize: 14,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 28,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 22,
    left: 20,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 5,
    right: 0,
    padding: 4,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 5,
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
    fontSize: 17,
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
  infoText: {
    fontWeight: "800",
    fontSize: 20,
    paddingLeft: 10,
  },
  infoContent: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
