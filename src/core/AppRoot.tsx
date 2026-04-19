import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { RootNavigator } from '@/navigation/RootNavigator';
import { SetupScreen } from '@/features/setup/screens/SetupScreen';
import { hasFirebaseEnv } from '@/lib/env';

function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" />
    </View>
  );
}

function AppWithAuth() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <RootNavigator
      authenticated={!!user}
    />
  );
}

function AppContent() {
  if (!hasFirebaseEnv) {
    return <SetupScreen />;
  }
  return <AppWithAuth />;
}

export function AppRoot() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
