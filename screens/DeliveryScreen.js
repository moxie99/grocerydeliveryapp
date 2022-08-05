import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectStore } from "../features/storeSlice";
import * as Progress from "react-native-progress";
import * as Animatable from "react-native-animatable";
import MapView, { Marker } from "react-native-maps";
import { useRef } from "react";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const store = useSelector(selectStore);

  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 0.01);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <View className="flex-1 bg-green-500">
      <SafeAreaView className="z-50">
        <View className="flex-row items-center justify-between p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Icons.XIcon size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-lg font-light text-white">Order Help</Text>
        </View>
        <View className="z-50 p-6 mx-5 my-2 bg-white rounded-md shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-3xl font-bold">45 - 55 Minutes</Text>
            </View>
            <Animatable.Image
              source={require("../assets/de.gif")}
              animation="slideInUp"
              iterationCount={1}
              className="w-20 h-20"
            />
          </View>

          <Progress.Bar
            size={25}
            color="green"
            indeterminate={false}
            progress={count}
          />
          <Text className="mt-4 text-gray-500">
            Your order at {store.title} is being processed
          </Text>
        </View>
      </SafeAreaView>

      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        className="z-0 flex-1 -mt-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={store.title}
          description={store.short_desc}
          identifier="origin"
          pinColor="green"
        />
      </MapView>
      <SafeAreaView className="flex-row items-center h-32 p-5 px-4 space-x-5 bg-white">
        <Animatable.Image
          source={require("../assets/delo.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="w-16 h-16 ml-5 bg-gray-200 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">Jeremy</Text>
          <Text className="text-gray-300">Your Dispatch Rider</Text>
        </View>
        <View>
          <Text classNam="text-gray-300 text-lg mr-5 font-bold">Call</Text>
          <Text className="text-green-700">+2347061938349</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

/**

 // initialRegion={{
        //   latitude: store.lat,
        //   longitude: store.long,
        //   latitudeDelta: 0.005,
        //   longitudeDelta: 0.005,
        // }}
*/

export default DeliveryScreen;
