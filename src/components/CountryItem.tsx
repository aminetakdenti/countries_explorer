import React from "react";
import { Image, Pressable, Text, View } from "react-native";

import { Country } from "@/src/api/country/country.schema";
import { styles } from "@/src/styles";

type CountryItemProps = {
  item: Country;
  onPress: () => void;
};

function _CountryItem({ item, onPress }: CountryItemProps) {
  const label = `${item.name.common}, country code ${item.cca3}`;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        gap: 10,
      }}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Tap to view country details"
    >
      <Image
        source={{ uri: item.flags.png }}
        style={{ height: 40, width: 60 }}
        accessibilityLabel={`Flag of ${item.name.common}`}
      />
      <View>
        <Text
          style={[styles.fontBold, { fontWeight: "700" }]}
          accessibilityLabel={`Country name: ${item.name.common}`}
        >
          {item.name.common}
        </Text>

        <Text
          style={[styles.font]}
          accessibilityLabel={`Country code: ${item.cca3}`}
        >
          {item.cca3}
        </Text>
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
