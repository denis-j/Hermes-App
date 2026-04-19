import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { ForgotPasswordScreen } from '@/features/auth/screens/ForgotPasswordScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';
import {
  ChallengeListScreen,
  ChallengeDetailScreen,
  CreateChallengeScreen,
  LeaderboardScreen,
} from '@/features/challenges/screens';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
  ChallengeList: undefined;
  ChallengeDetail: { challengeId?: string };
  CreateChallenge: undefined;
  Leaderboard: { challengeId?: string };
};

type RootNavigatorProps = {
  authenticated: boolean;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator({ authenticated }: RootNavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={authenticated ? 'Home' : 'Login'}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {!authenticated && (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </>
      )}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ChallengeList" component={ChallengeListScreen} />
      <Stack.Screen name="ChallengeDetail" component={ChallengeDetailScreen} />
      <Stack.Screen name="CreateChallenge" component={CreateChallengeScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Stack.Navigator>
  );
}
