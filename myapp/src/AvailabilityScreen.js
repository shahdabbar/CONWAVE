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

const AvailabilityScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [hours, setHours] = useState([
    {
      hour: "7 am",
      key: "7am",
      isSelected: false,
    },
    {
      hour: "8 am",
      key: "8am",
      isSelected: false,
    },
    {
      hour: "9 am",
      key: "9am",
      isSelected: false,
    },
    {
      hour: "10 am",
      key: "10am",
      isSelected: false,
    },
    {
      hour: "11 am",
      key: "11am",
      isSelected: false,
    },
    {
      hour: "12 pm",
      key: "12pm",
      isSelected: false,
    },
    {
      hour: "1 pm",
      key: "1pm",
      isSelected: false,
    },
    {
      hour: "2 pm",
      key: "2pm",
      isSelected: false,
    },
    {
      hour: "3 pm",
      key: "3pm",
      isSelected: false,
    },
    {
      hour: "4 pm",
      key: "4pm",
      isSelected: false,
    },
    {
      hour: "5 pm",
      key: "5pm",
      isSelected: false,
    },
    {
      hour: "6 pm",
      key: "6pm",
      isSelected: false,
    },
    {
      hour: "7 pm",
      key: "7pm",
      isSelected: false,
    },
    {
      hour: "8 pm",
      key: "8pm",
      isSelected: false,
    },
    {
      hour: "9 pm",
      key: "9pm",
      isSelected: false,
    },
    {
      hour: "10 pm",
      key: "10pm",
      isSelected: false,
    },
  ]);

  const [days, setDays] = useState([
    {
      name: "Sun",
      key: 1,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Mon",
      key: 2,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Tue",
      key: 3,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Wed",
      key: 4,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Thu",
      key: 5,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Fri",
      key: 6,
      isSelected: false,
      hours: hours,
    },
    {
      name: "Sat",
      key: 7,
      isSelected: false,
      hours: hours,
    },
  ]);

  //   const [day, setDay] = useState([]);
  //   const [hour, setHour] = useState([]);

  //   useEffect(() => {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  //     // get days
  //     axios
  //       .get("api/days")
  //       .then((response) => {
  //         setDay(response.data);
  //         console.log("dayssssss", response.data);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });

  //     // get hours
  //     axios
  //       .get("api/hours")
  //       .then((response) => {
  //         setHour(response.data);
  //         console.log("hourssssss", response.data);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   }, []);

  //   const timeslotsSetUp = () => {
  //     if (day && hour) {
  //       const array = [];
  //       day.forEach((day) => {
  //         hour.forEach((hour) => {
  //           array.push({ day_id: day.id, hour_id: hour.id });
  //         });
  //       });
  //       //   console.log(array);
  //       axios.post("/api/timeslots", array).then((response) => {
  //         console.log("response", response.data);
  //       });
  //     }
  //   };

  const onSavePress = () => {
    const newData = days.forEach((e) => {
      if (
        e.hours.forEach((e) => {
          if (e.isSelected === true) return true;
        })
      ) {
        return {
          ...e,
          isSelected: !e.isSelected,
        };
      }
      return {
        ...e,
        isSelected: e.isSelected,
      };
    });
    console.log(days);
  };

  const renderHours = () => {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {selectedDay ? (
          <FlatList
            horizontal={false}
            data={selectedDay.hours}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.key}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              marginBottom: 400,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.content}>
                  <TouchableOpacity
                    disabled={item.isSelected ? true : false}
                    style={{
                      elevation: 10,
                      ...styles.wrapper_content,
                      backgroundColor: item.isSelected
                        ? COLORS.yellow
                        : COLORS.white,
                      borderColor: item.isSelected
                        ? COLORS.primary
                        : COLORS.yellow,
                    }}
                    onPress={() => {
                      onHourPress(item);
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          ...styles.text,
                          color: COLORS.black,
                        }}
                      >
                        {item.hour}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        ) : null}
      </ScrollView>
    );
  };

  const onHourPress = (item, index) => {
    const newData = selectedDay.hours.map((e) => {
      if (e.key === item.key) {
        return {
          ...e,
          isSelected: !e.isSelected,
        };
      }
      return {
        ...e,
        isSelected: e.isSelected,
      };
    });
    setSelectedDay({ ...selectedDay, hours: newData });
  };

  const onDaySelected = (item) => {
    if (selectedDay) {
      const newDays = days.map((e) => {
        if (e.key === selectedDay.key) {
          return {
            ...e,
            hours: selectedDay.hours,
          };
        }
        return {
          ...e,
          hours: e.hours,
        };
      });
      setDays(newDays);
      console.log(days);
    }

    setSelectedDay(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.text}>Availabilites</Text>
          <TouchableOpacity
            onPress={() => {
              //   onSavePress();
              timeslotsSetUp();
            }}
          >
            <Text style={styles.subText}>Save</Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            horizontal={true}
            data={days}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => `${item.key}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.content}>
                  <TouchableOpacity
                    style={{
                      ...styles.days,
                      elevation: 5,
                      backgroundColor:
                        selectedDay?.key === item.key
                          ? COLORS.lightblue
                          : COLORS.white,
                      borderColor:
                        selectedDay?.key === item.key
                          ? COLORS.primary
                          : COLORS.yellow,
                    }}
                    onPress={() => {
                      //   onDayPress(item);
                      onDaySelected(item);
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.hours}>{renderHours()}</View>
      </View>
    </View>
  );
};

export default AvailabilityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },

  wrapper_content: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 15,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    justifyContent: "space-between",
    paddingBottom: 8,
    paddingLeft: 5,
  },
  days: {
    top: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    borderColor: "#ffd200",
    borderWidth: 2,
  },
  hours: {
    top: 30,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 25,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 20,
    color: "orange",
    fontWeight: "800",
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
