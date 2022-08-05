import { View, Text, TouchableOpacity, Image } from "react-native";
import * as React from "react";
import Currency from "react-currency-formatter";
import * as Icons from "react-native-heroicons/solid";

import { urlFor } from "../sanity";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
  selectCartItemsWithId,
} from "../features/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const GroceryRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const dispatch = useDispatch();
  const items = useSelector((state) => selectCartItemsWithId(state, id));
  const addItemToCart = () => {
    dispatch(addToCart({ id, name, description, price, image }));
  };

  const removeItemFromCart = () => {
    if (!items.length > 0) return;
    dispatch(removeFromCart({ id }));
  };

  console.log(items);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsPressed(!isPressed);
        }}
        className={`bg-white p-4 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="USD" />
            </Text>
          </View>

          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "gray" }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-200 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-5">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity
              disabled={items.length === 0}
              onPress={removeItemFromCart}
            >
              <Icons.MinusCircleIcon
                size={35}
                color={items.length > 0 ? "green" : "#a1a1a1"}
              />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToCart}>
              <Icons.PlusCircleIcon size={35} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default GroceryRow;
