import React, { Component } from "react";
import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { db } from "../config/config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export default class Loc extends Component {
  state = {
    date: this.props.route.params.date,
    name_product: this.props.route.params.name_product,
    price: this.props.route.params.price,
    idBooking: this.props.route.params.idBooking,
    username: this.props.route.params.username,
    receiver: this.props.route.params.receiver,
    dayRent: this.props.route.params.dayRent,
    alamat: "",
    status: "Process",
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    hasilLongitude: 0,
    hasilLatitude: 0,
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!",
      });
    } else {
      this._getLocationAsync();
    }
  }

  _handleMapRegionChange = (mapRegion) => {
    console.log(mapRegion);
    this.setState({ mapRegion });
  };

  // function mengambil lokasi dengan gps
  _getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied",
      });
    } else {
      this.setState({ hasLocationPermissions: true });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
    this.setState({
      hasilLongitude: location.coords.longitude,
      hasilLatitude: location.coords.latitude,
    });

    // Center the map on the location we just fetched.
    this.setState({
      mapRegion: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
    });
  };

  // input data order beserta lokasi
  InsertRecord = () => {
    const waktu = serverTimestamp();
    var id = this.state.idBooking;
    var Username = this.state.username;
    var Nama = this.state.receiver;
    var NamaProduct = this.state.name_product;
    var Price = this.state.price * this.state.dayRent;
    var Sewa = this.state.dayRent;
    var dateSewa = this.state.date;
    var Alamat = this.state.alamat;
    var Lat = this.state.hasilLatitude;
    var Long = this.state.hasilLongitude;
    var Status = this.state.status;
    setDoc(doc(db, "booking", id), {
      idBooking: id,
      username: Username,
      receiver: Nama,
      name: NamaProduct,
      pay: Price,
      rentDay: Sewa,
      rentDate: dateSewa,
      alamat: Alamat,
      latitude: Lat,
      longitude: Long,
      status: Status,
      time_input: waktu,
    })
      .then(() => {
        alert("Booking Success");
        this.props.navigation.navigate("History");
      })
      .catch((error) => {
        alert("Error Occured: " + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.locationResult === null ? (
          <Text style={styles.regular}>Finding your current location...</Text>
        ) : this.state.hasLocationPermissions === false ? (
          <Text style={styles.regular}>
            Location permissions are not granted.
          </Text>
        ) : this.state.mapRegion === null ? (
          <Text style={styles.regular}>Map region doesn't exist.</Text>
        ) : (
          <MapView
            style={{
              flex: 1,
              alignSelf: "stretch",
            }}
            region={this.state.mapRegion}
            onRegionChange={this._handleMapRegionChange}
          >
            <Marker pinColor={"red"} coordinate={this.state.mapRegion} />
          </MapView>
        )}
        <View style={styles.inputStyle}>
          <TextInput
            placeholder="Input Alamat"
            placeholderTextColor="#aaaa"
            style={styles.textInput}
            onChangeText={(alamat) => this.setState({ alamat })}
          />
        </View>

        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Pressable
            style={styles.LoginBtn}
            onPress={() => {
              this.InsertRecord();
            }}
          >
            <Text style={styles.regular}>Simpan lokasi</Text>
          </Pressable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003f5c",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  regular: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
  },
  saveButton: {
    margin: 20,
    backgroundColor: "#fb5b5a",
    color: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    borderRadius: 70,
  },
  historyButton: {
    margin: 10,
    backgroundColor: "#AD8E70",
    color: "white",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    borderRadius: 70,
  },
  inputStyle: {
    width: "80%",
    height: 48,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 20,
    paddingLeft: 16,
    flexDirection: "row",
  },
  textInput: {
    height: 50,
    color: "black",
    fontSize: 14,
    flex: 1,
  },
  LoginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
