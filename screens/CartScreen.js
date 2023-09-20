import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();
  return (
    <ScrollView>
      {total === 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text>Cart is empty</Text>
        </View>
      ) : (
        <>
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 60,
            }}
          >
            <Ionicons
              onPress={() => navigation.goBack()}
              name="arrow-back"
              size={24}
              color="black"
            />
            <Text>Your Bucket</Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginLeft: 10,
              marginRight: 10,
              padding: 14,
            }}
          >
            {cart.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 12,
                }}
              >
                <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                  {item.name}
                </Text>

                {/* - + button*/}
                <Pressable
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    backgroundColor: "white",
                    borderRadius: 12,
                    alignItems: "center",
                    borderWidth: 0.5,
                    borderColor: "#BEBEBE",
                  }}
                >
                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      -
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 19,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      {item.quantity}
                    </Text>
                  </Pressable>

                  <Pressable>
                    <Text
                      style={{
                        fontSize: 20,
                        color: "#088F8F",
                        paddingHorizontal: 6,
                        fontWeight: "600",
                      }}
                    >
                      +
                    </Text>
                  </Pressable>
                </Pressable>

                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {item.price * item.quantity}
                </Text>
              </View>
            ))}
          </Pressable>
        </>
      )}
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
