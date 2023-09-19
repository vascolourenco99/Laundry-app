import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";

const DressItem = ({ product }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 12,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 7,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{ uri: product.image }}
        style={{ width: 80, height: 80 }}
      />

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 17, fontWeight: "500", marginBottom: 7 }}>
          {product.name}
        </Text>

        <Text style={{color:"gray", fontSize:15}}>{product.price}€</Text>
      </View>

      <Pressable style={{ width: 80 }}>
        <Text
          style={{
            borderColor: "gray",
            borderRadius: 5,
            borderWidth: 1,
            color: "#088F8f",
            textAlign: "center",
            padding: 5,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Add
        </Text>
      </Pressable>
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
