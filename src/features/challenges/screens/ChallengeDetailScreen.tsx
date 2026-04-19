import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { ParticipantRow } from '../components/ParticipantRow';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { MOCK_CHALLENGES, MOCK_CURRENT_USER_ID, getDaysRemaining } from '../data/mockData';
import type { RootStackParamList } from '@/navigation/RootNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface ChallengeDetailScreenProps {
  challengeId?: string;
}

export function ChallengeDetailScreen({ challengeId = 'challenge-1' }: ChallengeDetailScreenProps) {
  const navigation = useNavigation<NavigationProp>();
  const challenge = MOCK_CHALLENGES.find(c => c.id === challengeId) ?? MOCK_CHALLENGES[0];
  const daysLeft = getDaysRemaining(challenge.endDate);
  const currentUser = challenge.participants.find(p => p.id === MOCK_CURRENT_USER_ID);
  const userProgress = currentUser ? (currentUser.steps / challenge.goalValue) * 100 : 0;

  const sortedParticipants = [...challenge.participants].sort((a, b) => a.rank - b.rank);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-6 px-6 py-4">
          {/* Header Card */}
          <Card className="gap-4 p-5">
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Text variant="h2" className="text-card-foreground">
                  {challenge.name}
                </Text>
                {challenge.isCompleted && (
                  <View className="rounded-full bg-muted px-3 py-1">
                    <Text className="text-xs text-muted-foreground">Abgeschlossen</Text>
                  </View>
                )}
              </View>
              <Text className="text-muted-foreground">{challenge.description}</Text>
            </View>

            <View className="flex-row gap-4">
              <View className="flex-1 rounded-lg bg-secondary/50 p-3">
                <Text className="text-xs text-muted-foreground">Start</Text>
                <Text className="text-sm font-medium text-foreground">{formatDate(challenge.startDate)}</Text>
              </View>
              <View className="flex-1 rounded-lg bg-secondary/50 p-3">
                <Text className="text-xs text-muted-foreground">Ende</Text>
                <Text className="text-sm font-medium text-foreground">{formatDate(challenge.endDate)}</Text>
              </View>
              <View className="flex-1 rounded-lg bg-secondary/50 p-3">
                <Text className="text-xs text-muted-foreground">Tage übrig</Text>
                <Text className="text-sm font-semibold text-primary">{daysLeft}</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="text-sm text-muted-foreground">
                Ziel: {challenge.goalType === 'steps' 
                  ? `${challenge.goalValue.toLocaleString()} Schritte` 
                  : `${challenge.goalValue} km`}
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-sm text-muted-foreground">👥</Text>
                <Text className="text-sm text-muted-foreground">
                  {challenge.participants.length}/{challenge.maxParticipants} Teilnehmer
                </Text>
              </View>
            </View>
          </Card>

          {/* User Progress */}
          {challenge.isJoined && currentUser && (
            <Card className="gap-4 p-5">
              <Text variant="h4" className="text-card-foreground">Dein Fortschritt</Text>
              <View className="gap-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-muted-foreground">
                    {currentUser.steps.toLocaleString()} / {challenge.goalValue.toLocaleString()}
                  </Text>
                  <Text className="text-sm font-semibold text-primary">
                    {Math.round(userProgress)}%
                  </Text>
                </View>
                <View className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                  <View
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.min(100, userProgress)}%` }}
                  />
                </View>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-xs text-muted-foreground">Rang: #{currentUser.rank}</Text>
                <Text className="text-xs text-muted-foreground">
                  Noch {Math.max(0, challenge.goalValue - currentUser.steps).toLocaleString()} zum Ziel
                </Text>
              </View>
            </Card>
          )}

          {/* Teilnehmer */}
          <View className="gap-3">
            <Text variant="h4" className="text-foreground">
              Teilnehmer ({challenge.participants.length})
            </Text>
            <Card className="p-4">
              {challenge.participants.slice(0, 5).map((participant) => (
                <ParticipantRow
                  key={participant.id}
                  participant={participant}
                  goalValue={challenge.goalValue}
                  goalType={challenge.goalType}
                  isCurrentUser={participant.id === MOCK_CURRENT_USER_ID}
                />
              ))}
              {challenge.participants.length > 5 && (
                <Button variant="link" className="mt-2">
                  <Text className="text-sm text-primary">
                    + {challenge.participants.length - 5} weitere
                  </Text>
                </Button>
              )}
            </Card>
          </View>

          {/* Rangliste */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between">
              <Text variant="h4" className="text-foreground">Rangliste</Text>
              <Button variant="link" onPress={() => {}}>
                <Text className="text-sm text-primary">Alle anzeigen</Text>
              </Button>
            </View>
            <Card className="p-4">
              {sortedParticipants.slice(0, 5).map((participant) => (
                <LeaderboardItem
                  key={participant.id}
                  participant={participant}
                  position={participant.rank}
                  isCurrentUser={participant.id === MOCK_CURRENT_USER_ID}
                />
              ))}
            </Card>
          </View>

          {/* Action Button */}
          <View className="pb-6">
            {challenge.isJoined ? (
              <Button variant="destructive" className="w-full">
                <Text>Verlassen</Text>
              </Button>
            ) : (
              <Button className="w-full">
                <Text>Beitreten</Text>
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
