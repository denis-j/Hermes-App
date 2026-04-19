import { StatusBar } from 'expo-status-bar';

import { SetupScreen } from '@/features/setup/screens/SetupScreen';

export function AppRoot() {
  return (
    <>
      <StatusBar style="dark" />
      <SetupScreen />
    </>
  );
}
