import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/features/auth/screens/LoginScreen';
import { RegisterScreen } from '@/features/auth/screens/RegisterScreen';
import { ForgotPasswordScreen } from '@/features/auth/screens/ForgotPasswordScreen';
import { HomeScreen } from '@/features/home/screens/HomeScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Home: undefined;
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
    </Stack.Navigator>
  );
}
