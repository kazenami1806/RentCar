import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import {
  doc,
  where,
  query,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/config";
import Feather from "react-native-vector-icons/Feather";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.route.params.username,
      name: "",
      hp: "",
      password: "",
      confirmPw: "",
      check_textInputChange: false,
      secureTextEntry: true,
      confirmSecureTextEntry: true,
    };
  }

  // mengambil data user
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
        password: users[0].password,
      });
    });
  };

  // update data user
  updateData = async () => {
    var Username = this.state.username;
    var Fullname = this.state.name;
    var phone = this.state.hp;
    var Password = this.state.password;
    var ConfirmPw = this.state.confirmPw;
    if (
      Fullname.length == 0 ||
      phone.length == 0 ||
      Password.length == 0 ||
      ConfirmPw.length == 0
    ) {
      alert("Required Field Is Missing!!!");
    } else if (Password.length < 8) {
      alert("Minimum 08 characters required!!!");
    } else if (Password !== ConfirmPw) {
      alert("Password does not match!!!");
    } else {
      updateDoc(doc(db, "users", Username), {
        name: Fullname,
        phone: phone,
        password: Password,
      })
        .then(() => {
          alert("Edit data success");
          this.props.navigation.navigate("Profile");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    this.getData();
  }

  updateSecureTextEntry() {
    this.setState({
      ...this.state,
      secureTextEntry: !this.state.secureTextEntry,
    });
  }
  updateConfirmSecureTextEntry() {
    this.setState({
      ...this.state,
      confirmSecureTextEntry: !this.state.confirmSecureTextEntry,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logoRegis}>Edit Profile</Text>
        <View style={styles.inputView}>
          <TextInput
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            onChangeText={(name) => this.setState({ name })}
          >
            {this.state.name}
          </TextInput>
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholderTextColor="#e6f7ff"
            keyboardType="numeric"
            style={styles.inputText}
            onChangeText={(hp) => this.setState({ hp })}
          >
            {this.state.hp}
          </TextInput>
        </View>
        <View style={styles.inputPW}>
          <TextInput
            placeholder="Enter Password.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            secureTextEntry={this.state.secureTextEntry ? true : false}
            onChangeText={(password) => this.setState({ password })}
          />
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
        <View style={styles.inputPW}>
          <TextInput
            placeholder="Re-Type Password.."
            placeholderTextColor="#e6f7ff"
            style={styles.inputText}
            onChangeText={(confirmPw) => this.setState({ confirmPw })}
            secureTextEntry={this.state.confirmSecureTextEntry ? true : false}
          />
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
        <Pressable
          style={styles.LoginBtn}
          onPress={() => {
            this.updateData();
          }}
        >
          <Text style={styles.LoginText}>Edit</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },

  logoRegis: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#fb5b5a",
    marginBottom: 40,
  },

  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },

  inputPW: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  eye: {
    paddingTop: 12,
    paddingRight: 5,
  },

  inputText: {
    height: 50,
    color: "white",
  },

  LoginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  LoginText: {
    color: "white",
  },
});
