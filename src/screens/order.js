import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      selectedStartDate: null,
      name_product: this.props.route.params.name_product,
      price: this.props.route.params.price,
      idBooking: "",
      username: "",
      receiver: "",
      dayRent: "",
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  // date change
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }

  // auto generate id order
  makeId = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    this.setState({ idBooking: r });
  };

  componentDidMount = async () => {
    this.makeId();
    const savedUser = await AsyncStorage.getItem("users");
    const currentUser = JSON.parse(savedUser);
    this.setState({
      username: currentUser[0].username,
    });
  };

  render() {
    const { selectedStartDate } = this.state;
    const startDate = moment(selectedStartDate).format("DD MMM YYYY");
    this.state.date = startDate;
    console.log(this.state.date);
    return (
      <View style={styles.bg}>
        <ScrollView>
          <View style={styles.viewStyle}>
            <Text style={styles.logoRegis}>Order</Text>
            <Text style={styles.textTop}> Name Product </Text>
            <View style={styles.inputStyle}>
              <Text style={styles.textInput}>{this.state.name_product}</Text>
            </View>
            <Text style={styles.textTop}> *Recipient's Name </Text>
            <View style={styles.inputStyle}>
              <TextInput
                placeholder="Recipient's Name.."
                style={styles.textInput}
                onChangeText={(receiver) => this.setState({ receiver })}
              />
            </View>
            <Text style={styles.textTop}> *Date Rent </Text>
            <View
              style={{
                marginBottom: 5,
              }}
            >
              <View style={{ backgroundColor: "#e6f7ff", borderRadius: 20 }}>
                <CalendarPicker width={280} onDateChange={this.onDateChange} />
              </View>
              <Text
                style={{ fontSize: 15, color: "#e6f7ff", textAlign: "center" }}
              >
                Date : {startDate}
              </Text>
            </View>
            <Text style={styles.textTop}> *Day Rent </Text>
            <View style={styles.inputStyle}>
              <TextInput
                placeholder="Day Rent.."
                style={styles.textInput}
                keyboardType="numeric"
                onChangeText={(dayRent) => this.setState({ dayRent })}
              />
            </View>
            <TouchableOpacity
              style={styles.LoginBtn}
              onPress={() => {
                this.props.navigation.navigate("Location", {
                  idBooking: this.state.idBooking,
                  username: this.state.username,
                  name_product: this.state.name_product,
                  price: this.state.price,
                  receiver: this.state.receiver,
                  date: this.state.date,
                  dayRent: this.state.dayRent,
                });
              }}
            >
              <Text style={styles.LoginText}>Set Location</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: "#003f5c",
  },
  logoRegis: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#fb5b5a",
    marginTop: 20,
    marginBottom: 10,
  },

  viewStyle: {
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

  calendar: {
    width: "80%",
    height: 40,
    borderRadius: 25,
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
