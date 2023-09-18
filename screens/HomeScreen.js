import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationServicesEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationServicesEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      const createTwoButtonAlert = () =>
        Alert.alert(
          "Location services not enabled",
          "Please enable the location services",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]
        );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      const response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
        break;
      }
    }
  };

  return (
    <SafeAreaView style={{backgroundColor:"#F0F0F0"}}>
      {/* Location and Profile */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 30,
          padding: 10,
        }}
      >
        <Ionicons name="location-sharp" size={32} color="red" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://lh3.googleusercontent.com/ogw/AGvuzYYT1qoMXKvmh3cP307cbAEEOY1mJJD7t2me61kLvw=s32-c-mo",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#C0C0C0",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for items or More.." />
        <FontAwesome name="search" size={24} color="red" />
      </View>

      {/* Image Carousel */}
      <Carousel/>

      <Services/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
