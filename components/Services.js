import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { services } from "../data/services";

const Services = () => {

  return (
    <View style={{padding:10}}>
      <Text style={{fontSize:16, fontWeight:"500", marginBottom:7}}>Services Available</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((service, index) => (
          <Pressable key={index} style={{margin:10, backgroundColor:"white", padding:20, borderRadius:7}}>
            <Image
              source={{ uri: service.image }}
              style={{ width: 70, height: 70 }}
            />

            <Text style={{textAlign:"center", marginTop:12}}>{service.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
