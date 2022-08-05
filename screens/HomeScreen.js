import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/solid";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanity";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuresCategories, setFeaturesCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "featured"]{
        ...,
        stores[]->{
            ...,
            groceries[]->
        }
    }
    `
      )
      .then((data) => setFeaturesCategories(data));
  }, []);

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* header */}
      <View className="flex-row pb-4 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://media.istockphoto.com/photos/shopping-basket-full-of-variety-of-grocery-products-food-and-drink-on-picture-id1319625327?b=1&k=20&m=1319625327&s=170667a&w=0&h=FRRQT4yPOTumTJkCOmthHBcRvzoGvqw7drlSlYZhUNo=",
          }}
          className="w-8 h-8 bg-gray-700 p-4 rounded-full"
        />

        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
          <Text className="font-bold text-xl text-blue-400">
            Current Location
            <Icons.ChevronDownIcon size={20} color="#90ee90" />
          </Text>
        </View>

        <View>
          <Icons.UserIcon size={30} color="#90ee90" />
        </View>
      </View>

      {/* search bar */}
      <View className="flex-row items-center space-x-3 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-300 p-3">
          <Icons.SearchIcon size={25} color="white" />
          <TextInput placeholder="All Groceries" keyboardType="default" />
        </View>
        <Icons.AdjustmentsIcon size={25} color="#90ee90" />
      </View>

      {/* body  */}

      <ScrollView
        className="bg-gray-200"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Categories />

        {featuresCategories?.map((category) => (
          <FeaturedRow
            key={category?._id}
            id={category?._id}
            title={category?.name}
            description={category?.shortDescription}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
