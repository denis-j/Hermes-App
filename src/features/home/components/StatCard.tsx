import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  trend?: string;
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <Card className="flex-1 gap-2 p-4">
      <Text className="text-2xl">{icon}</Text>
      <View className="gap-0.5">
        <Text variant="h4" className="text-card-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </Text>
        <Text className="text-xs text-muted-foreground">{label}</Text>
        {trend && (
          <Text className="text-xs font-medium text-emerald-500">{trend}</Text>
        )}
      </View>
    </Card>
  );
}
