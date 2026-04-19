import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import type { Participant } from '../data/mockData';

interface ParticipantRowProps {
  participant: Participant;
  goalValue: number;
  goalType: 'steps' | 'distance';
  isCurrentUser?: boolean;
}

export function ParticipantRow({ participant, goalValue, goalType, isCurrentUser }: ParticipantRowProps) {
  const progress = goalType === 'steps' 
    ? Math.min(1, participant.steps / goalValue)
    : Math.min(1, participant.steps / goalValue);
  const progressPercent = Math.round(progress * 100);

  return (
    <View className={`flex-row items-center justify-between py-3 ${isCurrentUser ? 'bg-primary/5 rounded-lg px-2' : ''}`}>
      <View className="flex-row items-center gap-3">
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
              <View className="rounded-full bg-primary/10 px-2 py-0.5">
                <Text className="text-xs text-primary">Du</Text>
              </View>
            )}
          </View>
          <Text className="text-xs text-muted-foreground">
            {participant.steps.toLocaleString()} {goalType === 'steps' ? 'Schritte' : 'km'}
          </Text>
        </View>
      </View>
      <View className="items-end gap-1">
        <Text className={`text-sm font-semibold ${isCurrentUser ? 'text-primary' : 'text-foreground'}`}>
          {progressPercent}%
        </Text>
        <View className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
          <View
            className={`h-full rounded-full ${isCurrentUser ? 'bg-primary' : 'bg-muted-foreground'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </View>
      </View>
    </View>
  );
}
