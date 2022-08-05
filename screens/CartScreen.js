import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectStore } from "../features/storeSlice";
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from "../features/cartSlice";
import * as Icons from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
const CartScreen = () => {
  const navigation = useNavigation();
  const store = useSelector(selectStore);
  const items = useSelector(selectCartItems);
  const [groupedItemsInCart, setGroupedItemsInCart] = useState([]);
  const dispatch = useDispatch();
  const cartTotal = useSelector(selectCartTotal);
  const deliveryFee = cartTotal * 0.2;

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInCart(groupedItems);
  }, [items]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#a1a1a1] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Cart</Text>
            <Text className="text-gray-400 text-center">{store.title}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            className="rounded-full bg-gray-200 absolute top-3 right-5"
          >
            <Icons.XCircleIcon size={25} color="green" />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/383/383980.png",
            }}
            className="h-8 w-8 bg-gray-300 p-4 rounded-full "
          />
          <Text className="flex-1">Delivers in 50 - 75 minutes</Text>
          <TouchableOpacity>
            <Text className="text-green-700">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-light-800 ">
          {Object.entries(groupedItemsInCart).map(([key, items]) => (
            <View
              key={key}
              className="space-x-3 py-2 px-5 flex-row items-center bg-white"
            >
              <Text className="text-green-600 text-lg">{items.length}x</Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-16 w-16 rounded-full"
              />
              <Text className="flex-1">{items[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0]?.price} currency="USD" />
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeFromCart({ id: key }));
                }}
              >
                <Text className="font-bold text-red-900 text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-4 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={cartTotal} currency="USD" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={deliveryFee} currency="USD" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="text-black font-extrabold">
              <Currency quantity={cartTotal + deliveryFee} currency="USD" />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("OrderPrep")}
            className="rounded-lg bg-green-600 p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
