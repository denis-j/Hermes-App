import { useState, useCallback } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { ChallengeCard } from '../components/ChallengeCard';
import { StatCard } from '../components/StatCard';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MOCK_CHALLENGES = [
  {
    id: '1',
    name: 'April Run Challenge',
    participantCount: 48,
    daysRemaining: 11,
    progress: 0.68,
    leaderName: 'Sarah M.',
    leaderSteps: 89500,
    userSteps: 60860,
  },
  {
    id: '2',
    name: 'Weekend Warriors',
    participantCount: 32,
    daysRemaining: 3,
    progress: 0.42,
    leaderName: 'Mike T.',
    leaderSteps: 45200,
    userSteps: 18984,
  },
  {
    id: '3',
    name: 'Spring Sprint',
    participantCount: 76,
    daysRemaining: 21,
    progress: 0.25,
    leaderName: 'Emma L.',
    leaderSteps: 124000,
    userSteps: 31000,
  },
];

const WEEKLY_STATS = [
  { label: 'Steps', value: 54280, icon: '👟', trend: '+12% vs last week' },
  { label: 'Distance', value: '38.4 km', icon: '📍', trend: '+5% vs last week' },
  { label: 'Active Days', value: 5, icon: '🔥', trend: '2 days to go' },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Guten Morgen';
  if (hour >= 12 && hour < 18) return 'Guten Mittag';
  return 'Guten Abend';
}

export function HomeScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Runner';

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View className="px-6 pt-8">
            <View className="flex-row items-start justify-between">
              <View className="gap-1">
                <Text className="text-sm text-muted-foreground">
                  {getGreeting()},
                </Text>
                <Text variant="h2" className="text-foreground">
                  {displayName} 👋
                </Text>
              </View>
              <Pressable onPress={signOut} className="rounded-full p-2">
                <Text className="text-2xl">⚙️</Text>
              </Pressable>
            </View>

            <Text className="mt-2 text-sm text-muted-foreground">
              Ready for today's run?
            </Text>

            {/* Quick Actions */}
            <View className="mt-6 flex-row gap-3">
              <Button
                className="flex-1"
                onPress={() => navigation.navigate('Login')}
              >
                <Text>Join Challenge</Text>
              </Button>
              <Button
                variant="secondary"
                className="flex-1"
                onPress={() => {}}
              >
                <Text>Start Run</Text>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onPress={() => {}}
              >
                <Text>Leaderboard</Text>
              </Button>
            </View>

            {/* Weekly Stats */}
            <View className="mt-8">
              <Text variant="h4" className="mb-3 text-card-foreground">
                This Week
              </Text>
              <View className="flex-row gap-3">
                {WEEKLY_STATS.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </View>
            </View>

            {/* Active Challenges */}
            <View className="mt-8">
              <View className="mb-3 flex-row items-center justify-between">
                <Text variant="h4" className="text-card-foreground">
                  Active Challenges
                </Text>
                <Button variant="link" onPress={() => {}}>
                  <Text className="text-sm text-primary">See all</Text>
                </Button>
              </View>
              <FlatList
                data={MOCK_CHALLENGES}
                renderItem={({ item }) => <ChallengeCard challenge={item} />}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="gap-3"
              />
            </View>

            {/* Recent Activity Card */}
            <Card className="mt-8 gap-4 p-5">
              <View>
                <Text variant="h4" className="text-card-foreground">
                  Recent Activity
                </Text>
                <Text className="mt-1 text-sm text-muted-foreground">
                  Your latest run summaries appear here
                </Text>
              </View>
              <View className="items-center py-4">
                <Text className="text-4xl">🏃</Text>
                <Text className="mt-2 text-sm text-muted-foreground">
                  No runs recorded yet today
                </Text>
                <Button className="mt-3" size="sm" onPress={() => {}}>
                  <Text>Start your first run</Text>
                </Button>
              </View>
            </Card>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4F46E5"
          />
        }
      />
    </SafeAreaView>
  );
}

import { RefreshControl } from 'react-native';
