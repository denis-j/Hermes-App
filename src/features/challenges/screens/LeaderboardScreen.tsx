import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { LeaderboardItem } from '../components/LeaderboardItem';
import { MOCK_CHALLENGES, MOCK_CURRENT_USER_ID } from '../data/mockData';
import type { Participant } from '../data/mockData';

interface LeaderboardScreenProps {
  challengeId?: string;
}

export function LeaderboardScreen({ challengeId = 'challenge-1' }: LeaderboardScreenProps) {
  const challenge = MOCK_CHALLENGES.find(c => c.id === challengeId) ?? MOCK_CHALLENGES[0];
  const sortedParticipants = [...challenge.participants].sort((a, b) => a.rank - b.rank);

  const renderHeader = () => (
    <View className="gap-4 pb-4">
      <View className="gap-2">
        <Text variant="h2" className="text-foreground">
          Rangliste
        </Text>
        <Text className="text-muted-foreground">
          {challenge.name}
        </Text>
      </View>

      {/* Top 3 Podium */}
      {sortedParticipants.length >= 3 && (
        <Card className="gap-4 p-5">
          <Text variant="h4" className="text-card-foreground">Top 3</Text>
          <View className="flex-row items-end justify-center gap-4">
            {/* 2nd place */}
            <View className="items-center gap-2">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Text className="text-2xl font-bold text-secondary-foreground">
                  {sortedParticipants[1].name.charAt(0)}
                </Text>
              </View>
              <Text className="text-xl">🥈</Text>
              <Text className="text-sm font-medium text-foreground">{sortedParticipants[1].name}</Text>
              <Text className="text-xs text-muted-foreground">
                {sortedParticipants[1].steps.toLocaleString()}
              </Text>
            </View>

            {/* 1st place */}
            <View className="items-center gap-2">
              <View className="h-20 w-20 items-center justify-center rounded-full bg-primary">
                <Text className="text-3xl font-bold text-primary-foreground">
                  {sortedParticipants[0].name.charAt(0)}
                </Text>
              </View>
              <Text className="text-2xl">🥇</Text>
              <Text className="text-sm font-bold text-foreground">{sortedParticipants[0].name}</Text>
              <Text className="text-xs text-muted-foreground">
                {sortedParticipants[0].steps.toLocaleString()}
              </Text>
            </View>

            {/* 3rd place */}
            <View className="items-center gap-2">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Text className="text-2xl font-bold text-secondary-foreground">
                  {sortedParticipants[2].name.charAt(0)}
                </Text>
              </View>
              <Text className="text-xl">🥉</Text>
              <Text className="text-sm font-medium text-foreground">{sortedParticipants[2].name}</Text>
              <Text className="text-xs text-muted-foreground">
                {sortedParticipants[2].steps.toLocaleString()}
              </Text>
            </View>
          </View>
        </Card>
      )}

      {/* Full ranking header */}
      <Text variant="h4" className="text-foreground">
        Alle Teilnehmer ({sortedParticipants.length})
      </Text>
    </View>
  );

  const renderItem = ({ item, index }: { item: Participant; index: number }) => (
    <LeaderboardItem
      participant={item}
      position={index + 1}
      isCurrentUser={item.id === MOCK_CURRENT_USER_ID}
    />
  );

  const renderEmpty = () => (
    <Card className="items-center gap-4 p-8">
      <Text className="text-4xl">📊</Text>
      <View className="gap-2 text-center">
        <Text variant="h4" className="text-card-foreground">
          Keine Teilnehmer
        </Text>
        <Text className="text-sm text-muted-foreground">
          Diese Herausforderung hat noch keine Teilnehmer.
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={sortedParticipants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-3 px-6 py-4"
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-1" />}
      />
    </SafeAreaView>
  );
}
