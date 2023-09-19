import {
  StyleSheet,
  Text,
  View,
  Alert,
  Pressable,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { products } from "../data/products.js";

const HomeScreen = () => {
  // vamos à store buscar a store cart e depois vamos buscar o initial value ao reducer
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((current, prev) => current + prev, 0);

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

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = () => {
      products.map((product) => dispatch(getProducts(product)));
    };

    fetchProducts();
  }, []);

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F0F0F0" }}>
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
        <Carousel />
        <Services />

        {/* Products */}
        {product.map((product, index) => (
          <View key={index} style={{ margin: 10 }}>
            <DressItem product={product} />
          </View>
        ))}
      </ScrollView>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 20, fontWeight: "500", color: "white" }}>
              {cart.length} items | Total: {total}€
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable>
            <Text style={{fontSize:17, fontWeight:"600", color: "white"}}>Proceed to pickup</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default HomeScreen;
