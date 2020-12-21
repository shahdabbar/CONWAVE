import React, { useState } from "react";
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

const CompleteProfileSCreen = ({ navigation }) => {
  const [modal, setModal] = useState({
    availabilityModal: false,
    locationModal: false,
    addressModal: false,
    addressModal: false,
    addressModal: false,
  });
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Modal
          visible={modal.courseModal}
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
                  setModal({ ...modal, courseModal: false });
                }}
              />
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
                <Text style={styles.name}>Hey Shahd!</Text>
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
            <View style={{ marginTop: 10 }}>
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
                <TouchableOpacity style={styles.wrapper} onPress={() => {}}>
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
                <TouchableOpacity style={styles.wrapper} onPress={() => {}}>
                  <View style={styles.warpper_content}>
                    <Text style={styles.text}>Add your location</Text>
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
                    <Text style={styles.text}>Add your address</Text>
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
                    <Text style={styles.text}>Upload your transcripts/CV</Text>
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
  image: {
    width: 20,
    height: 44,
  },
});
