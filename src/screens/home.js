import React, { Component } from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { where, query, collection, getDocs } from "firebase/firestore";
import { db } from "../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resData: [],
      username: "",
    };
  }

  // mengambil data motor
  getDataMotor = () => {
    getDocs(
      query(collection(db, "rental"), where("type", "==", "Sepeda Motor"))
    ).then((docSnap) => {
      let product_motor = [];
      docSnap.forEach((doc) => {
        product_motor.push({ ...doc.data(), id: doc.id });
      });
      console.log(product_motor);
      this.setState({
        resData: product_motor,
      });
    });
  };

  // mengambil data mobil
  getDataMobil = () => {
    getDocs(query(collection(db, "rental"), where("type", "==", "Mobil"))).then(
      (docSnap) => {
        let product_mobil = [];
        docSnap.forEach((doc) => {
          product_mobil.push({ ...doc.data(), id: doc.id });
        });
        console.log(product_mobil);
        this.setState({
          resData: product_mobil,
        });
      }
    );
  };

  componentDidMount = async () => {
    const savedUser = await AsyncStorage.getItem("users");
    const currentUser = JSON.parse(savedUser);
    this.setState({
      username: currentUser[0].username,
    });
  };

  render() {
    return (
      <View style={styles.bg}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.welkom}>Welcome, {this.state.username}</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Office");
              }}
            >
              <Image
                style={styles.icon}
                source={require("../../assets/images/building.png")}
                alt="office_loc"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.kategori}>Kategori</Text>
          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => this.getDataMobil()}
            >
              <Image
                style={styles.cat}
                source={require("../../assets/images/car-front.png")}
                alt="car"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  alignItems: "center",
                  color: "white",
                }}
              >
                Mobil
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => this.getDataMotor()}
            >
              <Image
                style={styles.cat}
                source={require("../../assets/images/motorcycle.png")}
                alt="motorcycle"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  alignItems: "center",
                  color: "white",
                }}
              >
                Motor
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <Text style={styles.label}>List Rental</Text>
            {this.state.resData.map((val, index) => (
              <Card style={{ width: "100%", marginTop: 10 }} key={index}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={{ width: 150, height: "80%", alignSelf: "center" }}
                    source={{ uri: val.productImage }}
                    alt="product"
                  />
                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 10,
                      marginTop: 5,
                      marginBottom: 5,
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Name : {val.name}
                    </Text>
                    <Text>Brand : {val.merk}</Text>
                    <Text>Price : {val.price} / Day</Text>
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        justifyContent: "center",
                        width: 60,
                        height: 30,
                        borderRadius: 5,
                        backgroundColor: "#fb5b5a",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                      onPress={() =>
                        this.props.navigation.navigate("Order", {
                          name_product: val.name,
                          price: val.price,
                        })
                      }
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                          alignItems: "center",
                          color: "white",
                        }}
                      >
                        Booking
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
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
  welkom: {
    margin: 20,
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  kategori: {
    alignSelf: "center",
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  tab: {
    alignSelf: "center",
    justifyContent: "center",
    width: 80,
    height: 60,
    borderRadius: 5,
    backgroundColor: "#fb5b5a",
    margin: 10,
  },
  list: {
    margin: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  icon: {
    margin: 20,
    width: 30,
    height: 30,
    borderRadius: 150,
    tintColor: "white",
  },
  cat: {
    alignSelf: "center",
    width: 30,
    height: 30,
    borderRadius: 150,
    tintColor: "white",
  },
});
