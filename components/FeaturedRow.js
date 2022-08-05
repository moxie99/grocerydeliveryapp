import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import * as Icons from "react-native-heroicons/solid";
import GroceryCard from "./GroceryCard";
import client from "../sanity";
const FeaturedRow = ({ title, description, id }) => {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured" && _id == $id]{
                ...,
                stores[]->{
                    ...,
                    groceries[]->,
                type->{
                    name
                }
            },
        }[0]
            `,
        { id }
      )
      .then((data) => setStores(data?.stores));
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <Icons.ArrowRightIcon color="#135c3a" />
      </View>
      <Text className="text-xs text-gray-200 px-5">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* GrocerieCard */}

        {stores?.map((store) => (
          <GroceryCard
            key={store?._id}
            id={store?._id}
            imgUrl={store.image}
            title={store.name}
            rating={store?.rating}
            genre={store?.type?.name}
            address={store?.address}
            quantities={store?.quantity}
            long={store?.long}
            lat={store?.lat}
            short_desc={store?.shortDescription}
            groceries={store?.groceries}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
