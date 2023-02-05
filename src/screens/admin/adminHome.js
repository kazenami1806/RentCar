import React, { Component } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { Select, CheckIcon, NativeBaseProvider } from "native-base";
import { StatusBar } from "expo-status-bar";
import styles from "../../config/style";
import { db } from "../../config/config";
import { setDoc, doc } from "firebase/firestore";

export default class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      merk: "",
      price: "",
      productImage: "",
      type: "",
    };
  }

  InsertRecord = () => {
    var name = this.state.name;
    var merk = this.state.merk;
    var price = this.state.price;
    var productImage = this.state.productImage;
    var type = this.state.type;
    if (
      name.length == 0 ||
      merk.length == 0 ||
      price.length == 0 ||
      productImage.length == 0 ||
      type.length == 0
    ) {
      alert("Required Field Is Missing!!!");
    } else {
      setDoc(doc(db, "rental", name), {
        name: name,
        merk: merk,
        price: price,
        productImage: productImage,
        type: type,
      })
        .then(() => {
          alert("Rental Added");
        })
        .catch((error) => {
          alert("Error Occured: " + error);
        });
    }
  };

  render() {
    return (
      <NativeBaseProvider>
        <View style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter Rental Name.."
              placeholderTextColor="#e6f7ff"
              style={styles.inputText}
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter Rental Merk.."
              placeholderTextColor="#e6f7ff"
              style={styles.inputText}
              onChangeText={(merk) => this.setState({ merk })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter Price.."
              placeholderTextColor="#e6f7ff"
              keyboardType="numeric"
              style={styles.inputText}
              onChangeText={(price) => this.setState({ price })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter Link Product Image.."
              placeholderTextColor="#e6f7ff"
              style={styles.inputText}
              onChangeText={(productImage) => this.setState({ productImage })}
            />
          </View>
          <View style={styles.action}>
            <Select
              style={{ color: "white" }}
              minWidth="285"
              accessibilityLabel="Type"
              placeholder="Choose Type"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              onValueChange={(type) => this.setState({ type })}
            >
              <Select.Item label="Car" value="Mobil" color="white" />
              <Select.Item label="Motorcycle" value="Sepeda Motor" />
            </Select>
          </View>
          {/* Button add rental dengan memanggil function InsertRecord */}
          <Pressable
            style={styles.LoginBtn}
            onPress={() => {
              this.InsertRecord();
            }}
          >
            <Text style={styles.LoginText}>Add Rental</Text>
          </Pressable>
          <StatusBar style="auto" />
        </View>
      </NativeBaseProvider>
    );
  }
}
