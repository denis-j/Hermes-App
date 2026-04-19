import { Text, View } from 'react-native';

type SectionCardProps = {
  title: string;
  body: string;
};

export function SectionCard({ title, body }: SectionCardProps) {
  return (
    <View className="rounded-card border border-slate-100 bg-panel px-5 py-5 shadow-card">
      <Text className="text-base font-semibold text-ink">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-600">{body}</Text>
    </View>
  );
}
