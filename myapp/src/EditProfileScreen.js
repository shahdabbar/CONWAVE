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
import { Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { Easing } from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const EditProfileScreen = ({ route, navigation }) => {
  const { user, logout } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const bs = React.useRef();
  const fall = new Animated.Value(1);

  const [update, setUpdate] = useState({ updateName: "", updateValue: "" });
  const [isVisible, setIsVisible] = useState(false);

  const [state, setState] = useState({
    universities: [],
    majors: [],
    university: "",
    university_id: 0,
    major: "",
    major_id: 0,
    degree: "",
    degree_id: 0,
    graduation_date: "",
    bio: "",
  });

  const [modaltype, setModaltype] = useState("");
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
    console.log("formData", formData);

    axios
      .post("api/user/photo", formData)
      .then((response) => {
        // console.log(response.data);
        setUserInfo({
          ...userInfo,
          imagePath: response.data.profile_photo_path,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("api/profile")
      .then((response) => {
        if (response.data[0]) {
          setState({
            ...state,
            university: response.data[0].university.name,
            major: response.data[0].major.name,
            degree: response.data[0].degree.name,
            bio: response.data[0].bio,
          });

          console.log("i am here");
          console.log(response.data[0].university.name);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("api/user")
      .then((response) => {
        // console.log(response.data);

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
  }, []);

  useEffect(() => {
    axios
      .get("api/universities/majors")
      .then((response) => {
        setState({
          ...state,
          universities: response.data[0],
          majors: response.data[1],
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function updateProfile(type) {
    if (type === "education") {
      setModalOpen({ ...modalOpen, modal2: false });

      let data = {
        university_id: state.university_id,
        major_id: state.major_id,
        degree_id: state.degree_id,
        graduation_date: state.graduation_date,
      };
      axios
        .post("api/profile/update", data)
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setModalOpen({ ...modalOpen, modal2: false });

      axios
        .post("api/profile/update", { bio: state.bio })
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity>
        <LinearGradient
          colors={[COLORS.pink, COLORS.yellow2]}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage}>
        <LinearGradient
          colors={[COLORS.yellow2, "#d02860"]}
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
          colors={["#d02860", COLORS.yellow2]}
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
              marginTop: "45%",
              marginHorizontal: 10,
              paddingVertical: 20,
              borderRadius: SIZES.radius / 2,
            }}
          >
            <View>
              {modaltype === "education" ? (
                <View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 22,
                        color: COLORS.pink,
                      }}
                    >
                      Edit Education
                    </Text>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <Picker
                      selectedValue={state.university}
                      style={styles.pickerStyle}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemValue) {
                          setState({
                            ...state,
                            university: itemValue,
                            university_id: itemIndex,
                          });
                        } else {
                        }
                      }}
                    >
                      <Picker.Item label="University" value="" />
                      {state.universities.map((e) => {
                        return (
                          <Picker.Item
                            label={e.name}
                            key={e.id}
                            value={e.name}
                          />
                        );
                      })}
                    </Picker>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <Picker
                      selectedValue={state.major}
                      style={styles.pickerStyle}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemValue) {
                          setState({
                            ...state,
                            major: itemValue,
                            major_id: itemIndex,
                          });
                        } else {
                        }
                      }}
                    >
                      <Picker.Item label="Major" value="" />
                      {state.majors.map((e) => {
                        return (
                          <Picker.Item label={e.name} key={e.id} value={e.id} />
                        );
                      })}
                    </Picker>
                  </View>
                  <View style={{ marginVertical: 5 }}>
                    <Picker
                      selectedValue={state.degree}
                      style={styles.pickerStyle}
                      onValueChange={(itemValue, itemIndex) => {
                        if (itemValue) {
                          setState({
                            ...state,
                            degree: itemValue,
                            degree_id: itemIndex,
                          });
                        } else {
                        }
                      }}
                    >
                      <Picker.Item label="Degree" value="" />
                      <Picker.Item label="Associate Degree" value="1" />
                      <Picker.Item label="Bachelor Degree" value="2" />
                      <Picker.Item label="Masters Degree" value="3" />
                      <Picker.Item label="Doctoral Degree" value="4" />
                    </Picker>
                  </View>
                  <View
                    style={{
                      paddingHorizontal: 20,
                      marginVertical: 5,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        backgroundColor: COLORS.white,
                        elevation: 10,
                        height: 50,
                        justifyContent: "center",
                      }}
                      onPress={() => {
                        setIsVisible(true);
                      }}
                    >
                      <View style={{ marginLeft: 5 }}>
                        <Text
                          style={{
                            color: COLORS.black3,
                            fontSize: 16,
                          }}
                        >
                          Graduation Date
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={isVisible}
                      onConfirm={(date) => {
                        setState({
                          ...state,
                          graduation_date:
                            date.getFullYear() +
                            "-" +
                            (date.getMonth() + 1) +
                            "-" +
                            date.getDate(),
                        });
                        setIsVisible(false);
                      }}
                      onCancel={() => {
                        setIsVisible(false);
                      }}
                      mode="date"
                    />
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ paddingHorizontal: 20 }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        color: COLORS.pink,
                        alignSelf: "center",
                      }}
                    >
                      About
                    </Text>
                    <View style={styles.inputaction}>
                      <TextInput
                        style={styles.textinput}
                        placeholder="Talk little about yourseld and your experince"
                        placeholderTextColor="#666"
                        multiline={true}
                        numberOfLines={4}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => {
                          setState({ ...state, bio: text });
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.statsContainer}>
                  <TouchableOpacity
                    style={styles.statsBox}
                    onPress={() => {
                      setModalOpen({ ...modalOpen, modal2: false });
                    }}
                  >
                    <Text
                      style={{
                        ...styles.modaltext,
                        color: COLORS.blue,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      if (modaltype === "education") {
                        updateProfile("education");
                      } else {
                        updateProfile("bio");
                      }
                    }}
                    style={{
                      ...styles.statsBox,
                      borderColor: "#DFDBC8",
                      borderLeftWidth: 2,
                    }}
                  >
                    <Text
                      style={{
                        ...styles.modaltext,
                        color: COLORS.gray,
                      }}
                    >
                      Save
                    </Text>
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
              paddingVertical: 20,
              paddingHorizontal: 20,
              borderRadius: SIZES.radius / 2,
              // flex: 1,
            }}
          >
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
              <View style={{ marginTop: 5 }}>
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
                    paddingHorizontal: 10,
                  }}
                >
                  <View style={styles.statsContainer}>
                    <TouchableOpacity
                      style={styles.statsBox}
                      onPress={() => {
                        setModalOpen({
                          ...modalOpen,
                          modal1: !modalOpen.modal1,
                        });
                      }}
                    >
                      <Text
                        style={{
                          ...styles.modaltext,
                          color: COLORS.blue,
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalOpen({
                          ...modalOpen,
                          modal1: !modalOpen.modal1,
                        });
                        updateUser();
                      }}
                      style={{
                        ...styles.statsBox,
                        borderColor: "#DFDBC8",
                        borderLeftWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.modaltext,
                          color: COLORS.gray,
                        }}
                      >
                        Save
                      </Text>
                    </TouchableOpacity>
                  </View>
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
          color={COLORS.black3}
          style={{ marginLeft: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{ ...styles.text, fontSize: 18 }}>PROFILE SETTINGS</Text>
        <Ionicon
          name="md-ellipsis-vertical"
          size={30}
          color={COLORS.black3}
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
                    ? { uri: `http://192.168.0.107:8000/${userInfo.imagePath}` }
                    : require("../assets/images/profile2.png")
                }
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            {/* <View style={styles.active}></View> */}
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

          <View
            style={{ marginHorizontal: 10, marginTop: 20, marginBottom: 30 }}
          >
            <LinearGradient
              colors={[COLORS.white, COLORS.white]}
              style={{
                borderTopRightRadius: SIZES.radius,
                borderBottomLeftRadius: SIZES.radius,
                borderWidth: 3,
                borderColor: COLORS.beige,
                elevation: 10,
                padding: 10,
                marginBottom: 15,
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
                    color={COLORS.pink}
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
                    color={COLORS.pink}
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
                    color={COLORS.pink}
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
                    color={COLORS.pink}
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
              colors={[COLORS.white, COLORS.white]}
              style={{
                // borderRadius: SIZES.radius / 2,
                borderBottomRightRadius: SIZES.radius,
                borderTopLeftRadius: SIZES.radius,
                borderWidth: 3,
                borderColor: COLORS.beige,
                elevation: 5,
                padding: 10,
                marginBottom: 15,
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
                    color={COLORS.pink}
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
                  colors={[COLORS.white, COLORS.white]}
                  style={{
                    // borderRadius: SIZES.radius / 2,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    borderWidth: 3,
                    borderColor: COLORS.beige,
                    elevation: 5,
                    padding: 10,
                    marginBottom: 15,
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
                        {state.university ? (
                          <Text style={{ ...styles.infoText, width: "88%" }}>
                            {state.university}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            + Add University
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        color={COLORS.pink}
                        size={20}
                        onPress={() => {
                          setModaltype("education");
                          setModalOpen({ ...modalOpen, modal2: true });
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
                        <FontAwesome
                          name="graduation-cap"
                          size={22}
                          color={COLORS.dark}
                        />
                        {state.major ? (
                          <Text style={styles.infoText}>{state.major}</Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            + Add Your Major
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        color={COLORS.pink}
                        size={20}
                        onPress={() => {
                          setModaltype("education");
                          setModalOpen({ ...modalOpen, modal2: true });
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={[COLORS.white, COLORS.white]}
                  style={{
                    // borderRadius: SIZES.radius / 2,
                    borderBottomRightRadius: SIZES.radius,
                    borderTopLeftRadius: SIZES.radius,
                    borderWidth: 3,
                    borderColor: COLORS.beige,
                    elevation: 5,
                    padding: 10,
                    marginBottom: 15,
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
                        {state.bio ? (
                          <Text style={{ ...styles.infoText, width: "88%" }}>
                            {state.bio}
                          </Text>
                        ) : (
                          <Text style={{ ...styles.infoText, color: "gray" }}>
                            Enter something about yourself
                          </Text>
                        )}
                      </View>

                      <Icon
                        name="pencil"
                        color={COLORS.pink}
                        size={20}
                        onPress={() => {
                          setModaltype("bio");
                          setModalOpen({ ...modalOpen, modal2: true });
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
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 22,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  edit: {
    color: "gray",
    fontWeight: "800",
  },
  modaltext: {
    fontSize: 18,
    color: COLORS.black2,
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
  inputaction: {
    borderRadius: 20,
    borderWidth: 1,
    // marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    // paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  textinput: {
    padding: 10,
    fontSize: 20,
    height: 150,
    fontStyle: "italic",
    textAlignVertical: "top",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  pickerStyle: {
    marginHorizontal: 20,
    elevation: 10,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,1)",
    shadowColor: "#d3d3d3",
    // flexDirection: "row",
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
    height: 60,
    padding: 13,
    borderRadius: 30,
    // backgroundColor: "#FF6347",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  action: {
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
    justifyContent: "center",
    paddingBottom: 5,
    borderWidth: 2,
    height: 60,
    borderColor: COLORS.beige,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
    elevation: 5,
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
    color: COLORS.black3,
  },
  updateText: {
    fontWeight: "800",
    fontSize: 20,
    paddingLeft: 20,
  },
  infoContent: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
