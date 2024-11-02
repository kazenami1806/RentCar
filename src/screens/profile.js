import React, { Component } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { where, query, collection, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      hp: "",
    };
  }

  // get data user
  getData = async () => {
    var Username = this.state.username;
    await getDocs(
      query(collection(db, "users"), where("username", "==", Username))
    ).then((docSnap) => {
      let users = [];
      docSnap.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        name: users[0].name,
        hp: users[0].phone,
      });
    });
  };

  componentDidUpdate = () => {
    this.getData();
  };

  componentDidMount = async () => {
    const savedUser = await AsyncStorage.getItem("users");
    const currentUser = JSON.parse(savedUser);
    this.setState({
      username: currentUser[0].username,
    });
    this.getData();
  };

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
            source={require("../../assets/images/user-icon.png")}
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
            Hi, {this.state.username}
          </Text>
          <View style={styles.box}>
            <View style={{ flexDirection: "row" }}></View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, color: "white" }}>Name</Text>
              <Text style={{ fontSize: 20, marginLeft: 10, color: "white" }}>
                :
              </Text>
              <Text style={{ fontSize: 20, marginLeft: 20, color: "white" }}>
                {this.state.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20, color: "white" }}>Phone</Text>
              <Text style={{ fontSize: 20, marginLeft: 7, color: "white" }}>
                :
              </Text>
              <Text style={{ fontSize: 20, marginLeft: 20, marginBottom: 5, color: "white" }}>
                {this.state.hp}
              </Text>
            </View>
          </View>
        </View>
        {/* <TouchableOpacity
            style={styles.OfficeButton}
            onPress={() => {
              this.props.navigation.navigate("Office");
            }}
          ><Text style={{ color: "white", fontSize: 16 }}>Office</Text></TouchableOpacity> */}
        <View style={styles.ButtonSection}>
          <TouchableOpacity
            style={styles.EditButton}
            onPress={() => {
              this.props.navigation.navigate("Edit Profile", {
                username: this.state.username,
              });
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Edit</Text>
          </TouchableOpacity>
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
  box: {
    marginTop: 15,
    width: "85%",
    paddingLeft: 45,
  },
  picture: {
    marginTop: 20,
    width: 150,
    height: 150,
    borderRadius: 150,
  },
  ButtonSection: {
    width: "100%",
    marginTop: 225,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  EditButton: {
    width: "30%",
    backgroundColor: "#0096FF",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
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
