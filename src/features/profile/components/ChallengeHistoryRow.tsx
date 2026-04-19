import { View } from 'react-native';
import { Text } from '@/components/ui/text';

interface ChallengeHistoryRowProps {
  name: string;
  date: string;
  result: 'won' | 'lost' | 'participated';
  rank?: number;
}

export function ChallengeHistoryRow({
  name,
  date,
  result,
  rank,
}: ChallengeHistoryRowProps) {
  const resultColors = {
    won: 'text-emerald-500',
    lost: 'text-red-500',
    participated: 'text-muted-foreground',
  };

  const resultLabels = {
    won: 'Gewonnen',
    lost: 'Verloren',
    participated: 'Teilgenommen',
  };

  return (
    <View className="flex-row items-center justify-between py-4 border-b border-border last:border-b-0">
      <View className="flex-1 gap-1">
        <Text className="text-foreground">{name}</Text>
        <Text className="text-sm text-muted-foreground">{date}</Text>
      </View>
      <View className="items-end gap-1">
        <Text className={`text-sm font-medium ${resultColors[result]}`}>
          {resultLabels[result]}
        </Text>
        {rank !== undefined && (
          <Text className="text-xs text-muted-foreground">Rang {rank}</Text>
        )}
      </View>
    </View>
  );
}
