import { View, Text, Image, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserIcon, ChevronDownIcon } from "react-native-heroicons/outline";
import { AntDesign, Feather } from "@expo/vector-icons";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from '../sanity';
import "react-native-url-polyfill/auto";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    client.fetch(`
    *[_type == "featured"] {
      ...,
      resturants[]->{
        ...,
        dishes[]->
      }
    }
    `).then((data) => {
      setFeaturedCategories(data);
    })
  }, [])
  

  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header  */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2 ">
        <Image
          source={{
            uri: "https://links.papareact.com/wru",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />

        <View className="flex-1 px-2">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CCBB" />
          </Text>
        </View>

        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* Search  */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 items-center rounded-md bg-gray-200 p-2">
          <AntDesign name="search1" size={20} color="gray" />
          <TextInput
            placeholder="Restaurants and cuisines"
            keyboardType="default"
          />
        </View>

        <Feather name="filter" size={20} color="#00CCBB" />
      </View>

      {/* Content  */}
      <ScrollView
        className="bg-gray-100"
        contentContainerStyle={{
          paddingBottom: 120,
        }}
      >
        {/* Categories  */}

        <Categories />

        {/* Featured Rows  */}

        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
       
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
