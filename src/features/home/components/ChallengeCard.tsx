import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface Challenge {
  id: string;
  name: string;
  participantCount: number;
  daysRemaining: number;
  progress: number;
  leaderName: string;
  leaderSteps: number;
  userSteps: number;
}

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressPercent = Math.round(challenge.progress * 100);

  return (
    <Card className="w-64 shrink-0 gap-3 p-4">
      <View className="gap-1">
        <Text variant="h4" className="text-card-foreground">
          {challenge.name}
        </Text>
        <Text className="text-sm text-muted-foreground">
          {challenge.participantCount} participants · {challenge.daysRemaining} days left
        </Text>
      </View>

      <View className="gap-1.5">
        <View className="flex-row justify-between">
          <Text className="text-sm text-muted-foreground">Your progress</Text>
          <Text className="text-sm font-medium text-foreground">{progressPercent}%</Text>
        </View>
        <View className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <View
            className="h-full rounded-full bg-primary"
            style={{ width: `${progressPercent}%` }}
          />
        </View>
        <Text className="text-xs text-muted-foreground">
          {challenge.userSteps.toLocaleString()} / {challenge.leaderSteps.toLocaleString()} steps (leader)
        </Text>
      </View>

      <View className="flex-row items-center gap-1.5 rounded-md bg-secondary/50 px-2.5 py-1.5">
        <Text className="text-xs text-muted-foreground">🏆 Leading:</Text>
        <Text className="text-xs font-medium text-foreground">{challenge.leaderName}</Text>
      </View>
    </Card>
  );
}
