import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Card, CardItem } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import EditProfile from "./EditProfileScreen";
import axios from "axios";

const CompleteProfileSCreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [meetingType, setMeetingType] = useState({
    inperson: false,
    online: false,
  });
  const [modal, setModal] = useState({
    meetingTypeModal: false,
    addressModal: false,
  });

  useEffect(() => {
    axios.get("/api/meetingtype").then((response) => {
      if (response.data === "both") {
        setMeetingType({ ...meetingType, inperson: true });
        setMeetingType({ ...meetingType, online: true });
      } else if (response.data === "inperson") {
        setMeetingType({ ...meetingType, inperson: true });
      } else if (response.data === "online") {
        setMeetingType({ ...meetingType, online: true });
      }
    });
  }, []);

  const save = () => {
    let type = "";
    if (meetingType.inperson === true && meetingType.online === true) {
      type = "both";
    } else if (meetingType.inperson === true) {
      type = "inperson";
    } else if (meetingType.online === true) {
      type = "online";
    } else {
      alert("Please choose one at least!");
    }
    if (type) {
      axios.post("./api/meetingtype", { type: type }).then((response) => {
        console.log(response.data);
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.beige, COLORS.rose, COLORS.pink]}>
        <SafeAreaView>
          <Modal
            visible={modal.addressModal}
            // transparent={true}
            animationType="slide"
          >
            <View>
              <Text>Hola!</Text>
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
                    setModal({ ...modal, addressModal: false });
                  }}
                />
              </View>
            </View>
          </Modal>
          <Modal
            visible={modal.meetingTypeModal}
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
                    marginVertical: 5,
                    right: 2,
                  }}
                >
                  <FontAwesome
                    name="close"
                    size={24}
                    color="gray"
                    onPress={() => {
                      setModal({ ...modal, meetingTypeModal: false });
                    }}
                  />
                </View>
                <View>
                  <View>
                    <TouchableOpacity
                      style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setMeetingType({
                          ...meetingType,
                          inperson: !meetingType.inperson,
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View>
                          <Feather
                            name="users"
                            size={30}
                            color={COLORS.black}
                          />
                        </View>
                        <View style={{ left: 10 }}>
                          <Text style={styles.text}>In-Person Session</Text>
                          <Text style={styles.subtext}>
                            Meet your student face to face
                          </Text>
                        </View>
                      </View>
                      {meetingType.inperson ? (
                        <View>
                          <Ionicon
                            name="checkmark-sharp"
                            size={40}
                            color={COLORS.black}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 0.5,
                        width: "100%",
                        backgroundColor: "#C8C8C8",
                      }}
                    />
                    <TouchableOpacity
                      style={{
                        marginBottom: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        setMeetingType({
                          ...meetingType,
                          online: !meetingType.online,
                        });
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <FontAwesome
                            name="tv"
                            size={25}
                            color={COLORS.black}
                          />
                        </View>
                        <View style={{ left: 10 }}>
                          <Text style={styles.text}>Online Session</Text>
                          <Text style={styles.subtext}>
                            Have a video call session
                          </Text>
                        </View>
                      </View>
                      {meetingType.online ? (
                        <View>
                          <Ionicon
                            name="checkmark-sharp"
                            size={40}
                            color={COLORS.black}
                          />
                        </View>
                      ) : null}
                    </TouchableOpacity>
                  </View>
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
                          setModal({ ...modal, meetingTypeModal: false });
                          save();
                        }}
                      >
                        <LinearGradient
                          colors={["#ff01ff", "#d0d610"]}
                          style={styles.signIn}
                        >
                          <Text style={[styles.textSign, { color: "#000000" }]}>
                            Save
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                      <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => {
                          setModal({ ...modal, meetingTypeModal: false });
                        }}
                      >
                        <LinearGradient
                          colors={["#d0d610", "#ff01ff"]}
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
          <ScrollView>
            <View>
              <View>
                <Card>
                  {/* <Feather
                name="menu"
                size={22}
                color="#000000"
                style={{ position: "absolute", top: 40, left: 16 }}
                onPress={() => navigation.openDrawer()}
              /> */}
                  <Text style={styles.name}>Hey Miel!</Text>
                  <Text style={styles.paragraph}>
                    You're a few steps away from becoming an AWESOME tutor.
                  </Text>
                </Card>
              </View>
              <View style={styles.warning}>
                <Text style={styles.paragraph}>
                  You Need to fill out all info to be able to continue
                </Text>
              </View>
              <View style={{ marginTop: 10, marginBottom: 30 }}>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => {
                      navigation.navigate("EditProfile");
                    }}
                  >
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Complete your profile</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => {
                      navigation.navigate("Courses");
                    }}
                  >
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Add Course Offer</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => {
                      navigation.navigate("Availabilities");
                    }}
                  >
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Add your availability</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => {
                      setModal({ ...modal, meetingTypeModal: true });
                    }}
                  >
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Prefered meeting type</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity
                    style={styles.wrapper}
                    onPress={() => {
                      setModal({ ...modal, addressModal: !modal.addressModal });
                    }}
                  >
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Default meeting address</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity style={styles.wrapper} onPress={() => {}}>
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>
                        Upload your transcripts/CV
                      </Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 18 }}>
                  <TouchableOpacity style={styles.wrapper} onPress={() => {}}>
                    <View style={styles.warpper_content}>
                      <Text style={styles.text}>Add your payment method</Text>
                      <Image
                        source={icons.right}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default CompleteProfileSCreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff01ff",
  },
  paragraph: {
    margin: 16,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
  button: {
    backgroundColor: "white",
    height: 70,
    marginHorizontal: 5,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  signIn: {
    width: 170,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 22,
    fontWeight: "bold",
  },
  name: {
    marginTop: 70,
    color: "#34495e",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  warning: {
    backgroundColor: "#ffd200",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    backgroundColor: "#f5f5f5",
    borderRadius: SIZES.radius / 2,
    elevation: 10,
    marginRight: SIZES.padding * 2,
  },
  warpper_content: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginHorizontal: 5,
    marginTop: 4,
    fontWeight: "800",
    color: "#000000",
    fontWeight: "bold",
    ...FONTS.h2,
  },
  subtext: {
    marginHorizontal: 5,
    fontWeight: "800",
    color: "gray",
  },
  image: {
    width: 20,
    height: 44,
  },
});
