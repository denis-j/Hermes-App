import { Text, View } from 'react-native';

type SectionCardProps = {
  title: string;
  body: string;
};

export function SectionCard({ title, body }: SectionCardProps) {
  return (
    <View className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <Text className="text-base font-semibold text-card-foreground">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-muted-foreground">{body}</Text>
    </View>
  );
}
