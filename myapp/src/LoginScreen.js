import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  MaterialIcons as MaterialIcon,
  Ionicons as Ionicon,
  MaterialCommunityIcons as Icon,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "react-native-vector-icons";

export class LoginScreen extends Component {
  state = {
    name: "Shahd",
  };

  continue = () => {
    this.props.navigation.navigate("Chat", { name: this.state.name });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginHorizontal: 32 }}>
          <Text style={styles.header}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="name"
            onChangeText={(name) => {
              this.setState({ name });
            }}
            value={this.state.name}
          />
          <View style={{ alignItems: "flex-end", marginTop: 64 }}>
            <TouchableOpacity style={styles.continue} onPress={this.continue}>
              <Ionicon name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F7",
  },

  header: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#514E5A",
    marginTop: 200,
  },

  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#BAB7C3",
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600",
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075E3",
    justifyContent: "center",
    alignItems: "center",
  },
});
