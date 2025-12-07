import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Country } from "@/src/api/country/country.schema";

type CountryItemProps = {
  item: Country;
  onPress: () => void;
};

function _CountryItem({ item, onPress }: CountryItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
      }}
    >
      <Image
        source={{ uri: item.flags.png }}
        style={{ height: 40, width: 60 }}
      />
      <View>
        <Text>{item.name.common}</Text>
        <Text>{item.cca3}</Text>
      </View>
    </Pressable>
  );
}

const CountryItem = React.memo(_CountryItem, (prevProps, nextProps) => {
  return (
    prevProps.item.cca3 === nextProps.item.cca3 &&
    prevProps.onPress === nextProps.onPress
  );
});

export { CountryItem };
