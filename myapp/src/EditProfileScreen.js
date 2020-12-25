import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  Modal,
  Button,
} from "react-native";
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
import {
  Checkbox,
  useTheme,
  Card,
  CardItem,
  CardHeader,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";

import Constants from "expo-constants";
import axios from "axios";
import { curveBasis } from "d3-shape";
// axios.defaults.baseURL = "http://192.168.0.1:8000";

const EditProfileScreen = ({ route, navigation }) => {
  const { user, logout } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  const { colors } = useTheme();

  const [update, setUpdate] = useState({ updateName: "", updateValue: "" });
  const [updatePro, setUpdatePro] = useState({
    updateName: "",
    updateValue: "",
  });

  const [modalOpen, setModalOpen] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  });

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    email: "",
    location: "",
    type: "",
    phone_number: "",
    imagePath: "",
  });

  const [profileInfo, setProfileInfo] = useState({
    bio: "",
    university: "",
    major: "",
    degree: "",
    hours_tutored: "",
    students_tutored: "",
    graduation_date: "",
  });

  const [image, setImage] = useState(null);

  const HandleSubmit = () => {
    let formData = new FormData();
    if (image && Object.keys(image).length > 0) {
      let fileType = image.substring(image.lastIndexOf(".") + 1);
      formData.append("profile_photo_path", {
        uri: image,
        name: `image.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    axios
      .post("api/user/photo", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("api/profile")
      .then((response) => {
        setProfileInfo({
          ...profileInfo,
          bio: response.data.bio,
          university: response.data.university,
          major: response.data.major,
          degree: response.data.degree,
          hours_tutored: response.data.hours_tutored,
          students_tutored: response.data.students_tutored,
          graduation_date: response.data.graduation_date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("api/user")
      .then((response) => {
        console.log(response.data);

        setUserInfo({
          ...userInfo,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          gender: response.data.gender,
          email: response.data.email,
          location: response.data.location,
          type: response.data.type,
          phone_number: response.data.phone_number,
          imagePath: response.data.profile_photo_path,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    console.log("image path", userInfo.imagePath);
    // (async () => {
    //   if (Platform.OS !== "web") {
    //     const {
    //       status,
    //     } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //     if (status !== "granted") {
    //       alert("Sorry, we need camera roll permissions to make this work!");
    //     }
    //   }
    // })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      HandleSubmit();
      bs.current.snapTo(1);
    }
  };

  const updateUser = () => {
    var data = "";
    if (update.updateName === "firstname") {
      data = { firstname: update.updateValue };
      setUserInfo({ ...userInfo, firstname: update.updateValue });
    } else if (update.updateName === "lastname") {
      data = { lastname: update.updateValue };
      setUserInfo({ ...userInfo, lastname: update.updateValue });
    } else if (update.updateName === "gender") {
      data = { gender: update.updateValue };
      setUserInfo({ ...userInfo, gender: update.updateValue });
    } else if (update.updateName === "phone_number") {
      data = { phone_number: update.updateValue };
      setUserInfo({ ...userInfo, phone_number: update.updateValue });
    } else if (update.updateName === "location") {
      data = { location: update.updateValue };
      setUserInfo({ ...userInfo, location: update.updateValue });
    }

    axios
      .post("api/user/update", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateProfile = () => {
    var data = "";
    if (updatePro.updateName === "bio") {
      data = { bio: updatePro.updateValue };
      setProfileInfo({ ...profileInfo, bio: updatePro.updateValue });
    } else if (updatePro.updateName === "university") {
      data = { university: updatePro.updateValue };
      setProfileInfo({ ...profileInfo, university: updatePro.updateValue });
    } else if (updatePro.updateName === "major") {
      data = { major: updatePro.updateValue };
      setProfileInfo({ ...profileInfo, major: updatePro.updateValue });
    } else if (updatePro.updateName === "graduation_date") {
      data = { graduation_date: updatePro.updateValue };
      setProfileInfo({
        ...profileInfo,
        graduation_date: updatePro.updateValue,
      });
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .post("api/profile/update", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <Modal visible={modalOpen.modal3} transparent={true} animationType="fade">
        {/* <View style={{ backgroundColor: "#222222aa", flex: 1 }}> */}
        <View
          style={{
            backgroundColor: "#FFFFFF",
            marginTop: "10%",
            marginHorizontal: 70,
            padding: 20,
            marginRight: 20,
            borderRadius: 16,
            elevation: 10,
            // flex: 1,
          }}
        >
          <View
            style={{
              position: "absolute",
              marginHorizontal: 10,
              marginVertical: 10,
              right: 2,
            }}
          >
            <FontAwesome
              name="close"
              size={24}
              color="gray"
              onPress={() => {
                setModalOpen({ ...modalOpen, modal3: false });
              }}
            />
          </View>
          <View>
            <View
              style={{
                borderColor: "#DFDBC8",
                borderBottomWidth: 1,
                marginBottom: 10,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>Change password</Text>
            </View>
            <View>
              <Text
                style={{ fontSize: 20 }}
                onPress={() => {
                  logout();
                }}
              >
                Logout
              </Text>
            </View>
          </View>
        </View>
        {/* </View> */}
      </Modal>
      <Modal
        visible={modalOpen.modal2}
        transparent={true}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "60%",
              marginHorizontal: 10,
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
            }}
          >
            <View
              style={{
                position: "absolute",
                marginHorizontal: 10,
                marginVertical: 10,
                right: 2,
              }}
            >
              <FontAwesome
                name="close"
                size={24}
                color="gray"
                onPress={() => {
                  setModalOpen({ ...modalOpen, modal2: false });
                }}
              />
            </View>
            <View>
              <TextInput
                defaultValue={updatePro.updateValue}
                autoCorrect={false}
                style={{
                  ...styles.updateText,
                  ...styles.action,
                  color: "#000000",
                }}
                onChangeText={(value) => {
                  setUpdatePro({ ...updatePro, updateValue: value });
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal2: false });
                      updateProfile();
                    }}
                  >
                    <LinearGradient
                      colors={["#c01f92", "#d0d610"]}
                      style={styles.signIn}
                    >
                      <Text style={[styles.textSign, { color: "#000000" }]}>
                        Update
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal2: false });
                    }}
                  >
                    <LinearGradient
                      colors={["#d0d610", "#c01f92"]}
                      style={styles.signIn}
                    >
                      <Text style={[styles.textSign, { color: "#000000" }]}>
                        Cancel
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={modalOpen.modal1}
        transparent={true}
        animationType="slide"
      >
        <View style={{ backgroundColor: "#000000aa", flex: 1 }}>
          <View
            style={{
              backgroundColor: "#FFFFFF",
              marginTop: "70%",
              marginHorizontal: 10,
              paddingTop: 20,
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: 16,
              // flex: 1,
            }}
          >
            <View
              style={{
                position: "absolute",
                marginHorizontal: 10,
                marginVertical: 10,
                right: 2,
              }}
            >
              <FontAwesome
                name="close"
                size={24}
                color="gray"
                onPress={() => {
                  setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                }}
              />
            </View>
            {update.updateName === "gender" ? (
              <View style={{ marginBottom: 20 }}>
                <Checkbox
                  status="unchecked"
                  onPress={() => {
                    setUpdate({ ...update, updateValue: "Male" });
                    setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                  }}
                >
                  <Text>Male</Text>
                </Checkbox>
                <Checkbox
                  checked={true}
                  onPress={() => {
                    setUpdate({ ...update, updateValue: "Female" });
                    setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                  }}
                >
                  <Text style={{ ...styles.updateText, color: "#000000" }}>
                    Female
                  </Text>
                </Checkbox>
              </View>
            ) : (
              <View>
                <TextInput
                  defaultValue={update.updateValue}
                  autoCorrect={false}
                  style={{
                    ...styles.updateText,
                    ...styles.action,
                    color: "#000000",
                  }}
                  onChangeText={(value) => {
                    setUpdate({ ...update, updateValue: value });
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => {
                        setModalOpen({
                          ...modalOpen,
                          modal1: !modalOpen.modal1,
                        });
                        updateUser();
                      }}
                    >
                      <LinearGradient
                        colors={["#FFFFFF", "#CABFAB"]}
                        style={styles.signIn}
                      >
                        <Text style={[styles.textSign, { color: "#000000" }]}>
                          Update
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.button}>
                    <TouchableOpacity
                      style={styles.signIn}
                      onPress={() => {
                        setModalOpen({
                          ...modalOpen,
                          modal1: !modalOpen.modal1,
                        });
                      }}
                    >
                      <LinearGradient
                        colors={["#FFFFFF", "#CABFAB"]}
                        style={styles.signIn}
                      >
                        <Text style={[styles.textSign, { color: "#000000" }]}>
                          Cancel
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  {/* <Ionicon
                    name="ios-checkmark-circle"
                    size={40}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      updateUser();
                    }}
                  /> */}
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledContentGestureInteraction={true}
      />
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
        <Text style={styles.text}>PROFILE SETTINGS</Text>
        <Ionicon
          name="md-ellipsis-vertical"
          size={30}
          color="gray"
          style={{ marginRight: 16 }}
          onPress={() => {
            setModalOpen({ ...modalOpen, modal3: true });
          }}
        />
      </View>
      <ScrollView>
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={
                  userInfo.imagePath
                    ? { uri: `http://10.0.2.2:8000/${userInfo.imagePath}` }
                    : require("../assets/images/profile2.png")
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
            <Text style={{ ...styles.text, fontWeight: "200", fontSize: 33 }}>
              {userInfo.firstname} {userInfo.lastname}
            </Text>
            <Text style={{ ...styles.text, color: "#AEB5BC", fontSize: 17 }}>
              {userInfo.email}
            </Text>
          </View>

          <View style={{ marginHorizontal: 10, marginTop: 20 }}>
            <LinearGradient
              colors={["#FFFFFF", "#CABFAB"]}
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
                    <Text style={styles.infoText}>{userInfo.firstname}</Text>
                  </View>
                  <Icon
                    name="pencil"
                    size={20}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      setUpdate({
                        ...update,
                        updateName: "firstname",
                        updateValue: userInfo.firstname,
                      });
                    }}
                  />
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

                    <Text style={styles.infoText}>{userInfo.lastname}</Text>
                  </View>

                  <Icon
                    name="pencil"
                    size={20}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      setUpdate({
                        ...update,
                        updateName: "lastname",
                        updateValue: userInfo.lastname,
                      });
                    }}
                  />
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
                    <Text style={styles.infoText}>+961</Text>

                    <Text style={styles.infoText}>{userInfo.phone_number}</Text>
                  </View>

                  <Icon
                    name="pencil"
                    size={20}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      setUpdate({
                        ...update,
                        updateName: "phone_number",
                        updateValue: userInfo.phone_number,
                      });
                    }}
                  />
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

                    <Text style={styles.infoText}>{userInfo.gender}</Text>
                  </View>

                  <Icon
                    name="pencil"
                    size={20}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      setUpdate({
                        ...update,
                        updateName: "gender",
                        updateValue: userInfo.gender,
                      });
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={["#FFFFFF", "#CABFAB"]}
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
                    <Text style={styles.infoText}>{userInfo.location}</Text>
                  </View>

                  <Icon
                    name="pencil"
                    size={20}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal1: !modalOpen.modal1 });
                      setUpdate({
                        ...update,
                        updateName: "location",
                        updateValue: userInfo.location,
                      });
                    }}
                  />
                </View>
              </View>
            </LinearGradient>
            {userInfo.type === "tutor" ? (
              <View>
                <LinearGradient
                  colors={["#FFFFFF", "#CABFAB"]}
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
                        {profileInfo.university ? (
                          <Text style={styles.infoText}>
                            {profileInfo.university}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            + Add University
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        size={20}
                        onPress={() => {
                          setModalOpen({ ...modalOpen, modal2: true });
                          setUpdatePro({
                            ...updatePro,
                            updateName: "university",
                            updateValue: profileInfo.university,
                          });
                        }}
                      />
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
                        {profileInfo.major ? (
                          <Text style={styles.infoText}>
                            {profileInfo.major}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            + Add Your Major
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        size={20}
                        onPress={() => {
                          setModalOpen({ ...modalOpen, modal2: true });
                          setUpdatePro({
                            ...updatePro,
                            updateName: "major",
                            updateValue: profileInfo.major,
                          });
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={["#FFFFFF", "#CABFAB"]}
                  style={{
                    borderRadius: SIZES.radius / 2,
                    elevation: 5,
                    padding: 10,
                    marginBottom: 10,
                  }}
                >
                  <View>
                    <View style={{ marginBottom: 10 }}>
                      <Text style={{ ...styles.info }}>About</Text>
                    </View>

                    <View style={styles.infoContent}>
                      <View
                        style={{
                          ...styles.infoContent,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <MaterialIcon
                          name="short-text"
                          size={22}
                          color={COLORS.dark}
                        />
                        {profileInfo.bio ? (
                          <Text style={{ ...styles.infoText, width: "88%" }}>
                            {profileInfo.bio}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            Enter something about yourself
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        size={20}
                        onPress={() => {
                          setModalOpen({ ...modalOpen, modal2: true });
                          setUpdatePro({
                            ...updatePro,
                            updateName: "bio",
                            updateValue: profileInfo.bio,
                          });
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            ) : null}
          </View>
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
    marginTop: 65,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  edit: {
    color: "gray",
    fontWeight: "800",
  },
  text: {
    // fontFamily: "HelveticaNeue",
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
  signIn: {
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
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
  modalContent: {},
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
    borderBottomColor: "gray",
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
  updateText: {
    fontWeight: "800",
    fontSize: 20,
  },
  infoContent: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
