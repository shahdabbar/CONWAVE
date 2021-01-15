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
        if (response.data[0]) {
          setAddressInfo(response.data[0]);
        }
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

  async function onClick() {
    setAddressInfo({
      ...addressInfo,
      latitude: marker ? marker.latitude : addressInfo.latitude,
      longitude: marker ? marker.longitude : addressInfo.longitude,
    });

    console.log(addressInfo);
    try {
      const response = await axios.post("api/user/address", addressInfo);
      console.log("success?", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const onPress = async (e) => {
    setMarker(e.nativeEvent.coordinate);
    let result = await Location.reverseGeocodeAsync(e.nativeEvent.coordinate);
    console.log("result", result);
    await setAddressInfo({
      country: result[0].country,
      area: result[0].subregion,
      street: result[0].street,
      user_id: user.id,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsCompass={true}
        rotateEnabled={false}
        region={{
          latitude: state.latitude,
          longitude: state.longitude,
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
        <Text style={styles.text}>Country:</Text>
        <TextInput
          // placeholder="Country.."
          defaultValue={addressInfo.country}
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="countryName"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, country: value })
          }
        />
        <Text style={styles.text}>Region:</Text>
        <TextInput
          defaultValue={addressInfo.area ? addressInfo.area : ""}
          // placeholder="Region.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="addressState"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, subregion: value })
          }
        />
        <Text style={styles.text}>Street:</Text>
        <TextInput
          defaultValue={addressInfo.street ? addressInfo.street : ""}
          // placeholder="Street.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="fullStreetAddress"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, street: value })
          }
        />
        <Text style={styles.text}>Building:</Text>
        <TextInput
          defaultValue={addressInfo.building ? addressInfo.building : ""}
          // placeholder="Building.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="name"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, building: value })
          }
        />
        <Text style={styles.text}>Floor:</Text>
        <TextInput
          defaultValue={addressInfo.floor ? addressInfo.floor : ""}
          // placeholder="Floor.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="oneTimeCode"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, floor: value })
          }
        />
        <Text style={styles.text}>Additional Details:</Text>
        <TextInput
          defaultValue={
            addressInfo.additional_details ? addressInfo.additional_details : ""
          }
          // placeholder="Additional Details.."
          placeholderTextColor={COLORS.gray}
          style={styles.textInput}
          textContentType="location"
          autoCapitalize="words"
          onChangeText={(value) =>
            setAddressInfo({ ...addressInfo, additional_details: value })
          }
        />
        <View style={{ marginTop: 16, marginBottom: 20, marginHorizontal: 16 }}>
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
    // backgroundColor: COLORS.white,
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
    fontSize: 18,
    color: COLORS.black3,
    marginHorizontal: 33,
    marginTop: 10,
    // fontWeight: "bold",
  },
  textInput: {
    marginHorizontal: 20,
    marginVertical: 2,
    height: 70,
    borderColor: COLORS.beige,
    borderWidth: 2,
    elevation: 5,
    fontSize: 20,
    paddingBottom: 5,
    paddingLeft: 16,
    borderRadius: SIZES.radius,
    color: COLORS.gray,
    backgroundColor: COLORS.white,
  },
});
