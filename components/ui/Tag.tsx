import { Text, View } from 'react-native';

type TagProps = {
  label: string;
};

export function Tag({ label }: TagProps) {
  return (
    <View className="rounded-full bg-secondary px-3 py-2">
      <Text className="text-xs font-medium tracking-wide text-secondary-foreground">
        {label}
      </Text>
    </View>
  );
}
