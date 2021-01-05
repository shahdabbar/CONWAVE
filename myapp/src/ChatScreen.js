import React, { useEffect, useState, Component } from "react";
import { Platform, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Button } from "react-native-paper";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "./Fire";
import { COLORS } from "./constants";

class ChatScreen extends Component {
  state = {
    messages: [],
  };

  get user() {
    return {
      _id: Fire.uid,
      name: this.props.route.params.name,
    };
  }

  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    // console.ignoredYellowBox = ["Setting a timer"];
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        messagesContainerStyle={{ backgroundColor: COLORS.white }}
        onSend={Fire.send}
        user={this.user}
      />
    );

    if (Platform.OS === "android") {
      return (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          keyboardVerticalOffset={30}
          enabled
        >
          {chat}
        </KeyboardAvoidingView>
      );
    }
    return <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>;
  }
}

export default ChatScreen;
