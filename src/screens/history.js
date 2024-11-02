import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Card } from "react-native-paper";
import {
  doc,
  where,
  query,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBooking: "",
      username: "",
      resData: [],
      resDataDone: [],
    };
  }

  // mengambil data history booking berdasarkan user dan status process
  getData = () => {
    var Username = this.state.username;
    getDocs(
      query(
        collection(db, "booking"),
        where("username", "==", Username),
        where("status", "==", "Process")
      )
    ).then((docSnap) => {
      let booking = [];
      docSnap.forEach((doc) => {
        booking.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        resData: booking,
      });
    });
  };

  // mengambil data history booking berdasarkan user dan status done
  getDataDone = () => {
    var Username = this.state.username;
    getDocs(
      query(
        collection(db, "booking"),
        where("username", "==", Username),
        where("status", "==", "Done")
      )
    ).then((docSnap) => {
      let booking = [];
      docSnap.forEach((doc) => {
        booking.push({ ...doc.data(), id: doc.id });
      });
      this.setState({
        resDataDone: booking,
      });
    });
  };

  // function delete
  handleDelete = (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this item?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => this.deleteData(id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  // function delete
  deleteData = (id) => {
    var IdBooking = id;
    deleteDoc(doc(db, "booking", IdBooking));
    alert("Success Canceling your booking");
  };

  // function refresh
  refresh = () => {
    this.getData();
    this.getDataDone();
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
    this.getDataDone();
  };

  render() {
    return (
      <View style={styles.bg}>
        <ScrollView>
          <View style={styles.list}>
            <View style={styles.header}>
              <Text style={styles.label}>On Progress Booking</Text>
              <TouchableOpacity
                onPress={() => {
                  this.refresh();
                }}
              >
                <Image
                  style={styles.icon}
                  source={require("../../assets/images/refresh.png")}
                  alt="office_loc"
                />
              </TouchableOpacity>
            </View>
            {Object.keys(this.state.resData).length > 0 && (
              <View>
                {this.state.resData.map((val, index) => (
                  <Card style={{ width: "100%", marginTop: 10 }} key={index}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "column", margin: 10 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                              ID Booking
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 10,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 5,
                              }}
                            >
                              {val.idBooking}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 15 }}>Name</Text>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: 44,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: 5,
                              }}
                            >
                              {val.name}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Total Payment</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 19,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              Rp. {val.pay}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Alamat</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 52,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.alamat}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Rent Date</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 41,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.rentDate} ( {val.rentDay} Day )
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Status</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 56,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          width: 80,
                          justifyContent: "center",
                          alignContent: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            alignSelf: "center",
                            justifyContent: "center",
                            width: 60,
                            height: 50,
                            borderRadius: 5,
                            backgroundColor: "#B2B2B2",
                          }}
                          onPress={() => {
                            this.handleDelete(val.idBooking);
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "red",
                              }}
                            >
                              Cancel
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            )}
            <Text style={styles.label2}>Booking Done</Text>
            {Object.keys(this.state.resDataDone).length > 0 && (
              <View>
                {this.state.resDataDone.map((val, index) => (
                  <Card style={{ width: "100%", marginTop: 10 }} key={index}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "column", margin: 10 }}>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                              ID Booking
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 10,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "bold",
                                marginLeft: 5,
                              }}
                            >
                              {val.idBooking}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 15 }}>Name</Text>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: 44,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 15,
                                marginLeft: 5,
                              }}
                            >
                              {val.name}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Total Payment</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 19,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              Rp. {val.pay}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Alamat</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 52,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.alamat}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Rent Date</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 41,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.rentDate} ( {val.rentDay} Day )
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>Status</Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 56,
                              }}
                            >
                              :
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                marginLeft: 5,
                              }}
                            >
                              {val.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                ))}
              </View>
            )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  list: {
    margin: 20,
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  label: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  label2: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginTop: 20,
  },
  icon: {
    marginRight: 3,
    width: 20,
    height: 20,
    borderRadius: 150,
    tintColor: "white",
  },
});
