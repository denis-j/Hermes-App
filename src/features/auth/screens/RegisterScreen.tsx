import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { AuthError } from '@/services/auth/types';

type RegisterScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await signUp({ email: email.trim(), password });
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
                Create account
              </Text>
              <Text className="mt-1 text-muted-foreground">
                Start competing with friends
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
                  placeholder="Min. 6 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <View>
                <Text className="mb-2 text-sm font-medium text-foreground">
                  Confirm password
                </Text>
                <Input
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                />
              </View>

              {error && (
                <Text className="text-sm text-destructive">{error}</Text>
              )}
            </View>

            <Button onPress={handleSubmit} disabled={loading}>
              <Text>{loading ? 'Creating account...' : 'Create account'}</Text>
            </Button>
          </Card>

          <View className="mt-6 flex-row justify-center">
            <Text className="text-sm text-muted-foreground">
              Already have an account?{' '}
            </Text>
            <Button
              variant="link"
              onPress={() => navigation.navigate('Login')}
            >
              <Text className="text-sm">Sign in</Text>
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
    case AuthError.EMAIL_ALREADY_IN_USE:
      return 'An account with this email already exists.';
    case AuthError.WEAK_PASSWORD:
      return 'Password must be at least 6 characters.';
    case AuthError.NETWORK_ERROR:
      return 'Network error. Check your connection.';
    default:
      return 'Sign up failed. Please try again.';
  }
}
