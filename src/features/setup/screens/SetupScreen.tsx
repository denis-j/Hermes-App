import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import { SectionCard } from '@/components/ui/SectionCard';
import { Tag } from '@/components/ui/Tag';
import { hasFirebaseEnv } from '@/lib/env';
import { firebaseProjectSummary } from '@/services/firebase/client';
import { healthKitSetupSummary } from '@/services/health/appleHealth';
import { theme } from '@/theme/tokens';

const foundationTags = ['Expo 54', 'NativeWind', 'Firebase shell', 'iOS-first'];

export function SetupScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-canvas"
      style={{ paddingHorizontal: theme.spacing.page }}
    >
      <ScrollView
        contentContainerStyle={{
          gap: theme.spacing.lg,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <View className="pt-6">
          <Text className="text-sm font-semibold uppercase tracking-[2px] text-accent">
            Pace Rivals
          </Text>
          <Text className="mt-3 text-4xl font-semibold leading-tight text-ink">
            Clean Expo foundation for a serious running challenge app.
          </Text>
          <Text className="mt-4 text-base leading-7 text-slate-600">
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

        <SectionCard
          title="Project shape"
          body="Short files, src-first structure, reusable UI primitives, and token-based styling are in place from the start."
        />

        <SectionCard
          title="Firebase"
          body={
            hasFirebaseEnv
              ? firebaseProjectSummary
              : 'Firebase env values are still placeholders. Copy .env.example into .env and fill in the project credentials.'
          }
        />

        <SectionCard title="Apple Health path" body={healthKitSetupSummary} />
      </ScrollView>
    </SafeAreaView>
  );
}
