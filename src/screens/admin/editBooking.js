import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Select, CheckIcon, NativeBaseProvider } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import {
  doc,
  where,
  query,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/config";

export default class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBooking: this.props.route.params.idBooking,
      username: "",
      name: "",
      receiver: "",
      rentDate: "",
      dayRent: "",
      alamat: "",
      status: "",
    };
  }

  // mengambil data user
  getData = async () => {
    var idBooking = this.state.idBooking;
    await getDocs(
      query(collection(db, "booking"), where("idBooking", "==", idBooking))
    ).then((docSnap) => {
      let booking = [];
      docSnap.forEach((doc) => {
        booking.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        idBooking: booking[0].idBooking,
        username: booking[0].username,
        name: booking[0].name,
        receiver: booking[0].receiver,
        rentDate: booking[0].rentDate,
        dayRent: booking[0].dayRent,
        alamat: booking[0].alamat,
        status: booking[0].status,
      });
    });
  };

  // update data user
  updateData = async () => {
    var idBooking = this.state.idBooking;
    var receiver = this.state.receiver;
    var alamat = this.state.alamat;
    var status = this.state.status;
    if (receiver.length == 0 || alamat.length == 0 || status.length == 0) {
      alert("Required Field Is Missing!!!");
    } else {
      updateDoc(doc(db, "booking", idBooking), {
        receiver: receiver,
        alamat: alamat,
        status: status,
      })
        .then(() => {
          alert("Edit booking success");
          this.props.navigation.navigate("ListBooking");
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
      <NativeBaseProvider>
        <View style={styles.bg}>
          <ScrollView>
            <View style={styles.viewStyle}>
              <Text style={styles.textTop}> ID Booking </Text>
              <View style={styles.inputStyle}>
                <Text style={styles.textInput}>{this.state.idBooking}</Text>
              </View>
              <Text style={styles.textTop}> Username </Text>
              <View style={styles.inputStyle}>
                <Text style={styles.textInput}>{this.state.username}</Text>
              </View>
              <Text style={styles.textTop}> Name Product </Text>
              <View style={styles.inputStyle}>
                <Text style={styles.textInput}>{this.state.name}</Text>
              </View>
              <Text style={styles.textTop}> *Recipient's Name </Text>
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder="Recipient's Name.."
                  style={styles.textInput}
                  onChangeText={(receiver) => this.setState({ receiver })}
                >
                  {this.state.receiver}
                </TextInput>
              </View>
              <Text style={styles.textTop}> Date Rent </Text>
              <View style={styles.inputStyle}>
                <Text style={styles.textInput}>{this.state.rentDate}</Text>
              </View>
              <Text style={styles.textTop}> *Address </Text>
              <View style={styles.inputStyle}>
                <TextInput
                  placeholder="Address.."
                  style={styles.textInput}
                  onChangeText={(alamat) => this.setState({ alamat })}
                >
                  {this.state.alamat}
                </TextInput>
              </View>
              <Text style={styles.textTop}> *Status </Text>
              <Select
                style={{ color: "white" }}
                minWidth="285"
                accessibilityLabel="Status"
                placeholder={this.state.status}
                _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size={5} />,
                }}
                mt="1"
                onValueChange={(status) => this.setState({ status })}
              >
                <Select.Item label="Process" value="Process" color="white" />
                <Select.Item label="Done" value="Done" />
              </Select>
              <TouchableOpacity
                style={styles.Btn}
                onPress={() => {
                  this.updateData();
                }}
              >
                <Text style={styles.BtnText}>Edit Booking</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#003f5c",
  },

  viewStyle: {
    marginTop: 15,
    backgroundColor: "#003f5c",
    alignItems: "center",
  },

  inputStyle: {
    width: "80%",
    height: 40,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#465881",
    marginBottom: 5,
    paddingLeft: 20,
  },

  textTop: {
    height: 30,
    paddingLeft: 55,
    alignSelf: "flex-start",
    fontSize: 15,
    textAlignVertical: "center",
    color: "#EEEEEE",
  },

  textInput: {
    height: 37,
    fontSize: 20,
    textAlignVertical: "center",
    color: "#e6f7ff",
  },

  Btn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  BtnText: {
    color: "white",
  },
});
