import { Text, View } from 'react-native';

type TagProps = {
  label: string;
};

export function Tag({ label }: TagProps) {
  return (
    <View className="rounded-full bg-slate-900/5 px-3 py-2">
      <Text className="text-xs font-medium tracking-wide text-slate-700">
        {label}
      </Text>
    </View>
  );
}
