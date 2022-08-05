import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cartSlice";
import { useNavigation } from "@react-navigation/native";
import Currency from "react-currency-formatter";

const CartIcon = () => {
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigation = useNavigation();

  if (items.length === 0) return null;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Cart");
        }}
        className="bg-green-700 mx-5 p-5 flex-row items-center space-x-1 rounded-md"
      >
        <Text className="text-white font-bold text-lg bg-green-500 py-2 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 font-extrabold text-center text-lg text-white">
          View Cart
        </Text>
        <Text className="text-white font-bold text-lg py-2 px-2">
          <Currency quantity={cartTotal} currency="USD" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;
