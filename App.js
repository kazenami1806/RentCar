import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Front from "./src/screens/splash";
import SignIn from "./src/screens/auth/signin";
import SignUp from "./src/screens/auth/signup";
import Home from "./src/screens/home";
import Profile from "./src/screens/profile";
import History from "./src/screens/history";
import Order from "./src/screens/order";
import EditProfile from "./src/screens/editProfile";
import Loc from "./src/screens/location";
import Office from "./src/screens/officeloc";
import AdminHome from "./src/screens/admin/adminHome";
import ListBooking from "./src/screens/admin/ListBooking";
import EditBooking from "./src/screens/admin/editBooking";
import ProfileAdmin from "./src/screens/admin/profileAdmin";

// create stack and tab
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// tab navigator
const Tombol = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#003f5c",
        tabBarStyle: {
          backgroundColor: "#fb5b5a",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
    </Tab.Navigator>
  );
};

const Admin = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Add Rental") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "ListBooking") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Profile Admin") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#003f5c",
        tabBarStyle: {
          backgroundColor: "#fb5b5a",
        },
      })}
    >
      <Tab.Screen
        name="Add Rental"
        component={AdminHome}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
      <Tab.Screen
        name="ListBooking"
        component={ListBooking}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
      <Tab.Screen
        name="Profile Admin"
        component={ProfileAdmin}
        options={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
      />
    </Tab.Navigator>
  );
};

// stack navigator
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#fb5b5a" },
        }}
        initialRouteName="Front"
      >
        <Stack.Screen
          name="Splash"
          component={Front}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tombol"
          component={Tombol}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Edit Profile" component={EditProfile} />
        <Stack.Screen name="Location" component={Loc} />
        <Stack.Screen name="Office" component={Office} />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Edit Booking" component={EditBooking} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}