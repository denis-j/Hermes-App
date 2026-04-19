import { SafeAreaView, ScrollView, View } from 'react-native';

import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SectionCard } from '@/components/ui/SectionCard';
import { Tag } from '@/components/ui/Tag';
import { hasFirebaseEnv } from '@/lib/env';
import { firebaseProjectSummary } from '@/services/firebase/client';
import { healthKitSetupSummary } from '@/services/health/appleHealth';

const foundationTags = ['Expo 54', 'NativeWind', 'Firebase shell', 'iOS-first'];

export function SetupScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        contentContainerClassName="p-6 gap-6 pb-24"
      >
        <View className="pt-2">
          <Text variant="h1" className="text-4xl font-semibold text-foreground">
            Pace Rivals
          </Text>
          <Text variant="lead" className="mt-3 text-muted-foreground">
            Clean Expo foundation for a serious running challenge app.
          </Text>
          <Text className="mt-4 leading-7 text-muted-foreground">
            Task 1 is live: premium iOS-first setup, reusable structure,
            NativeWind styling, Firebase-ready services, and a documented Apple
            Health path.
          </Text>
        </View>

        <View className="flex-row flex-wrap gap-3">
          {foundationTags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </View>

        <Card className="gap-4 p-5">
          <Text variant="h4" className="text-card-foreground">Project shape</Text>
          <Text className="text-sm text-muted-foreground">
            Short files, src-first structure, reusable UI primitives, and token-based styling are in place from the start.
          </Text>
        </Card>

        <Card className="gap-4 p-5">
          <Text variant="h4" className="text-card-foreground">Firebase</Text>
          <Text className="text-sm text-muted-foreground">
            {hasFirebaseEnv
              ? firebaseProjectSummary
              : 'Firebase env values are still placeholders. Copy .env.example into .env and fill in the project credentials.'}
          </Text>
        </Card>

        <Card className="gap-4 p-5">
          <Text variant="h4" className="text-card-foreground">Apple Health path</Text>
          <Text className="text-sm text-muted-foreground">
            {healthKitSetupSummary}
          </Text>
        </Card>

        <View className="pt-4">
          <Button>
            <Text>Get Started</Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
