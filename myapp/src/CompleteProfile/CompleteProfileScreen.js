import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../AuthProvider";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";
import { COLORS, SIZES, FONTS, icons } from "../constants";
import PaymentView from "../../src/HomeScreen/PaymentView";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const CompleteProfileSCreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [meetingType, setMeetingType] = useState({
    inperson: false,
    online: false,
  });
  const [modal, setModal] = useState({
    meetingTypeModal: false,
    paymentModal: false,
  });

  const [response, setResponse] = useState();
  const [makePayment, setMakePayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState();

  const cartInfo = {
    id: "Seruyt35eggr76476236523t3",
    description: "T Shirt - With react Native Logo",
    amount: 1,
  };

  const onCheckStatus = async (paymentResponse) => {
    setPaymentStatus("Please wait while confirming your payment!");
    setResponse(paymentResponse);

    let jsonResponse = JSON.parse(paymentResponse);
    // perform operation to check payment status

    setModal({ ...modal, paymentModal: false });
  };

  useEffect(() => {
    axios.get("/api/meetingtype").then((response) => {
      console.log(response.data[0].type);
      if (response.data[0].type === "both") {
        setMeetingType({ ...meetingType, inperson: true, online: true });
      } else if (response.data[0].type === "inperson") {
        setMeetingType({ ...meetingType, inperson: true });
      } else if (response.data[0].type === "online") {
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

  function flatList() {
    return (
      <View>
        <View style={styles.warning}>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", color: COLORS.black3 }}
          >
            You Need to fill out all info to be able to continue
          </Text>
        </View>
        <View
          style={{
            paddingTop: 10,
            marginBottom: 70,
            borderTopLeftRadius: 70,
            // backgroundColor: COLORS.pink,
          }}
        >
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                // backgroundColor: "#50ABF1",
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.maleandfemale}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Complete your profile</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("Courses");
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.course}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Add Course Offer</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                // backgroundColor: "#2CB9B0",

                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("Availabilities");
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.available}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Add your availability</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                setModal({ ...modal, meetingTypeModal: true });
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.meeting}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Prefered meeting type</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                navigation.navigate("Address");
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.address2}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Default meeting address</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {}}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.cv}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Upload your CV</Text>
                <Image
                  source={icons.right}
                  resizeMode="contain"
                  style={styles.image}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          <View style={{ paddingVertical: 5, marginHorizontal: 10 }}>
            <TouchableOpacity
              style={{
                ...styles.wrapper,
                backgroundColor: COLORS.beige,
                justifyContent: "center",
                paddingHorizontal: 10,
              }}
              onPress={() => {
                setModal({
                  ...modal,
                  paymentModal: !modal.paymentModal,
                });
              }}
            >
              <View style={styles.warpper_content}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: COLORS.white,
                  }}
                >
                  <Image
                    source={icons.payment}
                    resizeMode="contain"
                    style={styles.icon}
                  />
                </View>
                <Text style={styles.text}>Payment method</Text>
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
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Modal
          visible={modal.paymentModal}
          // transparent={true}
          animationType="slide"
        >
          <View>
            <View
              style={{
                position: "absolute",
                marginHorizontal: 10,
                marginVertical: 10,
                right: 2,
                top: 0,
              }}
            >
              <FontAwesome
                name="close"
                size={24}
                color="black"
                onPress={() => {
                  setModal({ ...modal, paymentModal: false });
                }}
              />
            </View>
            <View>
              <PaymentView
                onCheckStatus={onCheckStatus}
                product={cartInfo.description}
                amount={cartInfo.amount}
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
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderRadius: 16,
              }}
            >
              <View>
                <View>
                  <TouchableOpacity
                    style={{
                      marginBottom: 16,
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
                        <Feather name="users" size={30} color={COLORS.blue} />
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
                      marginTop: 10,
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
                          color={COLORS.primary}
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
                  <View style={styles.statsContainer}>
                    <TouchableOpacity
                      style={styles.statsBox}
                      onPress={() => {
                        setModal({ ...modal, meetingTypeModal: false });
                      }}
                    >
                      <Text
                        style={{
                          ...styles.text,
                          color: COLORS.blue,
                        }}
                      >
                        Cancel
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModal({ ...modal, meetingTypeModal: false });
                        save();
                      }}
                      style={{
                        ...styles.statsBox,
                        borderColor: "#DFDBC8",
                        borderLeftWidth: 2,
                      }}
                    >
                      <Text
                        style={{
                          ...styles.text,
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            left: 20,
          }}
        >
          <View>
            <Ionicon
              name="ios-menu"
              size={30}
              backgroundColor="#fff"
              color={COLORS.black3}
              onPress={() => navigation.openDrawer()}
            />
          </View>
        </View>
        <View>
          <Text style={styles.name}>Hey Miel!</Text>
          <Text style={styles.paragraph}>
            You're a few steps away from becoming an AWESOME tutor.
          </Text>
        </View>
      </View>
      <LinearGradient colors={[COLORS.white, COLORS.white]}>
        <View style={{ marginBottom: 90 }}>
          <FlatList ListHeaderComponent={flatList()} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default CompleteProfileSCreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 40,
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
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
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
    color: "#34495e",
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 65,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  warning: {
    backgroundColor: COLORS.yellow2,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    height: 100,
    borderRadius: SIZES.radius / 2,
    elevation: 10,
  },
  warpper_content: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 5,
    marginTop: 4,
    color: "#000000",
    fontWeight: "bold",
    ...FONTS.h3,
  },
  subtext: {
    marginHorizontal: 5,
    fontWeight: "800",
    color: "gray",
  },
  image: {
    width: 15,
    height: 40,
  },
  icon: {
    width: 50,
    height: 50,
  },
});
