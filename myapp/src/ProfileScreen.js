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

import axios from "axios";

axios.defaults.baseURL = "http://10.0.2.2:8000";

const ProfileScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    location: "",
    type: "",
    hours_tutored: "",
    students_tutored: "",
    bio: "",
  });

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    axios
      .get("api/user")
      .then((response) => {
        setUserInfo({
          ...userInfo,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          location: response.data.location,
          type: response.data.type,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    axios
      .get("api/profile")
      .then((response) => {
        setUserInfo({
          ...userInfo,
          bio: response.data.bio,
          hours_tutored: response.data.hours_tutored,
          students_tutored: response.data.students_tutored,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/* <View style={styles.titleBar}>
          <Ionicon
            name="ios-menu"
            size={30}
            color="#41444B"
            onPress={() => navigation.openDrawer()}
          />
          <Icon
            name="account-edit"
            size={30}
            color="#41444B"
            onPress={() =>
              navigation.navigate("EditProfile", { data: userInfo })
            }
          />
        </View> */}
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/images/profile4.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.dm}>
            <MaterialIcon name="chat" size={26} color="#DFD8C8" />
          </View>
          <View style={styles.active}></View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...styles.text, fontWeight: "200", fontSize: 30 }}>
            {userInfo.firstname} {userInfo.lastname}
          </Text>
          <Text style={{ ...styles.text, color: "#AEB5BC", fontSize: 14 }}>
            @{userInfo.type}
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={{ ...styles.text, fontSize: 24 }}>
              {userInfo.hours_tutored}
            </Text>
            <Text style={{ ...styles.text, ...styles.subText }}>
              Hours Tutored
            </Text>
          </View>
          <View
            style={{
              ...styles.statsBox,
              borderColor: "#DFDBC8",
              borderLeftWidth: 1,
            }}
          >
            <Text style={{ ...styles.text, fontSize: 24 }}>
              {userInfo.students_tutored}
            </Text>
            <Text style={{ ...styles.text, ...styles.subText }}>
              Students Tutored
            </Text>
          </View>
        </View>
        <View style={{ marginTop: 5 }}>
          <View
            style={{
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...FONTS.h2, fontWeight: "bold" }}>My Videos</Text>
            <Text style={{ ...FONTS.h3, color: "red" }}>View all</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaVideoContainer}>
              <Image
                source={require("../assets/images/pexels.jpeg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaVideoContainer}>
              <Image
                source={require("../assets/images/photo.jpeg")}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <View style={styles.mediaVideoContainer}>
              <Image
                source={require("../assets/images/image.jpg")}
                style={styles.image}
                resizeMode="cover"
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
              3
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
        <Text style={[styles.subText, styles.recent]}>About</Text>
        <View style={{ alignItems: "center", marginBottom: 30 }}>
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

          <View style={styles.recentItem}>
            <View style={styles.activityIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#41444B", fontWeight: "300" }]}
              >
                <Text>{userInfo.bio}</Text>
                {/* Started following{" "}
                <Text style={{ fontWeight: "400" }}>Luke Harper</Text> */}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 20,
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
    marginTop: 5,
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
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 14,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
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
