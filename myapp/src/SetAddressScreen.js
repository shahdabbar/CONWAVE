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
import CheckBox from "@react-native-community/checkbox";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "./AuthProvider";
import DrawerContent from "./DrawerContent";
import { deleteItemAsync } from "expo-secure-store";
import { COLORS, SIZES, FONTS, icons } from "../src/constants";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
// import { Marker } from "react-native-svg";

const SetAddressScreen = ({ route, navigation }) => {
  const [addressInfo, setAddressInfo] = useState({
    country: "",
    area: "",
    street: "",
    building: "",
    floor: "",
    additional_details: "",
  });

  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    street: "",
    error: null,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);
        setState({
          street: position.streetName,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: state.latitude,
          longitude: state.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={state}
          title="My Location"
          description="Here i am"
        />

        <Callout></Callout>
      </MapView>
      <View style={{ marginVertical: 10 }}>
        <ScrollView>
          <TextInput
            placeholder="Country.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="countryName"
            autoCapitalize="words"
            onChangeText={(value) => setAddressInfo({ country: value })}
          />
          <TextInput
            placeholder="Area.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="addressState"
            autoCapitalize="words"
            onChangeText={(value) => setAddressInfo({ area: value })}
          />
          <TextInput
            placeholder="Street.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="fullStreetAddress"
            autoCapitalize="words"
            onChangeText={(value) => setAddressInfo({ street: value })}
          />
          <TextInput
            placeholder="Building.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="name"
            autoCapitalize="words"
            onChangeText={(value) => setAddressInfo({ building: value })}
          />
          <TextInput
            placeholder="Floor.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="oneTimeCode"
            autoCapitalize="words"
            onChangeText={(value) => setAddressInfo({ floor: value })}
          />
          <TextInput
            placeholder="Additional Details.."
            placeholderTextColor={COLORS.black}
            style={styles.textInput}
            textContentType="location"
            autoCapitalize="words"
            onChangeText={(value) =>
              setAddressInfo({ additional_details: value })
            }
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SetAddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    // height: Dimensions.get("window").height,
    height: "50%",
    justifyContent: "flex-start",
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
    paddingBottom: 5,
    paddingLeft: 16,
    borderRadius: 35,
    color: COLORS.black2,
    backgroundColor: COLORS.white,
  },
  next: {
    marginTop: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    left: "70%",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    width: "30%",
    height: 70,
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  next_text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
});
