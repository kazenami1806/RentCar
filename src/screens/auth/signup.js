import React, { Component } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import styles from "../../config/style";
import Feather from "react-native-vector-icons/Feather";
import { db } from "../../config/config";
import { setDoc, doc } from "firebase/firestore";

export default class SignUp extends Component {
  //deklarasi variable input untuk register
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      phone: "",
      password: "",
      confirmPw: "",
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
    };
  }

  //function input user, pw register di database
  InsertRecord = () => {
    var username = this.state.username;
    var name = this.state.name;
    var phone = this.state.phone;
    var password = this.state.password;
    var ConfirmPw = this.state.confirmPw;
    if (
      username.length == 0 ||
      name.length == 0 ||
      phone.length == 0 ||
      password.length == 0 ||
      ConfirmPw.length == 0
    ) {
      alert("Required Field Is Missing!!!");
    } else if (username.length < 5) {
      alert("Minimum 05 characters required!!!");
      // Password validations
    } else if (password.length < 8) {
      alert("Minimum 08 characters required!!!");
    } else if (password !== ConfirmPw) {
      alert("Password does not match!!!");
    } else {
      setDoc(doc(db, "users", username), {
        username: username,
        password: password,
        name: name,
        phone: phone,
      })
        .then(() => {
          alert("Create Account Success");
          this.props.navigation.navigate("SignIn");
        })
        .catch((error) => {
          alert("Error Occured: " + error);
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

  //function icon hide/show Re-type password
  updateConfirmSecureTextEntry() {
    this.setState({
      ...this.state,
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* logo */}
        <Text style={styles.logoRegis}>Register</Text>
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
        {/* input email - register */}
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Username.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            //mengganti isi variable email
            onChangeText={(username) => this.setState({ username })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Name.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            //mengganti isi variable email
            onChangeText={(name) => this.setState({ name })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Phone.."
            placeholderTextColor="#e6f7ff"
            keyboardType="numeric"
            style={styles.inputText}
            //mengganti isi variable email
            onChangeText={(phone) => this.setState({ phone })}
          />
        </View>
        {/* input password - register */}
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
        {/* input Re-type password - register */}
        <View style={styles.inputPW}>
          <TextInput
            placeholder="Re-Type Password.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            onChangeText={(confirmPw) => this.setState({ confirmPw })}
            secureTextEntry={this.state.confirmSecureTextEntry ? true : false}
          />
          {/* Eye Icon for show/hide Re-type password */}
          <TouchableOpacity
            onPress={this.updateConfirmSecureTextEntry.bind(this)}
          >
            {this.state.confirmSecureTextEntry ? (
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
        {/* Button Register dengan memanggil function InsertRecord */}
        <Pressable
          style={styles.LoginBtn}
          onPress={() => {
            this.InsertRecord();
          }}
        >
          <Text style={styles.LoginText}>Register</Text>
        </Pressable>
        <StatusBar style="auto" />
      </View>
    );
  }
}
