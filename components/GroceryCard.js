import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import * as Icons from "react-native-heroicons/solid";
import * as Iconss from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const GroceryCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  quantities,
  long,
  lat,
  short_desc,
  groceries,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow w-64"
      onPress={() => {
        navigation.navigate("Store", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          quantities,
          long,
          lat,
          short_desc,
          groceries,
        });
      }}
    >
      <Image
        source={{ uri: urlFor(imgUrl).url() }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-2">
          <Icons.StarIcon color="yellow" size={23} opacity={0.56} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-600">{rating} </Text>. {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <Iconss.LocationMarkerIcon color="gray" size={22} opacity={0.35} />
          <Text>Closest . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroceryCard;
