import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Button } from "react-native-paper";

const ExploreScreen = () => {
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="light-content" /> */}
      <Text>Explore Screen</Text>
      <Button title="Click here" onPress={() => alert("Button Clicked!")} />
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
