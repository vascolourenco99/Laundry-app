import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity, incrementQuantity } from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const DressItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const addItemToCart = () => {
    dispatch(addToCart(product));
    dispatch(incrementQty(product));
  };
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

        <Text style={{ color: "gray", fontSize: 15 }}>{product.price}€</Text>
      </View>

      {cart.some((c) => c.id === product.id) ? (
        <Pressable
          style={{
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}
        >
          <Pressable
            onPress={() => {
              dispatch(decrementQuantity(product));
              dispatch(decrementQty(product));
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8f",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              -
            </Text>
          </Pressable>

          <Pressable>
            <Text
              style={{
                fontSize: 20,
                color: "#088F8f",
                paddingHorizontal: 8,
                fontWeight: "600",
              }}
            >
              {product.quantity}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              dispatch(incrementQuantity(product));
              dispatch(incrementQty(product));
            }}
            style={{
              width: 26,
              height: 26,
              borderRadius: 13,
              borderColor: "#BEBEBE",
              backgroundColor: "center",
              alignContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "#088F8f",
                paddingHorizontal: 6,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              +
            </Text>
          </Pressable>
        </Pressable>
      ) : (
        <Pressable onPress={addItemToCart} style={{ width: 80 }}>
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
      )}
    </View>
  );
};

export default DressItem;

const styles = StyleSheet.create({});
