import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import * as Icons from "react-native-heroicons/solid";
import GroceryRow from "../components/GroceryRow";
import CartIcon from "../components/CartIcon";
import { useDispatch } from "react-redux";
import { setStore } from "../features/storeSlice";

const StoreScreen = () => {
  const dispatch = useDispatch();
  const {
    params: {
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
    },
  } = useRoute();
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  useEffect(() => {
    dispatch(
      setStore({
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
      })
    );
  }, [dispatch]);
  return (
    <>
      <CartIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(imgUrl).url() }}
            className="bg-gray-300 p-4 w-full h-56"
          />
          <TouchableOpacity
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icons.ArrowLeftIcon size={20} color="blue" />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row item-center space-x-1">
                <Icons.StarIcon size={22} color="blue" opacity={0.5} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-600">{rating} </Text>. {genre}
                </Text>
              </View>
              <View className="flex-row item-center space-x-1">
                <Icons.LocationMarkerIcon
                  size={22}
                  color="gray"
                  opacity={0.35}
                />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-600">Nearby </Text>. {address}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_desc}</Text>
          </View>
          <TouchableOpacity className="flex-row items-center space-x-2 border-y-2 p-5 border-gray-100">
            <Icons.QuestionMarkCircleIcon
              color="gray"
              size={22}
              opacity={0.5}
            />
            <Text className="flex-1 pl-2 text-md font-bold">
              Have a special item in mind?
            </Text>
            <Icons.ChevronRightIcon size={22} color="gray" opacity={0.45} />
          </TouchableOpacity>
          <View style={{ paddingBottom: 100 }}>
            <Text className="px-4 pt-6 mb-3 font-bold text-xl">Items</Text>

            {groceries.map((grocery) => (
              <GroceryRow
                key={grocery._id}
                id={grocery._id}
                name={grocery.name}
                description={grocery.shortDescription}
                price={grocery.price}
                image={grocery.image}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default StoreScreen;
