import { View } from "react-native";

import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export function Loading({ length }: { length?: number }) {
  return (
    <View style={[{ paddingTop: 40 }]}>
      {Array.from({ length: length || 10 }).map((_, index) => (
        <SkeletonPlaceholder key={index}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            marginBottom={20}
          >
            <SkeletonPlaceholder.Item width={60} height={40} />
            <SkeletonPlaceholder.Item marginLeft={20} width={200}>
              <SkeletonPlaceholder.Item height={20} />
              <SkeletonPlaceholder.Item marginTop={6} width={80} height={15} />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ))}
    </View>
  );
}
