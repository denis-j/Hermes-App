import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { Participant } from '../data/mockData';

interface LeaderboardItemProps {
  participant: Participant;
  position: number;
  isCurrentUser?: boolean;
}

const MEDAL_EMOJIS = ['🥇', '🥈', '🥉'];

export function LeaderboardItem({ participant, position, isCurrentUser }: LeaderboardItemProps) {
  const isTopThree = position <= 3;
  const medal = isTopThree ? MEDAL_EMOJIS[position - 1] : null;

  return (
    <View className={`flex-row items-center justify-between py-3 ${isCurrentUser ? 'bg-primary/10 rounded-lg px-3' : 'border-b border-border/50'}`}>
      <View className="flex-row items-center gap-3">
        <View className="w-8 items-center">
          {medal ? (
            <Text className="text-xl">{medal}</Text>
          ) : (
            <Text className="text-sm font-medium text-muted-foreground">
              #{position}
            </Text>
          )}
        </View>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Text className="text-lg font-medium text-secondary-foreground">
            {participant.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View className="gap-1">
          <View className="flex-row items-center gap-2">
            <Text className={`text-sm font-medium ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
              {participant.name}
            </Text>
            {isCurrentUser && (
              <View className="rounded-full bg-primary px-2 py-0.5">
                <Text className="text-xs font-medium text-primary-foreground">Du</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View className="items-end">
        <Text className={`text-base font-bold ${isCurrentUser ? 'text-primary' : isTopThree ? 'text-amber-500' : 'text-foreground'}`}>
          {participant.steps.toLocaleString()}
        </Text>
        <Text className="text-xs text-muted-foreground">Schritte</Text>
      </View>
    </View>
  );
}
