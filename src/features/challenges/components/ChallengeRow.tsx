import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import type { Challenge } from '../data/mockData';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { getDaysRemaining } from '../data/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ChallengeRowProps {
  challenge: Challenge;
  userRank?: number | null;
}

export function ChallengeRow({ challenge, userRank }: ChallengeRowProps) {
  const navigation = useNavigation<NavigationProp>();
  const daysLeft = getDaysRemaining(challenge.endDate);
  const isActive = !challenge.isCompleted;
  const isJoined = challenge.isJoined;

  return (
    <Pressable
      onPress={() => navigation.navigate('ChallengeDetail', { challengeId: challenge.id })}
      className="active:opacity-80"
    >
      <Card className="gap-3 p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 gap-1">
            <View className="flex-row items-center gap-2">
              <Text variant="h4" className="text-card-foreground">
                {challenge.name}
              </Text>
              {!isActive && (
                <View className="rounded-full bg-muted px-2 py-0.5">
                  <Text className="text-xs text-muted-foreground">Abgeschlossen</Text>
                </View>
              )}
            </View>
            <Text className="text-sm text-muted-foreground">
              {challenge.description}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row gap-4">
            <View className="flex-row items-center gap-1">
              <Text className="text-sm text-muted-foreground">👥</Text>
              <Text className="text-sm text-muted-foreground">
                {challenge.participants.length}/{challenge.maxParticipants}
              </Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-sm text-muted-foreground">📅</Text>
              <Text className="text-sm text-muted-foreground">
                {isActive ? `${daysLeft} Tage übrig` : 'Beendet'}
              </Text>
            </View>
            {isJoined && userRank && (
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-muted-foreground">🏆</Text>
                <Text className="text-sm font-medium text-foreground">
                  Rang {userRank}
                </Text>
              </View>
            )}
          </View>
          <View className="flex-row gap-2">
            {isJoined ? (
              <View className="rounded-full bg-primary/10 px-3 py-1">
                <Text className="text-xs font-medium text-primary">Beigetreten</Text>
              </View>
            ) : (
              <View className="rounded-full bg-secondary px-3 py-1">
                <Text className="text-xs text-secondary-foreground">Offen</Text>
              </View>
            )}
          </View>
        </View>

        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-muted-foreground">
            Ziel: {challenge.goalType === 'steps' 
              ? `${challenge.goalValue.toLocaleString()} Schritte` 
              : `${challenge.goalValue} km`}
          </Text>
        </View>
      </Card>
    </Pressable>
  );
}
