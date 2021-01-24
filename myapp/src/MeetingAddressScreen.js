import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  Button,
  StatusBar,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Card,
} from "react-native";
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
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import Geocoder from "react-native-geocoder";
import axios from "axios";
import { add, cos } from "react-native-reanimated";

const MeetingAddressScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [addressInfo, setAddressInfo] = useState(route.params.addressInfo);
  console.log(addressInfo);

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          left: SIZES.padding * 2,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            width: 50,
            height: 50,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            elevation: 5,
          }}
        >
          <MaterialIcon
            name="arrow-back-ios"
            size={24}
            style={{ left: 4 }}
            color={COLORS.darkGray}
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    );
  }

  function renderLocationFooter() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: 50,
          left: 0,
          right: 0,
          height: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white,
            elevation: 5,
          }}
        >
          <Image
            source={icons.red_pin}
            style={{
              width: 30,
              height: 30,
              marginRight: SIZES.padding,
              justifyContent: "flex-start",
            }}
          />
          <View
            style={{
              flex: 1,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 17, marginBottom: 5 }}>
              {addressInfo.country}, {addressInfo.area}
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: COLORS.gray }}
            >
              Street:{" "}
              <Text style={{ fontWeight: "normal", color: COLORS.gray }}>
                {addressInfo.street} st.
              </Text>
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: COLORS.gray }}
            >
              Building:{" "}
              <Text style={{ fontWeight: "normal", color: COLORS.gray }}>
                {addressInfo.building} buidling
              </Text>
            </Text>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: COLORS.gray }}
            >
              Floor:{" "}
              <Text style={{ fontWeight: "normal", color: COLORS.gray }}>
                {addressInfo.floor} floor
              </Text>
            </Text>
            {addressInfo.additional_details ? (
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: COLORS.gray,
                }}
              >
                Additional Details:{" "}
                <Text style={{ fontWeight: "normal", color: COLORS.gray }}>
                  {addressInfo.additional_details}
                </Text>
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {addressInfo ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: Number(addressInfo.latitude),
            longitude: Number(addressInfo.longitude),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker
            coordinate={{
              latitude: Number(addressInfo.latitude),
              longitude: Number(addressInfo.longitude),
            }}
            title="Tutor Location"
            description="Here I am"
          />
        </MapView>
      ) : null}
      {renderHeader()}
      {renderLocationFooter()}
    </View>
  );
};

export default MeetingAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
  next: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: SIZES.radius,
    width: "100%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
    // elevation: 5,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  action: {
    flexDirection: "row",
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#ffd200",
    paddingLeft: 20,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },
  text: {
    margin: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 12,
    height: 60,
    borderColor: COLORS.beige,
    borderWidth: 2,
    elevation: 5,
    fontSize: 20,
    paddingLeft: 16,
    borderRadius: 35,
    color: COLORS.gray,
    backgroundColor: COLORS.white,
  },
});
