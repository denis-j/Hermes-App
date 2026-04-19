import { useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/contexts/AuthContext';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import { StatCard } from '@/features/home/components/StatCard';
import { ProfileHeader } from '../components/ProfileHeader';
import { SettingsRow } from '../components/SettingsRow';
import { ChallengeHistoryRow } from '../components/ChallengeHistoryRow';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data - structure ready for Firestore swap
const MOCK_STATS = {
  totalChallenges: 12,
  challengesWon: 5,
  totalSteps: 384750,
  longestStreak: 14,
};

const MOCK_HISTORY = [
  { id: '1', name: 'März Lauf-Challenge', date: '31.03.2026', result: 'won' as const, rank: 1 },
  { id: '2', name: 'Frühjahrs-Sprint', date: '15.03.2026', result: 'participated' as const, rank: 8 },
  { id: '3', name: 'Winter-Warmup', date: '28.02.2026', result: 'won' as const, rank: 3 },
  { id: '4', name: 'Neujahrs-Challenge', date: '15.01.2026', result: 'lost' as const, rank: 12 },
];

const APP_VERSION = '1.0.0 (3)';

export function ProfileScreen() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const [healthConnected, setHealthConnected] = useState(false);
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [darkModeOn, setDarkModeOn] = useState(false);

  const displayName = user?.displayName ?? user?.email?.split('@')[0] ?? 'Läufer';
  const email = user?.email ?? null;

  const handleEditProfile = () => {
    // Placeholder for edit profile modal/screen
  };

  const handleSignOut = async () => {
    await signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const renderSectionHeader = (title: string) => (
    <Text variant="h4" className="mb-3 text-card-foreground">
      {title}
    </Text>
  );

  const stats = [
    { label: 'Herausforderungen', value: MOCK_STATS.totalChallenges, icon: '🏆' },
    { label: 'Gewonnen', value: MOCK_STATS.challengesWon, icon: '🥇' },
    { label: 'Schritte', value: MOCK_STATS.totalSteps, icon: '👟' },
    { label: 'Beste Serie', value: `${MOCK_STATS.longestStreak} Tage`, icon: '🔥' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <View className="px-6 pt-4">
            {/* Profile Header */}
            <ProfileHeader
              displayName={displayName}
              email={email}
              onEditProfile={handleEditProfile}
            />

            {/* My Stats */}
            <View className="mt-6">
              {renderSectionHeader('Statistiken')}
              <View className="flex-row flex-wrap gap-3">
                {stats.map((stat, index) => (
                  <View key={index} className="w-[calc(50%-6px)]">
                    <StatCard label={stat.label} value={stat.value} icon={stat.icon} />
                  </View>
                ))}
              </View>
            </View>

            {/* Settings */}
            <View className="mt-8">
              {renderSectionHeader('Einstellungen')}
              <Card>
                <CardContent className="px-4">
                  <SettingsRow
                    label="Health App Verbindung"
                    value={healthConnected ? 'Verbunden' : 'Nicht verbunden'}
                    onPress={() => setHealthConnected(!healthConnected)}
                  />
                  <SettingsRow
                    label="Benachrichtigungen"
                    isToggle
                    isActive={notificationsOn}
                    onPress={() => setNotificationsOn(!notificationsOn)}
                    showChevron={false}
                  />
                  <SettingsRow
                    label="Dunkelmodus"
                    isToggle
                    isActive={darkModeOn}
                    onPress={() => setDarkModeOn(!darkModeOn)}
                    showChevron={false}
                  />
                  <SettingsRow
                    label="Über"
                    value={`Version ${APP_VERSION}`}
                    showChevron={false}
                  />
                </CardContent>
              </Card>
            </View>

            {/* Challenge History */}
            <View className="mt-8">
              {renderSectionHeader('Herausforderungsverlauf')}
              <Card>
                <CardContent className="px-4">
                  {MOCK_HISTORY.length > 0 ? (
                    MOCK_HISTORY.map((challenge) => (
                      <ChallengeHistoryRow
                        key={challenge.id}
                        name={challenge.name}
                        date={challenge.date}
                        result={challenge.result}
                        rank={challenge.rank}
                      />
                    ))
                  ) : (
                    <View className="items-center py-8">
                      <Text className="text-muted-foreground">
                        Noch keine Herausforderungen abgeschlossen
                      </Text>
                    </View>
                  )}
                </CardContent>
              </Card>
            </View>

            {/* Sign Out */}
            <View className="mt-8 mb-8">
              <Button variant="destructive" className="w-full" onPress={handleSignOut}>
                <Text>Abmelden</Text>
              </Button>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
