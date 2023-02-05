import React, { Component } from "react";
import Constants from "expo-constants";
import { StatusBar } from 'expo-status-bar';
import { Image, VStack, Center, NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";

export default class Front extends Component {

  componentDidMount() {
    LogBox.ignoreAllLogs();
    // set timeout splash screen
    setTimeout(() => {
      // mengarahkan ke navigate homeStack
      this.props.navigation.navigate("SignIn");
    }, 5000);
  }

  render() {
    return (
      <NativeBaseProvider>
        <VStack
          bg="#003f5c"
          flex="1"
          justifyContent={"center"}
          alignItems={"center"}
          style={{
            marginTop: Constants.statusBarHeight,
          }}
        >
          <Center>
            {/* image logo */}
            <Image style={{ tintColor: 'white', width: 310, height: 150, alignSelf: 'center', justifyContent: 'center' }} source={require("../../assets/images/logo-splash.png")} alt="splash" />
          </Center>
          <Image />
        </VStack>
        <StatusBar
          backgroundColor="#003f5c"
        />
      </NativeBaseProvider>
    );
  }
}