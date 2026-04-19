import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AuthError } from '@/services/auth/types';

type LoginScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export function LoginScreen({ navigation }: LoginScreenProps) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setError(null);
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    setLoading(true);
    try {
      await signIn({ email: email.trim(), password });
    } catch (err) {
      setError(errorMessage(err as AuthError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-6">
          <Card className="gap-6 p-6">
            <View>
              <Text variant="h2" className="text-card-foreground">
                Welcome back
              </Text>
              <Text className="mt-1 text-muted-foreground">
                Sign in to continue
              </Text>
            </View>

            <View className="gap-4">
              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Email
                </Text>
                <Input
                  placeholder="you@example.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Password
                </Text>
                <Input
                  placeholder="••••••••"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {error && (
                <Text className="text-sm text-destructive">{error}</Text>
              )}
            </View>

            <View className="gap-3">
              <Button onPress={handleSubmit} disabled={loading}>
                <Text>{loading ? 'Signing in...' : 'Sign in'}</Text>
              </Button>

              <Button
                variant="link"
                className="self-center"
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text className="text-sm text-muted-foreground">
                  Forgot password?
                </Text>
              </Button>
            </View>
          </Card>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm text-muted-foreground">
              Don't have an account?{' '}
            </Text>
            <Button
              variant="link"
              onPress={() => navigation.navigate('Register')}
            >
              <Text className="text-sm">Sign up</Text>
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function errorMessage(code: AuthError): string {
  switch (code) {
    case AuthError.INVALID_EMAIL:
      return 'Please enter a valid email address.';
    case AuthError.INVALID_CREDENTIAL:
      return 'Incorrect email or password.';
    case AuthError.TOO_MANY_REQUESTS:
      return 'Too many attempts. Please try again later.';
    case AuthError.NETWORK_ERROR:
      return 'Network error. Check your connection.';
    case AuthError.USER_DISABLED:
      return 'This account has been disabled.';
    default:
      return 'Sign in failed. Please try again.';
  }
}
