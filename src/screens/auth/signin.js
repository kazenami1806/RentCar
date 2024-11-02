import React, { Component } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  LogBox,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../../config/style";
import Feather from "react-native-vector-icons/Feather";
import { db } from "../../config/config";
import { getDocs, where, query, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SignIn extends Component {
  //deklarasi variable input untuk login
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      check_textInputChange: false,
      secureTextEntry: true,
      cek_username: "",
      cek_pass: "",
    };
  }

  componentDidMount = () => {
    LogBox.ignoreAllLogs();
  };

  //function cek input user, pw login di database
  Login = () => {
    var username = this.state.username;
    var password = this.state.password;
    if (username.length === 0 || password.length === 0) {
      alert("HARAP ISI FORM !!!");
    } else {
      getDocs(
        query(collection(db, "users"), where("username", "==", username))
      ).then((docSnap) => {
        let users = [];
        docSnap.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        this.setState({
          cek_username: users[0].username,
          cek_pass: users[0].password,
        });
        if (
          this.state.username === this.state.cek_username &&
          this.state.password === this.state.cek_pass
        ) {
          AsyncStorage.setItem("users", JSON.stringify(users));
          this.props.navigation.navigate("Tombol");
        } else {
          Alert.alert("Login Failed!!");
        }
      });
    }
  };

  //function icon hide/show password
  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* logo */}
        <Image
          style={{
            tintColor: "white",
            marginBottom: 20,
            width: 310,
            height: 120,
            alignSelf: "center",
            justifyContent: "center",
          }}
          source={require("../../../assets/images/logo.png")}
          alt="logo"
        />
        {/* input email - login */}
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Username.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            //mengganti isi variable email
            onChangeText={(username) => this.setState({ username })}
          />
        </View>
        {/* input password - login */}
        <View style={styles.inputPW}>
          <TextInput
            placeholder="Enter Password.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            secureTextEntry={this.state.secureTextEntry ? true : false}
            //mengganti isi variable password
            onChangeText={(password) => this.setState({ password })}
          />
          {/* Eye Icon for show/hide password */}
          <TouchableOpacity onPress={this.updateSecureTextEntry.bind(this)}>
            {this.state.secureTextEntry ? (
              <Feather
                style={styles.eye}
                name="eye-off"
                color="grey"
                size={20}
              />
            ) : (
              <Feather style={styles.eye} name="eye" color="black" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {/* Button Login dengan memanggil function InsertRecord */}
        <Pressable
          style={styles.LoginBtn}
          onPress={() => {
            this.Login();
            // this.props.navigation.navigate("Tombol");
          }}
        >
          <Text style={styles.LoginText}>Login</Text>
        </Pressable>
        <View>
          {/* Text jika diklik mengarah ke Register */}
          <Pressable
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.LoginText}>Create new Account</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
}
