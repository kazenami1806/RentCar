import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class ProfileAdmin extends Component {

  // exit, clear async storage
  keluar = async () => {
    this.setState({
      name: "",
      username: "",
      hp: "",
    });
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <View style={styles.bg}>
        <View style={styles.container}>
          <Image
            style={styles.picture}
            source={require("../../../assets/images/user-icon.png")}
            alt="icon_profile"
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginTop: 10,
              color: "white",
            }}
          >
            Hi, Admin
          </Text>
        </View>
        <View style={styles.ButtonSection}>
          <TouchableOpacity
            style={styles.LogoutButton}
            onPress={() => {
              this.keluar();
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#003f5c",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  picture: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  ButtonSection: {
    width: "100%",
    marginTop: 280,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  LogoutButton: {
    width: "30%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});
