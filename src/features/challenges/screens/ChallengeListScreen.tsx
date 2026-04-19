import { useState, useMemo } from 'react';
import { FlatList, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { ChallengeRow } from '../components/ChallengeRow';
import { MOCK_CHALLENGES, MOCK_CURRENT_USER_ID, getUserRank } from '../data/mockData';
import type { RootStackParamList } from '@/navigation/RootNavigator';
import type { Challenge } from '../data/mockData';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type TabType = 'active' | 'completed' | 'my';

const TABS: { key: TabType; label: string }[] = [
  { key: 'active', label: 'Aktiv' },
  { key: 'completed', label: 'Abgeschlossen' },
  { key: 'my', label: 'Meine' },
];

export function ChallengeListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [activeTab, setActiveTab] = useState<TabType>('active');

  const filteredChallenges = useMemo(() => {
    return MOCK_CHALLENGES.filter((challenge) => {
      if (activeTab === 'active') {
        return !challenge.isCompleted;
      }
      if (activeTab === 'completed') {
        return challenge.isCompleted;
      }
      if (activeTab === 'my') {
        return challenge.isJoined;
      }
      return true;
    });
  }, [activeTab]);

  const renderChallenge = ({ item }: { item: Challenge }) => {
    const userRank = getUserRank(item, MOCK_CURRENT_USER_ID);
    return <ChallengeRow challenge={item} userRank={userRank} />;
  };

  const renderHeader = () => (
    <View className="gap-6 pb-4">
      {/* Header */}
      <View className="gap-2">
        <Text variant="h2" className="text-foreground">
          Herausforderungen
        </Text>
        <Text className="text-muted-foreground">
          Tritt an und werde fit!
        </Text>
      </View>

      {/* Tabs */}
      <View className="flex-row gap-2">
        {TABS.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className={`flex-1 rounded-full px-4 py-2.5 ${
              activeTab === tab.key ? 'bg-primary' : 'bg-secondary'
            }`}
          >
            <Text
              className={`text-center text-sm font-medium ${
                activeTab === tab.key
                  ? 'text-primary-foreground'
                  : 'text-secondary-foreground'
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Challenge count */}
      <Text className="text-sm text-muted-foreground">
        {filteredChallenges.length} Herausforderung{filteredChallenges.length !== 1 ? 'en' : ''}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <Card className="items-center gap-4 p-8">
      <Text className="text-4xl">🏆</Text>
      <View className="gap-2 text-center">
        <Text variant="h4" className="text-card-foreground">
          Keine Herausforderungen
        </Text>
        <Text className="text-sm text-muted-foreground">
          {activeTab === 'active'
            ? 'Alle Herausforderungen sind abgeschlossen.'
            : activeTab === 'completed'
            ? 'Du hast noch keine Herausforderungen abgeschlossen.'
            : 'Du hast noch keine Herausforderungen gestartet.'}
        </Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={filteredChallenges}
        renderItem={renderChallenge}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-3 px-6 py-4"
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />

      {/* Create Challenge FAB */}
      <View className="absolute bottom-6 right-6 left-6">
        <Button
          className="shadow-lg"
          onPress={() => navigation.navigate('CreateChallenge')}
        >
          <Text className="font-semibold">+ Herausforderung erstellen</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
