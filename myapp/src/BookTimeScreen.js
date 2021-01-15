import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
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
import axios from "axios";

import moment from "moment";
import * as Calendar from "expo-calendar";
import * as Localization from "expo-localization";
import Constants from "expo-constants";

import CalendarStrip from "react-native-calendar-strip";
// import DateTimePicker from "react-native-modal-datetime-picker";

const BookTimeScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

  const [state, setState] = useState({
    datesWhitelist: [
      {
        start: moment(),
        end: moment().add(365, "days"), // total 4 days enabled
      },
    ],
    todoList: [],
    markedDate: [],
    currentDate: `${moment().format("YYYY")}-${moment().format(
      "MM"
    )}-${moment().format("DD")}`,
    isModalVisible: false,
    selectedTask: null,
    isDateTimePickerVisible: false,
  });

  const [course, setCourse] = useState(route.params.course);
  const [type, setType] = useState(route.params.type);

  console.log("cccccccccccc", course);

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);

  const [days, setDays] = useState([
    {
      name: "Sun",
      id: 1,
      isSelected: false,
      hours: [],
    },
    {
      name: "Mon",
      id: 2,
      isSelected: false,
      hours: [],
    },
    {
      name: "Tue",
      id: 3,
      isSelected: false,
      hours: [],
    },
    {
      name: "Wed",
      id: 4,
      isSelected: false,
      hours: [],
    },
    {
      name: "Thu",
      id: 5,
      isSelected: false,
      hours: [],
    },
    {
      name: "Fri",
      id: 6,
      isSelected: false,
      hours: [],
    },
    {
      name: "Sat",
      id: 7,
      isSelected: false,
      hours: [],
    },
  ]);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    // get timeslots
    axios
      .get(`api/timeslots/sunday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[0] = { ...days[0], hours: response.data };
        // console.log("days", days[0]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });

    axios
      .get(`api/timeslots/monday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[1] = { ...days[1], hours: response.data };
        // console.log("days", days[1]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/tuesday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[2] = { ...days[2], hours: response.data };
        // console.log("days", days[2]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/wednesday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[3] = { ...days[3], hours: response.data };
        // console.log("days", days[3]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/thursday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[4] = { ...days[4], hours: response.data };
        // console.log("days", days[4]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/friday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[5] = { ...days[5], hours: response.data };
        // console.log("days", days[5]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
    axios
      .get(`api/timeslots/saturday?user_id=${course.tutor.id}`)
      .then((response) => {
        days[6] = { ...days[6], hours: response.data };
        // console.log("days", days[6]);
        setDays(days);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const renderHours = () => {
    return (
      <View>
        {selectedDay ? (
          <FlatList
            horizontal={false}
            data={selectedDay.hours}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => `${item.id}`}
            contentContainerStyle={{
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding,
              Bottom: 900,
            }}
            renderItem={({ item }) => {
              return (
                <View style={styles.content}>
                  {selectedHour && selectedHour.hours.id === item.hours.id ? (
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          ...styles.wrapper_content,
                          backgroundColor: item.isSelected
                            ? COLORS.black2
                            : COLORS.lightGray3,
                          borderColor: item.isSelected
                            ? COLORS.pink
                            : COLORS.white,
                        }}
                        onPress={() => {
                          setSelectedHour(null);
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              ...styles.text,
                              color: item.isSelected ? COLORS.beige : "#BBBBBB",
                            }}
                          >
                            Cancel
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          ...styles.wrapper_content,
                          left: 10,
                          backgroundColor: item.isSelected
                            ? COLORS.yellow2
                            : COLORS.lightGray3,
                          borderColor: item.isSelected
                            ? COLORS.pink
                            : COLORS.white,
                        }}
                        onPress={() => {
                          navigation.navigate("BookSession", {
                            day: selectedDay,
                            date: state.currentDate,
                            hour: selectedHour,
                            course: course,
                            type: type,
                          });
                          setSelectedHour(null);
                          // console.log(selectedHour);
                        }}
                      >
                        <View>
                          {/* <Text style={{ ...styles.text, color: COLORS.black }}>
                            {selectedHour.hours.hour}
                          </Text> */}
                          <Text
                            style={{
                              ...styles.text,
                              color: item.isSelected ? COLORS.white : "#BBBBBB",
                            }}
                          >
                            Confirm
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      disabled={item.isSelected ? false : true}
                      style={{
                        ...styles.wrapper_content,
                        backgroundColor: item.isSelected
                          ? COLORS.white
                          : COLORS.lightGray3,
                        borderColor: item.isSelected
                          ? COLORS.beige
                          : COLORS.white,
                      }}
                      onPress={() => {
                        onHourPress(item);
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            ...styles.text,
                            color: item.isSelected ? COLORS.pink : "#BBBBBB",
                          }}
                        >
                          {item.hours.hour}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        ) : null}
      </View>
    );
  };

  const onHourPress = (item, index) => {
    console.log(state.currentDate);
    setSelectedHour(item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View>
            <MaterialIcon
              name="arrow-back-ios"
              size={24}
              color={COLORS.black3}
              style={{ marginLeft: 10 }}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={{ left: 20 }}>
            <Text style={styles.text}>
              <Text style={{ color: COLORS.pink }}>Pick</Text> a time
            </Text>
          </View>
        </View>
        <CalendarStrip
          // ref={(ref) => {
          //   this.calenderRef = ref;
          // }}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "background",
            duration: 200,
            highlightColor: "#ffffff",
          }}
          style={{
            height: 150,
            paddingTop: 20,
            paddingBottom: 20,
          }}
          calendarHeaderStyle={{ color: "#000000", fontSize: 20 }}
          dateNumberStyle={{ color: "#000000", paddingTop: 10 }}
          dateNameStyle={{ color: "#BBBBBB" }}
          highlightDateNumberStyle={{
            color: "#fff",
            backgroundColor: COLORS.yellow,
            fontWeight: "bold",
            marginTop: 10,
            height: 35,
            width: 35,
            textAlign: "center",
            borderRadius: 17.5,
            overflow: "hidden",
            paddingTop: 6,
            fontWeight: "400",
            justifyContent: "center",
            alignItems: "center",
          }}
          highlightDateNameStyle={{
            color: "#ff35a2",
            fontSize: 15,
            fontWeight: "bold",
          }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey", paddingTop: 10 }}
          datesWhitelist={state.datesWhitelist}
          iconLeft={require("../assets/icons/left-arrow.png")}
          iconRight={require("../assets/icons/right-arrow.png")}
          iconContainer={{ flex: 0.1 }}
          markedDates={state.markedDate}
          onDateSelected={(date) => {
            const day_id = `${moment(date).format("e")}`;
            const selectedDate = `${moment(date).format("YYYY")}-${moment(
              date
            ).format("MM")}-${moment(date).format("DD")}`;
            // this._updateCurrentTask(selectedDate);
            setState({ ...state, currentDate: selectedDate });
            setSelectedDay(days[day_id]);
          }}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.hours}>{renderHours()}</View>
      </View>
    </SafeAreaView>
  );
};

export default BookTimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white2,
    paddingTop: 30,
  },

  wrapper_content: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.pink,
    borderWidth: 2,
    borderRadius: 15,
    elevation: 5,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    paddingBottom: 8,
    alignSelf: "center",
  },
  hours: {
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
