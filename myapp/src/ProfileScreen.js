// import React, { useEffect, useContext, useState } from "react";
// import {
//   StyleSheet,
//   SafeAreaView,
//   View,
//   StatusBar,
//   ScrollView,
// } from "react-native";
// import {
//   Avatar,
//   Title,
//   Caption,
//   Text,
//   TouchableRipple,
// } from "react-native-paper";
// import { AuthContext } from "./AuthProvider";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import axios from "axios";

// axios.defaults.baseURL = "http://10.0.2.2:8000";

// const ProfileScreen = () => {
//   const { user } = useContext(AuthContext);

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     location: "",
//     type: "",
//   });

//   useEffect(() => {
//     axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
//     axios
//       .get("api/user")
//       .then((response) => {
//         setUserInfo({
//           ...userInfo,
//           name: response.data.name,
//           email: response.data.email,
//           location: response.data.location,
//           type: response.data.type,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response);
//       });
//   }, []);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.userInfoSection}>
//         <View style={{ flexDirection: "row", marginTop: 15 }}>
//           <Avatar.Image
//             source={require("../assets/images/avatar2.png")}
//             size={80}
//           />
//           <View style={{ marginLeft: 20 }}>
//             <Title
//               style={[{ ...styles.title, marginTop: 15, marginBottom: 5 }]}
//             >
//               {userInfo.name}
//             </Title>
//             <Caption style={styles.caption}>@{userInfo.type}</Caption>
//           </View>
//         </View>
//       </View>
//       <View style={styles.userInfoSection}>
//         <View style={styles.row}>
//           <Icon name="map-marker-radius" color="#777777" size={20} />
//           <Text style={{ color: "#777777", marginLeft: 20 }}>
//             {userInfo.location}, Lebanon
//           </Text>
//         </View>
//         <View style={styles.row}>
//           <Icon name="phone" color="#777777" size={20} />
//           <Text style={{ color: "#777777", marginLeft: 20 }}>
//             +961-76 638 758
//           </Text>
//         </View>
//         <View style={styles.row}>
//           <Icon name="email" color="#777777" size={20} />
//           <Text style={{ color: "#777777", marginLeft: 20 }}>
//             {userInfo.email}
//           </Text>
//         </View>
//       </View>
//       {userInfo.type === "tutor" ? (
//         <View style={styles.infoBoxWrapper}>
//           <View
//             style={{
//               ...styles.infoBox,
//               borderRightColor: "#dddddd",
//               borderRightWidth: 1,
//             }}
//           >
//             <Title>140</Title>
//             <Caption style={{ fontSize: 17, color: "black" }}>
//               Hours Tutored
//             </Caption>
//           </View>
//           <View style={styles.infoBox}>
//             <Title>50</Title>
//             <Caption style={{ fontSize: 17, color: "black" }}>
//               Students Tutored
//             </Caption>
//           </View>
//         </View>
//       ) : null}
//       <View style={styles.menuWrapper}>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Icon name="credit-card" color="#000000" size={25} />
//             <Text style={styles.menuItemText}>Payment</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Icon name="heart-outline" color="#000000" size={25} />
//             <Text style={styles.menuItemText}>Your favorites</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Icon name="share-outline" color="#000000" size={25} />
//             <Text style={styles.menuItemText}>Tell Your Friends</Text>
//           </View>
//         </TouchableRipple>
//         <TouchableRipple onPress={() => {}}>
//           <View style={styles.menuItem}>
//             <Icon name="settings-outline" color="#000000" size={25} />
//             <Text style={styles.menuItemText}>Settings</Text>
//           </View>
//         </TouchableRipple>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//   },
//   userInfoSection: {
//     paddingHorizontal: 30,
//     marginBottom: 25,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//     fontWeight: "500",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   infoBoxWrapper: {
//     borderBottomColor: "#dddddd",
//     borderBottomWidth: 1,
//     borderTopColor: "#dddddd",
//     borderTopWidth: 1,
//     flexDirection: "row",
//     height: 100,
//   },
//   infoBox: {
//     width: "50%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   menuWrapper: {
//     marginTop: 10,
//   },
//   menuItem: {
//     flexDirection: "row",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//   },
//   menuItemText: {
//     color: "#777777",
//     marginLeft: 20,
//     fontWeight: "600",
//     fontSize: 16,
//     lineHeight: 26,
//   },
// });

import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import { AuthContext } from "./AuthProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Video } from "expo-av";

import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

// axios.defaults.baseURL = "http://10.0.2.2:8000";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [userInfo, setUserInfo] = useState([]);

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get("api/user")
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("api/profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ backgroundColor: COLORS.yellow2 }}>
        <View style={styles.titleBar}>
          <Ionicon
            name="ios-menu"
            size={30}
            color={COLORS.white}
            style={{ marginLeft: 16 }}
            onPress={() => navigation.openDrawer()}
          />

          <Icon
            name="account-edit"
            size={30}
            color={COLORS.white}
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
      </View>
      <View style={{ flex: 0.09, backgroundColor: COLORS.yellow2 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: SIZES.radius * 4,
            borderTopRightRadius: SIZES.radius * 4,
          }}
        ></View>

        <View style={{ backgroundColor: COLORS.yellow2 }}></View>
      </View>
      <View style={{ flex: 0.9 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
            <View style={styles.infoContainer}>
              <Text style={styles.header_text}>Hello,</Text>
              <Text style={{ fontWeight: "bold", fontSize: 30, left: 22 }}>
                {userInfo.firstname}!
              </Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image
                  source={
                    userInfo.profile_photo_path
                      ? {
                          uri: `http://192.168.0.106:8000/${userInfo.profile_photo_path}`,
                        }
                      : require("../assets/images/profile2.png")
                  }
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              {/* <View style={styles.dm}>
                <MaterialIcon name="chat" size={26} color="#DFD8C8" />
              </View>
              <View style={styles.active}></View> */}
            </View>
          </View>
          <Text style={[styles.subText, styles.recent]}>About</Text>
          <View style={{ alignItems: "center" }}>
            <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 320 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  <Text>{profile.bio}</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TutorCourses")}
              >
                <Image
                  source={icons.star}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    ...styles.subText,
                    color: "#000000",
                    textTransform: "none",
                  }}
                >
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.statsBox,
                borderColor: "#DFDBC8",
                borderLeftWidth: 1,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("Reviews")}>
                <Image
                  source={icons.notifications}
                  resizeMode="contain"
                  style={{
                    width: 22,
                    height: 22,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    ...styles.subText,
                    color: "#000000",
                    textTransform: "none",
                  }}
                >
                  Notifications
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.statsBox,
                borderColor: "#DFDBC8",
                borderLeftWidth: 1,
              }}
            >
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={icons.settings}
                  resizeMode="contain"
                  style={{
                    width: 24,
                    height: 24,
                    marginBottom: 5,
                    alignSelf: "center",
                  }}
                />
                <Text
                  style={{
                    ...styles.subText,
                    color: "#000000",
                    textTransform: "none",
                  }}
                >
                  Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                padding: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>My Videos</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Videos")}>
                <Text style={{ ...FONTS.h3, color: COLORS.pink }}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
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
                  style={styles.image}
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
                  style={styles.image}
                />
              </View>
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
                  style={styles.image}
                />
              </View>
              <View style={styles.mediaVideoContainer}>
                <Video
                  source={require("../assets/images/se_intro.mp4")}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay={false}
                  isLooping={false}
                  useNativeControls
                  style={styles.image}
                />
              </View>
            </ScrollView>
            <View style={styles.mediaCount}>
              <Text
                style={[
                  styles.text,
                  { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
                ]}
              >
                4
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 14,
                    color: "#DFD8C8",
                    textTransform: "uppercase",
                  },
                ]}
              >
                Videos
              </Text>
            </View>
          </View>
          {/* <Text style={[styles.subText, styles.recent]}>About</Text> */}
          {/* <View style={{ alignItems: "center", marginBottom: 30 }}> */}
          {/* <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  Started following{" "}
                  <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and{" "}
                  <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                </Text>
              </View>
            </View> */}

          {/* <View style={styles.recentItem}>
              <View style={styles.activityIndicator}></View>
              <View style={{ width: 250 }}>
                <Text
                  style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
                >
                  <Text>{profile.bio}</Text>
               
                </Text>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header_text: {
    color: "#41444B",
    fontSize: 32,
  },
  text: {
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
    width: 170,
    height: 170,
    borderRadius: 100,
    overflow: "hidden",
    right: 10,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    left: 10,
    // marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mediaVideoContainer: {
    width: 200,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  // 41444B
  mediaCount: {
    backgroundColor: "#a06262",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 16,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 55,
    // marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    // marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
