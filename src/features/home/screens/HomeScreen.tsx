import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-8">
        <Text variant="h2" className="text-foreground">
          Home
        </Text>
        <Card className="mt-6 gap-4 p-5">
          <View>
            <Text className="text-sm text-muted-foreground">Signed in as</Text>
            <Text className="mt-1 font-medium text-foreground">
              {user?.email ?? 'Unknown'}
            </Text>
          </View>
          <Button variant="outline" onPress={signOut}>
            <Text>Sign out</Text>
          </Button>
        </Card>
        <Card className="mt-4 gap-4 p-5">
          <Text variant="h4" className="text-card-foreground">
            Pace Rivals
          </Text>
          <Text className="text-sm text-muted-foreground">
            Challenge your friends. Track your runs. Compete for the top spot.
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
