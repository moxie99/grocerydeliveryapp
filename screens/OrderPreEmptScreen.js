import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const OrderPreEmptScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView
      className="flex-1 justify-center items-center"
      style={{ backgroundColor: "#83f28f" }}
    >
      <Animatable.Image
        source={require("../assets/use.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-96"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-white font-bold text-center"
      >
        Waiting for Store to accept your order
      </Animatable.Text>
      <Progress.Circle size={70} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default OrderPreEmptScreen;
