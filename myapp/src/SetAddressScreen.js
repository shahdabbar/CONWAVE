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
import { add } from "react-native-reanimated";

const SetAddressScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [addressInfo, setAddressInfo] = useState([]);
  const [address, setAddress] = useState({
    user_id: user.id,
    country: "",
    area: "",
    street: "",
    building: "",
    floor: "",
    additional_details: "",
    latitude: "",
    longitude: "",
  });
  const [geocode, setGeocode] = useState(null);
  const [marker, setMarker] = useState(null);

  const [state, setState] = useState({
    latitude: 0,
    longitude: 0,
    error: null,
  });

  useEffect(() => {
    axios
      .get(`api/user/address?user_id=${user.id}`)
      .then((response) => {
        setAddressInfo(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 20000 }
    );
  }, []);

  function onClick() {
    setAddress({
      ...address,
      country: geocode.country ? geocode.country : addressInfo.country,
      area: geocode.subregion ? geocode.subregion : addressInfo.area,
      street: geocode.street ? geocode.street : addressInfo.street,
      building: address.building ? address.building : addressInfo.building,
      floor: address.floor ? address.floor : addressInfo.floor,
      additional_details: address.additional_details
        ? address.additional_details
        : addressInfo.additional_details,
      latitude: marker.latitude ? marker.latitude : addressInfo.latitude,
      longitude: marker.longitude ? marker.longitude : addressInfo.longitude,
    });
    console.log(address);
    axios
      .post("api/user/address", address)
      .then((response) => {
        console.log("success?", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const onPress = async (e) => {
    setMarker(e.nativeEvent.coordinate);
    let result = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate);
    await setGeocode(result[0]);
  };

  console.log(addressInfo);
  console.log(
    geocode ? geocode.country : addressInfo ? addressInfo.country : "Country.."
  );
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        region={{
          latitude: 33.8846975,
          longitude: 35.5053606,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={(event) => onPress(event)}
      >
        {marker && (
          <Marker
            coordinate={marker}
            title="My Location"
            description="Here I am"
          />
        )}
      </MapView>
      <ScrollView>
        <TextInput
          placeholder="Country.."
          defaultValue={
            geocode
              ? geocode.country
              : addressInfo
              ? addressInfo.country
              : "Country.."
          }
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="countryName"
          autoCapitalize="words"
          onChangeText={(value) => setGeocode({ ...geocode, country: value })}
        />
        <TextInput
          defaultValue={
            geocode
              ? geocode.subregion
              : addressInfo
              ? addressInfo.area
              : "Region.."
          }
          // defaultValue={addressInfo ? addressInfo.area : "Region.."}
          placeholder="Region.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="addressState"
          autoCapitalize="words"
          onChangeText={(value) => setGeocode({ ...geocode, subregion: value })}
        />
        <TextInput
          defaultValue={
            geocode
              ? geocode.street
              : addressInfo
              ? addressInfo.street
              : "Street.."
          }
          // defaultValue={addressInfo ? addressInfo.street : "Street.."}
          placeholder="Street.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="fullStreetAddress"
          autoCapitalize="words"
          onChangeText={(value) => setGeocode({ ...geocode, street: value })}
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.building : "Building.."}
          placeholder="Building.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="name"
          autoCapitalize="words"
          onChangeText={(value) => setAddress({ ...address, building: value })}
        />
        <TextInput
          defaultValue={addressInfo ? addressInfo.floor : "Floor.."}
          placeholder="Floor.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="oneTimeCode"
          autoCapitalize="words"
          onChangeText={(value) => setAddress({ ...address, floor: value })}
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
            setAddress({ ...address, additional_details: value })
          }
        />
        <View style={{ marginTop: 5, marginBottom: 20, marginHorizontal: 16 }}>
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
