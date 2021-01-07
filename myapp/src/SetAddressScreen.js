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
import Geocoder from "react-native-geocoder";
import axios from "axios";
import { requestPermissionsAsync } from "expo-calendar";
import { add } from "react-native-reanimated";

const SetAddressScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [addressInfo, setAddressInfo] = useState([]);

  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    error: null,
  });

  useEffect(() => {
    axios
      .get(`api/user/address?user_id=${user.id}`)
      .then((response) => {
        console.log(response.data);
        setAddressInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

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

  const onClick = () => {
    setAddressInfo({ ...addressInfo, user_id: user.id });
    axios
      .post("api/user/address", addressInfo)
      .then((response) => {
        console.log("success?", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <ScrollView>
        <TextInput
          placeholder="Country.."
          defaultValue={addressInfo ? addressInfo.country : "Country.."}
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="countryName"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, country: value })
          }
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.area : "Area.."}
          placeholder="Area.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="addressState"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, area: value })
          }
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.street : "Street.."}
          placeholder="Street.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="fullStreetAddress"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, street: value })
          }
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.building : "Building.."}
          placeholder="Building.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="name"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, building: value })
          }
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.floor : "Floor.."}
          placeholder="Floor.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="oneTimeCode"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, floor: value })
          }
        />
        <TextInput
          defaultValue={
            addressInfo ? addressInfo.additional_details : "Additional Details"
          }
          placeholder="Additional Details.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="location"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, additional_details: value })
          }
        />
        <View style={{ marginTop: 5, marginHorizontal: 16 }}>
          <TouchableOpacity onPress={() => onClick()}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.yellow2]}
              style={styles.next}
            >
              <Text style={styles.next_text}>Save Address</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    height: "45%",
    justifyContent: "flex-start",
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
    paddingBottom: 5,
    paddingLeft: 16,
    borderRadius: 35,
    color: COLORS.gray,
    backgroundColor: COLORS.white,
  },
});
