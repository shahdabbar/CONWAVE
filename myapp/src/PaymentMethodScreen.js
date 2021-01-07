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
import axios from "axios";
import { webView } from "react-native-webview";
import PaymentView from "./PaymentView";

const PaymentMethodScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);

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

    console.log("check", jsonResponse.token ? "Yes" : "NOOO");

    if (jsonResponse.token) {
      navigation.navigate("BookSession", {
        status: "success",
      });
    } else {
      navigation.navigate("BookSession", {
        status: "failed",
      });
    }

    // try {
    //   const stripeResponse = await axios.post("http://localhost:8000/payment", {
    //     email: "shahdabbar32@gmail.com",
    //     product: cartInfo,
    //     authToken: jsonResponse,
    //   });

    //   if (stripeResponse) {
    //     const { paid } = stripeResponse.data;
    //     if (paid === true) {
    //       setPaymentStatus("Payment Success");
    //     } else {
    //       setPaymentStatus("Payment failed due to some issue");
    //     }
    //   } else {
    //     setPaymentStatus(" Payment failed due to some issue");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setPaymentStatus(" Payment failed due to some issue");
    // }
  };

  const paymentUI = () => {
    if (!makePayment) {
      return (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: 300,
            marginTop: 50,
          }}
        >
          <Text style={{ fontSize: 25, margin: 10 }}> Make Payment </Text>
          <Text style={{ fontSize: 16, margin: 10 }}>
            {" "}
            Product Description: {cartInfo.description}{" "}
          </Text>
          <Text style={{ fontSize: 16, margin: 10 }}>
            {" "}
            Payable Amount: {cartInfo.amount}{" "}
          </Text>

          <TouchableOpacity
            style={{
              height: 60,
              width: 300,
              backgroundColor: COLORS.black2,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setMakePayment(true);
            }}
          >
            <Text style={{ color: "#FFF", fontSize: 20 }}>Proceed To Pay</Text>
          </TouchableOpacity>
        </View>
      );

      // show to make payment
    } else {
      if (response !== undefined) {
        return (
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              marginTop: 50,
            }}
          >
            <Text style={{ fontSize: 25, margin: 10 }}> {paymentStatus} </Text>
            <Text style={{ fontSize: 16, margin: 10 }}> {response} </Text>
          </View>
        );
      } else {
        return (
          <PaymentView
            onCheckStatus={onCheckStatus}
            product={cartInfo.description}
            amount={cartInfo.amount}
          />
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <PaymentView
        onCheckStatus={onCheckStatus}
        product={cartInfo.description}
        amount={cartInfo.amount}
      />

      {/* {paymentUI()} */}
    </View>
  );
};

export default PaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 100,
  },
  payment: {
    fontSize: 27,
    fontWeight: "bold",
    color: COLORS.pink,
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
